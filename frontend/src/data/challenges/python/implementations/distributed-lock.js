export const distributedLock = {
  starterCode: `async def acquire_lock(client, resource_id, client_id, timeout=10):
    """Try to acquire a lock for the given resource.
    Returns True if lock acquired, False otherwise."""
    # TODO: Implement lock acquisition logic
    pass

async def release_lock(client, resource_id, client_id):
    """Release a lock if owned by the client.
    Returns True if lock released, False if not owner."""
    # TODO: Implement lock release logic
    pass`,

  solutionCode: `async def acquire_lock(client, resource_id, client_id, timeout=10):
    try:
        lock_key = f"lock:{resource_id}"
        # Set lock with owner info and timeout
        result = await client.set(
            lock_key,
            client_id,
            conditional_set=ConditionalChange.ONLY_IF_DOES_NOT_EXIST,
            expiry=ExpirySet(ExpiryType.SEC, timeout)
        )
        return bool(result)
    except Exception as e:
        print(f"Error acquiring lock: {e}")
        return False

async def release_lock(client, resource_id, client_id):
    try:
        lock_key = f"lock:{resource_id}"
        # Verify ownership before release
        current_owner = await client.get(lock_key)
        if current_owner and current_owner.decode() == client_id:
            await client.delete(lock_key)
            return True
        return False
    except Exception as e:
        print(f"Error releasing lock: {e}")
        return False`,

  tests: [
    {
      name: "Lock Acquisition",
      setup: 'await client.delete("lock:resource1")',
      code: `
result = await acquire_lock(client, "resource1", "client1")
assert result == True, "Should acquire available lock"
result2 = await acquire_lock(client, "resource1", "client2")
assert result2 == False, "Should not acquire locked resource"
`,
    },
    {
      name: "Lock Release",
      code: `
released = await release_lock(client, "resource1", "client1")
assert released == True, "Owner should release lock"
wrong_release = await release_lock(client, "resource1", "client2")
assert wrong_release == False, "Non-owner should not release lock"
`,
    },
  ],
};

export default distributedLock;
