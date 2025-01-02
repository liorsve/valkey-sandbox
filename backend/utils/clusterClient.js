import { GlideClusterClient } from "@valkey/valkey-glide";
import dotenv from "dotenv";

dotenv.config();

class ClusterClientManager {
  constructor() {
    this.client = null;
  }

  async getClient() {
    if (this.client) return this.client;

    this.client = await GlideClusterClient.createClient({
      addresses: [
        {
          host: process.env.EC_HOST,
          port: parseInt(process.env.EC_PORT),
        },
      ],
      clientName: "content-fetcher",
      useTLS: true,
    });

    return this.client;
  }
}

export default new ClusterClientManager();
