# Valkey Code Templates Navigation Guide

## Directory Structure

```
data/
├── index.js                     # Main data navigator
├── data-navigation.md           # This documentation
├── codeTemplates/               # Code templates by client and language
│   ├── index.js                 # Exports all code templates
│   ├── valkey-glide/            # Glide multi-language implementations
│   │   ├── index.js             # Exports all glide templates
│   │   ├── python/              # Python templates
│   │   │   ├── standalone.js    # Standalone mode templates
│   │   │   └── cluster.js       # Cluster mode templates
│   │   ├── node/                # Node.js templates
│   │   │   ├── standalone.js
│   │   │   └── cluster.js
│   │   └── java/                # Java templates
│   │       ├── standalone.js
│   │       └── cluster.js
│   │
│   ├── advanced/                # Advanced features by language
│   │   ├── index.js
│   │   ├── python/
│   │   │   ├── session-cache.js
│   │   │   ├── recommendation.js
│   │   │   ├── lock.js
│   │   │   └── queue.js
│   │   ├── node/
│   │   └── java/
│
├── valkey-py/                   # Python native client
│   ├── index.js
│   └── basic.js                 # Standalone and cluster templates
│
├── iovalkey/                    # Node.js native client
│   ├── index.js
│   └── basic.js                 # Standalone and cluster templates
│
├── valkey-java/                 # Java native client
│   ├── index.js
│   └── basic.js                 # Standalone and cluster templates
│
└── valkey-go/                   # Go native client
    ├── index.js
    └── basic.js                 # Standalone and cluster templates
challenges/
├── index.js                     # Exports all challenges
├── python/
├── node/
└── java/
```

## Usage Examples

### Getting Templates

```javascript
// Get basic template
const pythonStandalone = templates.getTemplate("valkey-py", "standalone");
const nodeCluster = templates.getTemplate("glide-node", "cluster");

// Get advanced feature template
const sessionCache = templates.getTemplate("glide-python", "session-cache");
const recommendationSystem = templates.getTemplate(
  "glide-node",
  "recommendation"
);

// Get challenge template
const visitorCounter = challenges.getChallenge("visitor-counter", "python");

// Get native client template
const pythonNative = templates.getTemplate("valkey-py", "standalone");
```

### Listing Available Templates

```javascript
// List all templates for a client
const glideTemplates = templates.listTemplates("valkey-glide");

// List all Python templates
const pythonTemplates = templates.listTemplates("valkey-glide", "python");

// List all Node.js advanced templates
const nodeAdvanced = templates.listTemplates("glide-node");

// List all Java challenges
const javaChallenges = challenges.listChallenges("java");
```

### Template Categories

1. **Basic Operations**

   - Standalone mode setup
   - Cluster mode setup
   - Basic CRUD operations

2. **Advanced Features**

   - Session Cache
   - Recommendation System
   - Distributed Lock
   - Queue Management
   - Pub/Sub System
   - Rate Limiting

3. **Challenges**
   - Visitor Counter
   - Rate Limiter
   - Distributed Lock Manager
   - Trending Hashtags

## Best Practices

1. Always use the `getTemplate` method to retrieve templates.
2. Check template existence before usage.
3. Use the appropriate client library for your language.
4. Consider cluster mode for production deployments.

## Example Implementation

```javascript
// Example: Setting up a Python Valkey-Glide application
const template = templates.getTemplate("glide-python", "standalone");
if (template) {
  console.log("Template found:", template.name);
  console.log("Description:", template.description);
  console.log("Code:", template.code);
}
```
