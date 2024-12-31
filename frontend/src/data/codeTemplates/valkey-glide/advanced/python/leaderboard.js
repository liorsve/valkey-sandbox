export const leaderboard = {
  name: "Leaderboard",
  description: "Real-time game leaderboard with sorted sets",
  code: `# Leaderboard Use Case in Python
import asyncio
import json
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration, RangeByScore, InfBound
import os

async def print_leaderboard(client: GlideClusterClient):
    # Get player rankings
    print("\\nPlayer Rankings:\\n")
    leaderboard = await client.zrange_withscores(
        "leaderboard", 
        RangeByScore(InfBound.POS_INF, InfBound.NEG_INF), 
        reverse=True
    )
    for rank, (player_id, score) in enumerate(leaderboard.items(), 1):
        print(f"{rank}. {player_id.decode()}: {int(score)} points")

async def main():
    client = None
    try:
        host = os.getenv('VALKEY_CLUSTER_HOST', 'valkey-cluster')
        port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
        config = GlideClusterClientConfiguration([NodeAddress(host, port)])
        client = await GlideClusterClient.create(config)
        print("Connected to Valkey server\\n")

        await client.flushall()  # Clear existing data
        
        # Initialize test data
        players = [
            {"id": "Superman", "score": 1500},
            {"id": "Batman", "score": 1800},
            {"id": "Wonder Woman", "score": 1200},
            {"id": "Flash", "score": 300},
            {"id": "Green Lantern", "score": 150},
            {"id": "Aquaman", "score": 75}
        ]
        
        # Store player data
        print("Initializing player data...\\n")
        for player in players:
            await client.zadd("leaderboard", {player['id']: player['score']})
            print(f"Initialized {player['id']} with score {player['score']}")
        
        await print_leaderboard(client)

        # Update scores
        print("\\nUpdating scores...")
        await client.zincrby("leaderboard", 300, "Superman")  # Superman wins
        await client.zincrby("leaderboard", -100, "Batman")   # Batman loses
        await client.zincrby("leaderboard", 500, "Flash")     # Flash comeback

        await print_leaderboard(client)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if client:
            await client.close()
            print("\\nConnection closed")

asyncio.run(main())`
};

export default leaderboard;
