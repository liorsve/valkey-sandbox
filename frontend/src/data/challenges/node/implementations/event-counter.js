export const eventCounter = {
  starterCode: `async function addEvent(client, eventId) {
    // TODO: Implement event addition logic
    // Add event with current timestamp
    return false;
}

async function getRecentEventsCount(client, windowSeconds = 60) {
    // TODO: Implement event counting logic
    // Return count of events within time window
    return 0;
}`,

  solutionCode: `async function addEvent(client, eventId) {
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

  tests: [
    {
      name: "Basic Event Addition",
      setup: 'await client.delete("events");',
      code: `
const result = await addEvent(client, "event1");
assert.strictEqual(result, true, "Should successfully add event");
const count = await getRecentEventsCount(client);
assert.strictEqual(count, 1, "Should have one recent event");`,
    },
    {
      name: "Time Window Handling",
      code: `
await addEvent(client, "event2");
await addEvent(client, "event3");
const count = await getRecentEventsCount(client, 1); // 1 second window
await new Promise(r => setTimeout(r, 2000)); // Wait for events to age
const countAfter = await getRecentEventsCount(client, 1);
assert.strictEqual(countAfter, 0, "Should have no events in recent window");`,
    },
  ],
};

export default eventCounter;
