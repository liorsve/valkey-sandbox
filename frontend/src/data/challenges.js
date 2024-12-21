export const codingChallenges = {
    easy: [
        {
            id: 1,
            title: 'Unique Visitor Counter',
            difficulty: 'Easy',
            points: 3,
            description: `Implement a system to count unique visitors using Valkey Sets.
                
**Objective**: 
- Track unique visitors by their IDs
- Return total count of unique visitors

**Requirements**:
- Use Valkey Sets (SADD, SCARD)
- Handle concurrent access
- Maintain data consistency`,
            starterCode: {
                python: `async def add_visitor(client, visitor_id: str) -> bool:
    """Add a visitor ID to the unique visitors set.
    Returns True if the visitor was new, False if already seen."""
    try:
        return await client.sadd("visitors", visitor_id)
    except Exception as e:
        print(f"Error adding visitor: {e}")
        return False

async def get_total_visitors(client) -> int:
    """Get total count of unique visitors."""
    try:
        return await client.scard("visitors")
    except Exception as e) {
        print(f"Error getting visitor count: {e}")
        return 0`,
                javascript: `async function addVisitor(client, visitorId) {
    try {
        return await client.sadd("visitors", visitorId);
    } catch (error) {
        console.error("Error adding visitor:", error);
        return false;
    }
}

async function getTotalVisitors(client) {
    try {
        return await client.scard("visitors");
    } catch (error) {
        console.error("Error getting visitor count:", error);
        return 0;
    }
}`,
                java: `public class VisitorTracker {
    private static final String VISITOR_KEY = "visitors";

    public boolean addVisitor(GlideClient client, String visitorId) {
        try {
            Long result = client.sadd(VISITOR_KEY, visitorId);
            return result != null && result > 0;
        } catch (Exception e) {
            System.err.println("Error adding visitor: " + e.getMessage());
            return false;
        }
    }

    public long getTotalVisitors(GlideClient client) {
        try {
            Long count = client.scard(VISITOR_KEY);
            return count != null ? count : 0;
        } catch (Exception e) {
            System.err.println("Error getting visitor count: " + e.getMessage());
            return 0;
        }
    }
}`
            },
            tests: {
                python: [
                    {
                        name: 'Test visitor tracking',
                        code: `
# Clear existing data
await client.delete("visitors")

# Add new visitors
assert await add_visitor(client, "user1") == True, "First visit should return True"
assert await add_visitor(client, "user2") == True, "First visit should return True"
assert await add_visitor(client, "user1") == False, "Repeat visit should return False"

# Check total count
count = await get_total_visitors(client)
assert count == 2, f"Expected 2 unique visitors, got {count}"`
                    }
                ],
                javascript: [
                    {
                        name: 'Test visitor tracking',
                        code: `
// Clear existing data
await client.delete("visitors");

// Add new visitors
assert.strictEqual(await addVisitor(client, "user1"), true, "First visit should return true");
assert.strictEqual(await addVisitor(client, "user2"), true, "First visit should return true");
assert.strictEqual(await addVisitor(client, "user1"), false, "Repeat visit should return false");

// Check total count
const count = await getTotalVisitors(client);
assert.strictEqual(count, 2, "Expected 2 unique visitors");`
                    }
                ],
                java: [
                    {
                        name: 'Test visitor tracking',
                        code: `
// Clear existing data
client.delete("visitors");

VisitorTracker tracker = new VisitorTracker();

// Add new visitors
Assert.assertTrue("First visit should return true", tracker.addVisitor(client, "user1"));
Assert.assertTrue("First visit should return true", tracker.addVisitor(client, "user2"));
Assert.assertFalse("Repeat visit should return false", tracker.addVisitor(client, "user1"));

// Check total count
long count = tracker.getTotalVisitors(client);
Assert.assertEquals("Expected 2 unique visitors", 2, count);`
                    }
                ]
            },
            hints: [
                "Use SADD to add visitors - it automatically handles duplicates",
                "SCARD returns the total number of unique elements",
                "Consider using a consistent key name for your visitor set"
            ]
        },
        {
            id: 2,
            title: 'Recent Events Counter',
            difficulty: 'Easy',
            points: 3,
            description: `Track events within a time window using Valkey Sorted Sets.`,
            starterCode: {
                python: `async def add_event(client, event_id):
    """Add an event with current timestamp to the events sorted set."""
    try:
        current_time = time.time()
        return await client.zadd("events", { event_id: current_time })
    except Exception as e:
        print(f"Error adding event: {e}")
        return False

async def get_recent_events_count(client, window_seconds=60):
    """Return count of events within the last window_seconds."""
    try:
        now = time.time()
        min_time = now - window_seconds
        return await client.zcount("events", min_time, now)
    except Exception as e) {
        print(f"Error getting recent events: {e}")
        return 0`,
                javascript: `async function addEvent(client, eventId) {
    try {
        const currentTime = Date.now() / 1000;
        return await client.zadd("events", { [eventId]: currentTime });
    } catch (error) {
        console.error("Error adding event:", error);
        return false;
    }
}

async function getRecentEventsCount(client, windowSeconds = 60) {
    try {
        const now = Date.now() / 1000;
        const minTime = now - windowSeconds;
        return await client.zcount("events", minTime, now);
    } catch (error) {
        console.error("Error getting recent events:", error);
        return 0;
    }
}`,
                java: `public class EventCounter {
    private static final String EVENTS_KEY = "events";

    public void addEvent(GlideClient client, String eventId) {
        try {
            long currentTime = System.currentTimeMillis() / 1000L;
            client.zadd(EVENTS_KEY, currentTime, eventId);
        } catch (Exception e) {
            System.err.println("Error adding event: " + e.getMessage());
        }
    }

    public long getRecentEventsCount(GlideClient client, int windowSeconds) {
        try {
            long now = System.currentTimeMillis() / 1000L;
            long minTime = now - windowSeconds;
            return client.zcount(EVENTS_KEY, minTime, now);
        } catch (Exception e) {
            System.err.println("Error getting recent events: " + e.getMessage());
            return 0;
        }
    }
}`
            },
            tests: {
                python: [
                    {
                        name: 'Test recent events',
                        setup: `import time`,
                        code: `
now = time.time()
await add_event(client, "event1")
await add_event(client, "event2")
time.sleep(2)
count = await get_recent_events_count(client)
assert count == 2, f"Expected 2 events, got {count}"
`
                    }
                ],
                javascript: [
                    {
                        name: 'Test recent events',
                        setup: `const time = Date.now() / 1000;`,
                        code: `
await addEvent(client, "event1");
await addEvent(client, "event2");
await new Promise(r => setTimeout(r, 2000));
const count = await getRecentEventsCount(client);
assert.strictEqual(count, 2, "Expected 2 recent events");`
                    }
                ],
                java: [
                    {
                        name: 'Test recent events',
                        setup: `long currentTime = System.currentTimeMillis() / 1000L;`,
                        code: `
EventCounter counter = new EventCounter();
counter.addEvent(client, "event1");
counter.addEvent(client, "event2");
Thread.sleep(2000);
int count = counter.getRecentEventsCount(client);
Assert.assertEquals("Expected 2 recent events", 2, count);`
                    }
                ]
            },
            hints: [
                "Use ZADD with timestamps as scores",
                "ZREMRANGEBYSCORE can remove old events",
                "ZCOUNT can get events within a time range"
            ]
        }
    ],
    medium: [
        {
            id: 3,
            title: 'Trending Hashtags',
            difficulty: 'Medium',
            points: 5,
            description: `Implement a trending hashtags system using Valkey.
                
**Objective**: 
- Track hashtag usage frequency
- Retrieve top trending hashtags

**Requirements**:
- Use sorted sets for tracking hashtags
- Support real-time updates
- Return hashtags sorted by popularity`,
            starterCode: {
                python: `async def track_hashtag(client, hashtag):
    # Increment hashtag count in sorted set
    pass

async def get_trending(client, limit=10):
    # Get top trending hashtags with their counts
    pass`,
                javascript: `async function trackHashtag(client, hashtag) {
    // Increment hashtag count in sorted set
}

async function getTrending(client, limit = 10) {
    // Get top trending hashtags with their counts
}`,
                java: `public class HashtagTracker {
    public void trackHashtag(GlideClient client, String hashtag) {
        // Increment hashtag count in sorted set
    }
    
    public List<String> getTrending(GlideClient client, int limit) {
        // Get top trending hashtags with their counts
        return new ArrayList<>();
    }
}`
            },
            tests: {
                python: [
                    {
                        name: 'Test trending hashtags',
                        code: `
await track_hashtag(client, "#valkey")
await track_hashtag(client, "#database")
await track_hashtag(client, "#valkey")
trending = await get_trending(client, 2)
assert len(trending) == 2, "Expected 2 trending hashtags"
assert trending[0][0] == "#valkey", "Expected #valkey to be top trending"
assert trending[0][1] == 2, "Expected #valkey to have count of 2"`
                    }
                ],
                javascript: [
                    {
                        name: 'Test trending hashtags',
                        code: `
await trackHashtag(client, "#valkey");
await trackHashtag(client, "#database");
await trackHashtag(client, "#valkey");
const trending = await getTrending(client, 2);
assert.strictEqual(trending.length, 2, "Expected 2 trending hashtags");
assert.strictEqual(trending[0][0], "#valkey", "Expected #valkey to be top trending");
assert.strictEqual(trending[0][1], 2, "Expected #valkey to have count of 2");`
                    }
                ],
                java: [
                    {
                        name: 'Test trending hashtags',
                        code: `
HashtagTracker tracker = new HashtagTracker();
tracker.trackHashtag(client, "#valkey");
tracker.trackHashtag(client, "#database");
tracker.trackHashtag(client, "#valkey");
List<String> trending = tracker.getTrending(client, 2);
Assert.assertEquals("Expected 2 trending hashtags", 2, trending.size());
Assert.assertEquals("Expected #valkey to be top trending", "#valkey", trending.get(0));`
                    }
                ]
            },
            hints: [
                "Use ZINCRBY to track hashtag counts",
                "ZREVRANGE with WITHSCORES gets top items with their scores",
                "Consider periodic cleanup of old/inactive hashtags"
            ]
        }
    ],
    hard: [
        {
            id: 4,
            title: 'Distributed Lock Manager',
            difficulty: 'Hard',
            points: 8,
            description: `Implement a distributed lock manager with deadlock prevention.
                
**Objective**:
- Implement distributed locking mechanism
- Prevent deadlocks
- Handle lock timeouts

**Requirements**:
- Atomic lock operations
- Timeout mechanism
- Safe lock release`,
            starterCode: {
                python: `async def acquire_lock(client, resource_id, client_id, timeout=10):
    # Return True if lock acquired, False otherwise
    pass

async def release_lock(client, resource_id, client_id):
    # Return True if lock released, False if not owner
    pass`,
                javascript: `async function acquireLock(client, resourceId, clientId, timeout = 10) {
    // Return true if lock acquired, false otherwise
}

async function releaseLock(client, resourceId, clientId) {
    // Return true if lock released, false if not owner
}`,
                java: `public class LockManager {
    public boolean acquireLock(GlideClient client, String resourceId, 
                             String clientId, int timeout) {
        // Return true if lock acquired, false otherwise
        return false;
    }
    
    public boolean releaseLock(GlideClient client, String resourceId, 
                             String clientId) {
        // Return true if lock released, false if not owner
        return false;
    }
}`
            },
            tests: {
                python: [
                    {
                        name: 'Test lock acquisition',
                        code: `
lock1 = await acquire_lock(client, "resource1", "client1")
assert lock1 == True, "Failed to acquire lock"
lock2 = await acquire_lock(client, "resource1", "client2")
assert lock2 == False, "Should not acquire locked resource"
await release_lock(client, "resource1", "client1")
lock3 = await acquire_lock(client, "resource1", "client2")
assert lock3 == True, "Should acquire released lock"
`
                    }
                ]
            },
            hints: [
                "Use SETNX for atomic lock acquisition",
                "Include timeout value in lock value",
                "Verify lock ownership before release"
            ]
        }
    ]
};

export const weeklyChallenge = {
    current: {
        id: 'week-27-2023',
        title: 'Distributed Rate Limiter',
        difficulty: 'Hard',
        points: 30,
        description: `Implement a distributed rate limiter using Valkey...`,
        starterCode: {
            python: `// Rate limiter implementation...`,
            javascript: `// Rate limiter implementation...`,
            java: `// Rate limiter implementation...`
        },
        tests: {
            // ... tests for each language
        }
    }
};

export const quizQuestions = [
    {
        id: 1,
        text: 'Which Valkey data structure is best suited for storing a list of items where the order matters and duplicates are allowed?',
        options: ['Set', 'Sorted Set', 'List', 'Hash'],
        correctAnswer: 'List',
        explanation: 'Lists in Valkey maintain insertion order and allow duplicate elements, making them perfect for ordered collections.',
        resourceLink: 'https://valkey.io/docs/data-structures#lists'
    },
    {
        id: 2,
        text: 'Which of the following is NOT a persistence option in Valkey?',
        options: ['RDB (Snapshotting)', 'AOF (Append Only File)', 'No persistence at all', 'WAL (Write-Ahead Log)'],
        correctAnswer: 'WAL (Write-Ahead Log)',
        explanation: 'Valkey supports RDB snapshotting, AOF persistence, or no persistence, but does not use a WAL mechanism.',
        resourceLink: 'https://valkey.io/docs/persistence'
    },
    {
        id: 3,
        text: 'What command is used to start a transaction in Valkey?',
        options: ['BEGIN', 'START', 'MULTI', 'TRANSACTION'],
        correctAnswer: 'MULTI',
        explanation: 'MULTI marks the start of a transaction block in Valkey. Commands after MULTI are queued until EXEC is called.',
        resourceLink: 'https://valkey.io/docs/transactions'
    },
    {
        id: 4,
        text: 'In Valkey\'s Pub/Sub system, what happens if a client is not subscribed to a channel when a message is published to it?',
        options: [
            'The message is stored in the channel until a client subscribes',
            'The message is discarded',
            'The message is sent to all connected clients',
            'An error is returned to the publisher'
        ],
        correctAnswer: 'The message is discarded',
        explanation: 'Valkey\'s Pub/Sub is fire-and-forget. If no clients are subscribed, messages are simply discarded.',
        resourceLink: 'https://valkey.io/docs/pubsub'
    },
    {
        id: 5,
        text: 'What is the primary purpose of the Valkey-Glide client library?',
        options: [
            'To provide a graphical user interface for Valkey',
            'To simplify interactions with Valkey from various programming languages',
            'To manage Valkey clusters',
            'To create backups of Valkey data'
        ],
        correctAnswer: 'To simplify interactions with Valkey from various programming languages',
        explanation: 'Valkey-Glide provides language-specific clients that make it easy to interact with Valkey using idiomatic code.',
        resourceLink: 'https://github.com/valkey-io/valkey-glide'
    },
    {
        id: 6,
        text: 'What is the default behavior of a key in Valkey if no expiration is set?',
        options: [
            'It expires after 24 hours',
            'It expires after 1 hour',
            'It persists indefinitely',
            'It expires when the server restarts'
        ],
        correctAnswer: 'It persists indefinitely',
        explanation: 'By default, Valkey keys have no expiration and will persist until explicitly deleted or the server runs out of memory.',
        resourceLink: 'https://valkey.io/docs/expiration'
    },
    {
        id: 7,
        text: 'When storing a Python dictionary in Valkey using Glide, what do you need to consider?',
        options: [
            'Glide automatically handles the serialization of Python objects',
            'You need to manually serialize the dictionary into a string',
            'Glide only supports storing strings',
            'You need to convert the dictionary into a Valkey Hash'
        ],
        correctAnswer: 'You need to manually serialize the dictionary into a string',
        explanation: 'Glide requires manual serialization (e.g., using JSON) of complex objects before storage in Valkey.',
        resourceLink: 'https://github.com/valkey-io/valkey-glide/blob/main/python/README.md'
    },
    {
        id: 8,
        text: 'Why is using a connection pool important when working with Valkey-Glide in a multi-threaded application?',
        options: [
            'Connection pools are not necessary for Valkey-Glide',
            'To limit connections and improve performance by reusing existing connections',
            'To encrypt the data being sent to and from Valkey',
            'To automatically back up Valkey data'
        ],
        correctAnswer: 'To limit connections and improve performance by reusing existing connections',
        explanation: 'Connection pools manage a set of reusable connections, reducing overhead and improving performance in multi-threaded environments.',
        resourceLink: 'https://github.com/valkey-io/valkey-glide/blob/main/docs/connection-pooling.md'
    }
];
