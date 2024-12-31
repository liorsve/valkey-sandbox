export const leaderboard = {
  name: "Leaderboard",
  description: "Real-time game leaderboard with sorted sets",
  code: `// Leaderboard Use Case in Java
import io.valkey.glide.*;
import java.util.*;

public class LeaderboardExample {
    public static void printLeaderboard(GlideClusterClient client) throws Exception {
        System.out.println("\\nPlayer Rankings:\\n");
        List<ZRangeWithScoresResult> leaderboard = client.zrangeWithscores(
            "leaderboard", 
            new RangeByScore(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY), 
            true
        ).get();
        
        int rank = 1;
        for (ZRangeWithScoresResult entry : leaderboard) {
            String playerId = entry.getElement();
            double score = entry.getScore();
            System.out.printf("%d. %s: %.0f points%n", rank++, playerId, score);
        }
    }

    public static void main(String[] args) throws Exception {
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("valkey-cluster", 7000))
        );
        GlideClusterClient client = null;
        
        try {
            client = GlideClusterClient.create(config);
            System.out.println("Connected to Valkey server");

            List<Map<String, Object>> players = Arrays.asList(
                createPlayer("Superman", 1500),
                createPlayer("Batman", 1800),
                createPlayer("Wonder Woman", 1200),
                createPlayer("Flash", 300),
                createPlayer("Green Lantern", 150),
                createPlayer("Aquaman", 75)
            );

            System.out.println("Initializing player data...");
            List<ZAddArgs> leaderboardData = new ArrayList<>();
            for (Map<String, Object> player : players) {
                String playerId = (String) player.get("id");
                int score = (Integer) player.get("score");
                leaderboardData.add(new ZAddArgs(score, playerId));
                System.out.printf("Initialized %s with score %d%n", playerId, score);
            }
            client.zadd("leaderboard", leaderboardData).get();

            printLeaderboard(client);

            System.out.println("\\nUpdating scores...");
            client.zincrby("leaderboard", 300, "Superman").get();
            client.zincrby("leaderboard", -100, "Batman").get();
            client.zincrby("leaderboard", 500, "Flash").get();

            printLeaderboard(client);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            if (client != null) {
                client.close();
                System.out.println("\\nConnection closed");
            }
        }
    }

    private static Map<String, Object> createPlayer(String id, int score) {
        Map<String, Object> player = new HashMap<>();
        player.put("id", id);
        player.put("score", score);
        return player;
    }
}`,
};

export default leaderboard;
