export const eventCounter = {
  starterCode: `async def add_event(client, event_id):
    """Add an event with current timestamp to the events sorted set."""
    # TODO: Implement event addition logic
    pass

async def get_recent_events_count(client, window_seconds=60):
    """Return count of events within the last window_seconds."""
    # TODO: Implement event counting logic
    pass`,

  solutionCode: `async def add_event(client, event_id):
    try:
        current_time = time.time()
        return await client.zadd("events", { event_id: current_time })
    except Exception as e:
        print(f"Error adding event: {e}")
        return False

async def get_recent_events_count(client, window_seconds=60):
    try:
        now = time.time()
        min_time = now - window_seconds
        return await client.zcount("events", min_time, now)
    except Exception as e:
        print(f"Error getting recent events: {e}")
        return 0`,

  tests: [
    {
      name: "Basic Event Addition",
      setup: `import time
await client.delete("events")`,
      code: `
now = time.time()
result = await add_event(client, "event1")
assert result == True, "Should successfully add event"
count = await get_recent_events_count(client)
assert count == 1, "Should have one recent event"
`,
    },
    {
      name: "Time Window Handling",
      code: `
await add_event(client, "event2")
await add_event(client, "event3")
count = await get_recent_events_count(client, 1)  # 1 second window
await asyncio.sleep(2)  # Wait for events to age
count_after = await get_recent_events_count(client, 1)
assert count_after == 0, "Should have no events in recent window"
`,
    },
  ],
};

export default eventCounter;
