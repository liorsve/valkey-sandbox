// leaderboard.js

// Import Valkey-Glide
const { GlideClient } = require("@valkey/valkey-glide");

// Initialize the Valkey client
let client;

async function initializeClient() {
  try {
    if (!client) {
      client = await GlideClient.createClient({
        addresses: [
          {
            host: "localhost", // Replace with your Valkey server address
            port: 6379,        // Default Valkey port
          },
        ],
        clientName: "leaderboard_client",
        // useTLS: true,       // Uncomment if using TLS
      });

      console.log("Connected to Valkey server");
    }
  } catch (error) {
    console.error("Error initializing Valkey client:", error);
    throw error;
  }
}

// Function to set player data
async function setPlayerData(playerId, data) {
  await initializeClient();
  try {
    const key = `player:${playerId}`;
    console.log(`Storing player data: key=${key}, data=${JSON.stringify(data)}`);
    await client.set(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting data for player ${playerId}:`, error);
    throw error;
  }
}

// Function to get player data
async function getPlayerData(playerId) {
  await initializeClient();
  try {
    const key = `player:${playerId}`;
    const data = await client.get(key);
    console.log(`Retrieved data for key=${key}:`, data);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting data for player ${playerId}:`, error);
    return null;
  }
}

// Function to update player score
async function updatePlayerScore(playerId, score) {
  await initializeClient();
  try {
    console.log(`Updating score: leaderboard, score=${score}, playerId=${playerId}`);
    await client.customCommand(["ZADD", "leaderboard", score.toString(), playerId]);
  } catch (error) {
    console.error(`Error updating score for player ${playerId}:`, error);
    throw error;
  }
}

// Function to get player rank
async function getPlayerRank(playerId) {
  await initializeClient();
  try {
    const rank = await client.customCommand(["ZREVRANK", "leaderboard", playerId]);
    console.log(`Rank for player ${playerId}:`, rank);
    return rank !== null ? parseInt(rank) + 1 : null; // Ranks are zero-based
  } catch (error) {
    console.error(`Error getting rank for player ${playerId}:`, error);
    return null;
  }
}

// Function to get top N players
async function getTopPlayers(n) {
    await initializeClient();
    try {
      const response = await client.customCommand([
        "ZREVRANGE",
        "leaderboard",
        "0",
        (n - 1).toString(),
        "WITHSCORES",
      ]);
  
      console.log("Raw leaderboard data:", response);
  
      const players = [];
      for (const [playerId, scoreStr] of response) {
        const score = parseFloat(scoreStr);
        const data = await getPlayerData(playerId);
        console.log(`Fetched data for playerId=${playerId}, score=${score}:`, data);
        players.push({
          rank: players.length + 1,
          playerId,
          score,
          ...data,
        });
      }
      return players;
    } catch (error) {
      console.error(`Error getting top ${n} players:`, error);
      return [];
    }
  }

// Function to close the client connection
async function closeClient() {
  if (client) {
    await client.close();
    client = null;
  }
}
module.exports = {
  setPlayerData,
  getPlayerData,
  updatePlayerScore,
  getPlayerRank,
  getTopPlayers,
  closeClient,
};