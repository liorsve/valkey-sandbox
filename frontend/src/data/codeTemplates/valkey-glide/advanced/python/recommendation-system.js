export const recommendationSystem = {
  name: "Recommendation System",
  description: "Product recommendation engine using embeddings and similarity scoring",
  code: `# Recommendation System Use Case in Python
import json
import numpy as np
import asyncio
from glide import (
  NodeAddress,
  GlideClusterClient,
  GlideClusterClientConfiguration,
)
async def store_products(client, products):
  # Store each product in Valkey
  product_keys = []
  for p in products:
      product_key = f"product:{p['id']}"
      await client.hset(
          product_key,
          {"name": p["name"], "embedding": json.dumps(p["embedding"])}
      )
      product_keys.append(product_key)
  await client.hset("products:index", {"keys": json.dumps(product_keys)})

async def recommend(client, user_embeddings, top_n):
  user_avg = np.mean(user_embeddings, axis=0)
  recs = []
  # Retrieve keys of all products
  product_keys = [f"product:{i}" for i in range(1, 9)]
  for key in product_keys:
      name_bytes = await client.hget(key, "name")
      embedding_bytes = await client.hget(key, "embedding")
      
      name = name_bytes.decode("utf-8")
      embedding = json.loads(embedding_bytes.decode("utf-8"))
      sim = np.dot(user_avg, embedding)
      recs.append((name, sim))
  return sorted(recs, key=lambda x: -x[1])[:top_n]

async def main():
  config = GlideClusterClientConfiguration([NodeAddress("valkey-cluster", 7000)])
  client = await GlideClusterClient.create(config)
  
  # Sample dataset
  products = [
      {"id": "1", "name": "Red Scarf", "embedding": [0.1, 0.3, 0.5]},
      {"id": "2", "name": "Blue Hat", "embedding": [0.4, 0.1, 0.6]},
      {"id": "3", "name": "Green Jacket", "embedding": [0.2, 0.5, 0.7]},
      {"id": "4", "name": "Yellow Gloves", "embedding": [0.6, 0.1, 0.2]},
      {"id": "5", "name": "Black Shoes", "embedding": [0.3, 0.3, 0.8]},
      {"id": "6", "name": "White T-Shirt", "embedding": [0.7, 0.6, 0.1]},
      {"id": "7", "name": "Purple Socks", "embedding": [0.1, 0.9, 0.4]},
      {"id": "8", "name": "Orange Belt", "embedding": [0.5, 0.2, 0.1]},
  ]
  await store_products(client, products)
  
  # Sample users
  user_embeddings = [[0.1, 0.3, 0.5], [0.3, 0.4, 0.6]]
  recommendations = await recommend(client, user_embeddings, top_n=3)
  print(recommendations)
  
asyncio.run(main())`
};

export default recommendationSystem;
