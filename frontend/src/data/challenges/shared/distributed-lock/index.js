export const challengeMetadata = {
  id: "distributed-lock",
  title: "Distributed Lock Manager",
  difficulty: "Hard",
  points: 8,
  description: `Create a distributed lock manager with deadlock prevention.

**Objective**:
- Implement distributed locking
- Prevent deadlocks
- Handle lock timeouts

**Requirements**:
- Atomic lock operations
- Lock timeout mechanism
- Safe lock release
- Owner verification`,

  requirements: [
    "Atomic lock acquisition",
    "Timeout-based lock expiry",
    "Safe lock release",
    "Owner verification before release",
  ],

  hints: [
    "Use SETNX for atomic operations",
    "Include timeout in lock value",
    "Store owner ID with lock",
    "Always verify ownership",
  ],

  expectedBehavior: [
    "Lock acquisition should be atomic",
    "Locks should timeout automatically",
    "Only owner should release lock",
    "Concurrent access should be handled",
  ],
};
