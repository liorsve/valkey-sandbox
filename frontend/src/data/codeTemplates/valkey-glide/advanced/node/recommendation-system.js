export const recommendationSystem = {
  name: "Recommendation System",
  description:
    "Product recommendation engine using embeddings and similarity scoring",
  code: `// Recommendation System Use Case in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

// Utility function to calculate dot product
function dotProduct(a, b) {
    return a.reduce((sum, value, i) => sum + value * b[i], 0);
}

async function storeProducts(client, products) {
    const productKeys = [];
    for (const product of products) {
        const productKey = \`product:\${product.id}\`;
        await client.customCommand([
            'HSET',
            productKey,
            'name',
            product.name,
            'embedding',
            JSON.stringify(product.embedding),
        ]);
        productKeys.push(productKey);
    }
    await client.customCommand([
        'HSET',
        'products:index',
        'keys',
        JSON.stringify(productKeys),
    ]);
}

async function recommend(client, userEmbeddings, topN) {
    const userAvg = userEmbeddings[0].map((_, i) =>
        userEmbeddings.reduce((sum, embedding) => sum + embedding[i], 0) / userEmbeddings.length
    );

    const recs = [];
    const productKeys = Array.from({ length: 8 }, (_, i) => \`product:\${i + 1}\`);

    for (const key of productKeys) {
        const name = await client.customCommand(['HGET', key, 'name']);
        const embeddingStr = await client.customCommand(['HGET', key, 'embedding']);
        const embedding = JSON.parse(embeddingStr);
        const sim = dotProduct(userAvg, embedding);
        recs.push({ name, similarity: sim });
    }

    return recs.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
}

async function main() {
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'valkey-cluster', port: 7000 }],
    });

    const products = [
        { id: '1', name: 'Red Scarf', embedding: [0.1, 0.3, 0.5] },
        { id: '2', name: 'Blue Hat', embedding: [0.4, 0.1, 0.6] },
        { id: '3', name: 'Green Jacket', embedding: [0.2, 0.5, 0.7] },
        { id: '4', name: 'Yellow Gloves', embedding: [0.6, 0.1, 0.2] },
        { id: '5', name: 'Black Shoes', embedding: [0.3, 0.3, 0.8] },
        { id: '6', name: 'White T-Shirt', embedding: [0.7, 0.6, 0.1] },
        { id: '7', name: 'Purple Socks', embedding: [0.1, 0.9, 0.4] },
        { id: '8', name: 'Orange Belt', embedding: [0.5, 0.2, 0.1] },
    ];

    await storeProducts(client, products);
    const userEmbeddings = [[0.1, 0.3, 0.5], [0.3, 0.4, 0.6]];
    const recommendations = await recommend(client, userEmbeddings, 3);
    console.log('Top Recommendations:', recommendations);

    await client.close();
}

await main();`,
};

export default recommendationSystem;
