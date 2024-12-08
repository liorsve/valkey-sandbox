// Import Valkey-Glide
import { GlideClient } from '@valkey/valkey-glide';

// Initialize the Valkey client
let client;

async function initializeClient(mode = 'standalone') {
  try {
    if (!client) {
      const host = process.env.VALKEY_HOST || 'localhost';
      const port = process.env.VALKEY_PORT || 6379;

      client = await GlideClient.createClient({
        addresses: [
          {
            host: host,
            port: port,
          },
        ],
        clientName: 'leaderboard_client',
      });

      console.log('Connected to Valkey server');
    }
  } catch (error) {
    console.error('Error initializing Valkey client:', error);
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
    await client.customCommand(['ZADD', 'leaderboard', score.toString(), playerId]);
  } catch (error) {
    console.error(`Error updating score for player ${playerId}:`, error);
    throw error;
  }
}

// Function to get player rank
async function getPlayerRank(playerId) {
  await initializeClient();
  try {
    const rank = await client.customCommand(['ZREVRANK', 'leaderboard', playerId]);
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
      'ZREVRANGE',
      'leaderboard',
      '0',
      (n - 1).toString(),
      'WITHSCORES',
    ]);

    console.log('Raw leaderboard data:', response);

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

async function exampleUsage() {
  try {
    // 1. Initialize player data
    console.log("Initializing player data...");
    await setPlayerData("player1", { name: "Alice", level: 5 });
    await setPlayerData("player2", { name: "Bob", level: 8 });
    await setPlayerData("player3", { name: "Charlie", level: 3 });

    // 2. Get player data
    console.log("\nFetching player data...");
    const player1Data = await getPlayerData("player1");
    console.log("Player 1 Data:", player1Data);

    const player2Data = await getPlayerData("player2");
    console.log("Player 2 Data:", player2Data);

    // 3. Update player scores
    console.log("\nUpdating player scores...");
    await updatePlayerScore("player1", 1500);
    await updatePlayerScore("player2", 1800);
    await updatePlayerScore("player3", 1200);

    // 4. Get player rank
    console.log("\nGetting player ranks...");
    const player1Rank = await getPlayerRank("player1");
    console.log("Player 1 Rank:", player1Rank);

    const player2Rank = await getPlayerRank("player2");
    console.log("Player 2 Rank:", player2Rank);

    // 5. Fetch top 2 players
    console.log("\nFetching top 2 players...");
    const topPlayers = await getTopPlayers(2);
    console.log("Top Players:", JSON.stringify(topPlayers, null, 2));
  } catch (error) {
    console.error("Error during example usage:", error);
  } finally {
    // Ensure the client is closed
    console.log("\nClosing Valkey client...");
    await closeClient();
  }
}

// Run the example usage
await exampleUsage();