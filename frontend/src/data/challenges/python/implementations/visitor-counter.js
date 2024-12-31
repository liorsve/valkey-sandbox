export const visitorCounter = {
  starterCode: `async def add_visitor(client, visitor_id: str) -> bool:
    """Add a visitor ID to the unique visitors set.
    Returns True if visitor was new, False if already seen."""
    # TODO: Implement visitor addition logic
    pass

async def get_visitor_count(client) -> int:
    """Get total count of unique visitors."""
    # TODO: Implement visitor counting logic
    pass`,

  solutionCode: `async def add_visitor(client, visitor_id: str) -> bool:
    try:
        return await client.sadd("visitors", visitor_id)
    except Exception as e:
        print(f"Error adding visitor: {e}")
        return False

async def get_visitor_count(client) -> int:
    try:
        return await client.scard("visitors")
    except Exception as e:
        print(f"Error getting visitor count: {e}")
        return 0`,

  tests: [
    {
      name: "Basic Visitor Addition",
      setup: 'await client.delete("visitors")',
      code: `
result = await add_visitor(client, "user1")
assert result == True, "Should return True for new visitor"
count = await get_visitor_count(client)
assert count == 1, "Count should be 1 after adding first visitor"
`,
    },
    {
      name: "Duplicate Visitor",
      code: `
first_add = await add_visitor(client, "user2")
second_add = await add_visitor(client, "user2")
assert first_add == True, "First addition should return True"
assert second_add == False, "Second addition should return False"
`,
    },
  ],
};

export default visitorCounter;
