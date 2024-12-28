export const visitorCounter = {
  starterCode: `async function addVisitor(client, visitorId) {
    // TODO: Implement visitor addition logic
    // Return true if visitor was new, false if already seen
    return false;
}

async function getVisitorCount(client) {
    // TODO: Implement visitor counting logic
    // Return total number of unique visitors
    return 0;
}`,

  solutionCode: `async function addVisitor(client, visitorId) {
    try {
        return await client.sadd("visitors", visitorId);
    } catch (error) {
        console.error("Error adding visitor:", error);
        return false;
    }
}

async function getVisitorCount(client) {
    try {
        return await client.scard("visitors");
    } catch (error) {
        console.error("Error getting visitor count:", error);
        return 0;
    }
}`,

  tests: [
    {
      name: "Basic Visitor Addition",
      setup: 'await client.delete("visitors");',
      code: `
const result = await addVisitor(client, "user1");
assert.strictEqual(result, true, "Should return true for new visitor");
const count = await getVisitorCount(client);
assert.strictEqual(count, 1, "Count should be 1 after adding first visitor");`,
    },
    {
      name: "Duplicate Visitor",
      code: `
const firstAdd = await addVisitor(client, "user2");
const secondAdd = await addVisitor(client, "user2");
assert.strictEqual(firstAdd, true, "First addition should return true");
assert.strictEqual(secondAdd, false, "Second addition should return false");`,
    },
  ],
};

export default visitorCounter;
