export const challengeMetadata = {
  id: "visitor-counter",
  title: "Unique Visitor Counter",
  difficulty: "Easy",
  points: 3,
  description: `Track unique visitors using Valkey's Set data structure.
  
**Objective**:
- Implement a visitor tracking system
- Count unique visitors efficiently
- Handle concurrent access

**Requirements**:
- Use SADD for adding visitors
- Use SCARD for counting
- Implement proper error handling`,

  requirements: [
    "Implement addVisitor function",
    "Implement getVisitorCount function",
    "Handle concurrent access",
    "Maintain data consistency",
  ],

  hints: [
    "Use SADD to automatically handle duplicates",
    "SCARD will give you the total unique count",
    "Remember to handle errors appropriately",
  ],

  expectedBehavior: [
    "New visitors should be added successfully",
    "Duplicate visitors should be detected",
    "Total count should be accurate",
    "Should handle errors gracefully",
  ],

  testScenarios: [
    {
      name: "Adding new visitor",
      expectations: [
        "Should return true for new visitor",
        "Should increment total count",
      ],
    },
    {
      name: "Adding duplicate visitor",
      expectations: [
        "Should return false for duplicate",
        "Should not increment count",
      ],
    },
  ],
};
