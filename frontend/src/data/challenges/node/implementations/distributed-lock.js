export const distributedLock = {
  starterCode: `async function acquireLock(client, resourceId, clientId, timeout = 10) {
    // TODO: Implement lock acquisition
    // Return true if lock acquired, false otherwise
    return false;
}

async function releaseLock(client, resourceId, clientId) {
    // TODO: Implement lock release
    // Return true if lock released, false if not owner
    return false;
}`,

  solutionCode: `async function acquireLock(client, resourceId, clientId, timeout = 10) {
    try {
        const lockKey = \`lock:\${resourceId}\`;
        const result = await client.set(lockKey, clientId, {
            conditionalSet: 'onlyIfDoesNotExist',
            expiry: { type: 'EX', count: timeout }
        });
        return result !== null;
    } catch (error) {
        console.error("Error acquiring lock:", error);
        return false;
    }
}

async function releaseLock(client, resourceId, clientId) {
    try {
        const lockKey = \`lock:\${resourceId}\`;
        const currentOwner = await client.get(lockKey);
        if (currentOwner === clientId) {
            await client.del(lockKey);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error releasing lock:", error);
        return false;
    }
}`,

  tests: [
    {
      name: "Lock Acquisition",
      setup: 'await client.delete("lock:resource1");',
      code: `
const result = await acquireLock(client, "resource1", "client1");
assert.strictEqual(result, true, "Should acquire available lock");
const result2 = await acquireLock(client, "resource1", "client2");
assert.strictEqual(result2, false, "Should not acquire locked resource");`,
    },
    {
      name: "Lock Release",
      code: `
const released = await releaseLock(client, "resource1", "client1");
assert.strictEqual(released, true, "Owner should release lock");
const wrongRelease = await releaseLock(client, "resource1", "client2");
assert.strictEqual(wrongRelease, false, "Non-owner should not release lock");`,
    },
  ],
};

export default distributedLock;
