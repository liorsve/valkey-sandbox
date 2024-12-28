export const recommendationSystem = {
  name: "Recommendation System",
  description:
    "Product recommendation engine using embeddings and similarity scoring",
  code: `// Recommendation System Use Case in Java
import io.valkey.glide.*;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RecommendationSystem {
    private static double dotProduct(double[] a, double[] b) {
        double sum = 0;
        for (int i = 0; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }

    private static class Product {
        String id;
        String name;
        double[] embedding;

        Product(String id, String name, double[] embedding) {
            this.id = id;
            this.name = name;
            this.embedding = embedding;
        }
    }

    private static class Recommendation implements Comparable<Recommendation> {
        String name;
        double similarity;

        Recommendation(String name, double similarity) {
            this.name = name;
            this.similarity = similarity;
        }

        @Override
        public int compareTo(Recommendation other) {
            return Double.compare(other.similarity, this.similarity);
        }
    }

    public static void main(String[] args) throws Exception {
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("valkey-cluster", 7000))
        );
        ObjectMapper mapper = new ObjectMapper();
        
        try (GlideClusterClient client = GlideClusterClient.create(config)) {
            // Sample products
            List<Product> products = Arrays.asList(
                new Product("1", "Red Scarf", new double[]{0.1, 0.3, 0.5}),
                new Product("2", "Blue Hat", new double[]{0.4, 0.1, 0.6}),
                new Product("3", "Green Jacket", new double[]{0.2, 0.5, 0.7}),
                new Product("4", "Yellow Gloves", new double[]{0.6, 0.1, 0.2}),
                new Product("5", "Black Shoes", new double[]{0.3, 0.3, 0.8}),
                new Product("6", "White T-Shirt", new double[]{0.7, 0.6, 0.1})
            );

            // Store products
            for (Product product : products) {
                String key = "product:" + product.id;
                client.hset(key, Map.of(
                    "name", product.name,
                    "embedding", mapper.writeValueAsString(product.embedding)
                )).get();
            }

            // User embeddings
            double[][] userEmbeddings = {
                {0.1, 0.3, 0.5},
                {0.3, 0.4, 0.6}
            };

            // Calculate average user embedding
            double[] userAvg = new double[3];
            for (double[] embedding : userEmbeddings) {
                for (int i = 0; i < embedding.length; i++) {
                    userAvg[i] += embedding[i];
                }
            }
            for (int i = 0; i < userAvg.length; i++) {
                userAvg[i] /= userEmbeddings.length;
            }

            // Get recommendations
            List<Recommendation> recommendations = new ArrayList<>();
            for (Product product : products) {
                double similarity = dotProduct(userAvg, product.embedding);
                recommendations.add(new Recommendation(product.name, similarity));
            }

            Collections.sort(recommendations);
            System.out.println("Top 3 Recommendations:");
            for (int i = 0; i < 3 && i < recommendations.size(); i++) {
                Recommendation rec = recommendations.get(i);
                System.out.printf("%d. %s (similarity: %.2f)%n", 
                    i + 1, rec.name, rec.similarity);
            }
        }
    }
}`,
};

export default recommendationSystem;
