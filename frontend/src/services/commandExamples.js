export const getCommandExample = (commandName) => {
  const examples = {
    set: {
      name: "SET",
      category: "String Operations",
      categoryIcon: "📝",
      description: "Set the string value of a key with optional expiration.",
      complexity: "O(1)",
      since: "1.0.0",
      syntax: "SET key value [EX seconds] [PX milliseconds] [NX|XX]",
      parameters: [
        {
          name: "key",
          type: "string",
          description: "The key to set",
        },
        {
          name: "value",
          type: "string",
          description: "The value to set",
        },
        {
          name: "EX seconds",
          type: "integer",
          description: "Set expiration in seconds",
        },
        {
          name: "PX milliseconds",
          type: "integer",
          description: "Set expiration in milliseconds",
        },
        {
          name: "NX",
          type: "modifier",
          description: "Only set if key does not exist",
        },
        {
          name: "XX",
          type: "modifier",
          description: "Only set if key exists",
        },
      ],
      examples: [
        {
          command: 'SET mykey "Hello World"',
          output: "OK",
          explanation: "Set a simple string value",
        },
        {
          command: "SET counter 1 EX 3600",
          output: "OK",
          explanation: "Set a key with expiration of 1 hour",
        },
        {
          command: 'SET user:123 "John" NX',
          output: "OK",
          explanation: "Set a value only if the key does not exist",
        },
      ],
      related: ["GET", "SETEX", "SETNX", "SETRANGE"],
    },
    // Add more commands here...
  };

  return examples[commandName] || null;
};
