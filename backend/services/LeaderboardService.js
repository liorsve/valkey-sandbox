import { GlideClusterClient, InfBoundary } from "@valkey/valkey-glide";
import { KEYS, DEFAULT_PLAYERS } from "../constants.js";
import { cleanupCluster } from "../utils/cleanUpServer.js";

export class LeaderboardService {
  constructor() {
    this.client = null;
  }

  async initialize() {
    if (!this.client) {
      const host = process.env.VALKEY_CLUSTER_HOST || "localhost";
      const port = process.env.VALKEY_CLUSTER_PORT || 7000;
      this.client = await GlideClusterClient.createClient({
        addresses: [{ host, port: parseInt(port) }],
        clientName: "leaderboard-client",
      });
    }
  }

  async initializeLeaderboard() {
    await this.initialize();

    // Clean existing data before initialization
    await cleanupCluster();

    // Initialize each player
    for (const player of DEFAULT_PLAYERS) {
      const playerKey = `${KEYS.PLAYER_PREFIX}${player.id}`;
      await this.client.hset(playerKey, player);
      await this.client.zadd(KEYS.LEADERBOARD, [
        { element: playerKey, score: player.score },
      ]);
    }

    return this.getLeaderboardState();
  }

  async getLeaderboardState() {
    try {
      const sortedPlayers = await this.client.zrangeWithScores(
        KEYS.LEADERBOARD,
        {
          start: InfBoundary.PositiveInfinity,
          end: InfBoundary.NegativeInfinity,
          type: "byScore",
        },
        { reverse: true }
      );

      const players = await Promise.all(
        sortedPlayers.map(async ({ element, score }) => {
          const playerId = parseInt(element.split(":")[1]);
          const playerKey = `${KEYS.PLAYER_PREFIX}${playerId}`;
          const playerData = await this.client.hgetall(playerKey);

          if (!playerData) return null;

          return {
            id: playerId,
            name: playerData.name,
            photo: playerData.photo,
            score: parseInt(score),
          };
        })
      );

      return players.filter(Boolean);
    } catch (error) {
      console.error("Error getting leaderboard state:", error);
      return [];
    }
  }

  async updateScore(playerId, change) {
    const playerKey = `${KEYS.PLAYER_PREFIX}${playerId}`;
    const operations = [];

    try {
      const playerData = await this.client.hgetall(playerKey);
      if (!playerData) throw new Error(`Player not found: ${playerKey}`);

      operations.push(
        `Updating ${playerData.name}'s score by ${
          change > 0 ? "+" : ""
        }${change}`
      );
      const newScore = await this.client.zincrby(
        KEYS.LEADERBOARD,
        change,
        playerKey
      );

      operations.push(`Setting new score: ${newScore}`);
      await this.client.hset(playerKey, {
        ...playerData,
        score: newScore.toString(),
      });

      const players = await this.getLeaderboardState();
      return { players, operations };
    } catch (error) {
      console.error("[LeaderboardService] Score update error:", error);
      throw error;
    }
  }
}
