export const leaderboard = {
  name: "Leaderboard",
  description: "Real-time game leaderboard with sorted sets",
  code: `// Leaderboard Use Case in Node.js
import { GlideClusterClient, InfBoundary } from '@valkey/valkey-glide';

async function printLeaderboard(glideClient) {
    const leaderboard = await glideClient.zrangeWithScores('leaderboard', {
        start: InfBoundary.PositiveInfinity,
        end: InfBoundary.NegativeInfinity,
        type: "byScore"
    }, { reverse: true });
    leaderboard.forEach((item, index) => {
        console.log(\`\${index + 1}. \${item.element}: \${item.score} points\`);
    });
}

async function main() {
    let glideClient = null;
    try {
        const host = process.env.VALKEY_CLUSTER_HOST || 'valkey-cluster';
        const port = process.env.VALKEY_CLUSTER_PORT || 7000;
        glideClient = await GlideClusterClient.createClient({
            addresses: [{ host, port: parseInt(port) }],
            clientName: 'leaderboard-client',
        });
        await glideClient.flushall();

        const players = [
            { id: 'Superman', score: 1500 },
            { id: 'Batman', score: 1800 },
            { id: 'Wonder Woman', score: 1200 },
            { id: 'Flash', score: 300 },
            { id: 'Green Lantern', score: 150 },
            { id: 'Aquaman', score: 75 }
        ];

        const leaderboardData = players.map(player => ({
            element: player.id,
            score: player.score
        }));
        
        await glideClient.zadd('leaderboard', leaderboardData);
        await printLeaderboard(glideClient);

        console.log("\\nUpdating scores...");
        await glideClient.zadd("leaderboard", {
            "Superman": 300,  // Superman wins
            "Batman": -100,   // Batman loses
            "Flash": 500      // Flash comeback
        });

        await printLeaderboard(glideClient);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (glideClient) {
            await glideClient.close();
            console.log("\\nConnection closed");
        }
    }
}

await main();`
};

export default leaderboard;
