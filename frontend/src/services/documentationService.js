import { renderMarkdown } from "@/utils/markdownRenderer";

class DocumentationService {
  constructor() {
    this.dummyContent = {
      topics: this.getDefaultGeneralConcepts(),
      commands: this.getDefaultCommands(),
      clients: this.getDefaultClients(),
      modules: this.getDefaultModules(),
      languages: this.getSupportedLanguages(),
    };
  }

  getEcosystem(lang) {
    const ecosystems = {
      "Node.js": "npm",
      Python: "pip",
      Go: "go",
      Java: "maven",
      Ruby: "gem",
      Rust: "cargo",
      PHP: "composer",
      "C#": "nuget",
    };
    return ecosystems[lang] || "unknown";
  }

  getGlideInstall(lang) {
    const installations = {
      "Node.js": "npm install @valkey/valkey-glide",
      Python: "pip install valkey-glide",
      Go: "go get github.com/valkey-io/valkey-glide-go",
      Java: "<dependency>\n  <groupId>io.valkey</groupId>\n  <artifactId>valkey-glide</artifactId>\n</dependency>",
      Ruby: "gem install valkey-glide",
      Rust: "cargo add valkey-glide",
      PHP: "composer require valkey/valkey-glide",
      "C#": "dotnet add package Valkey.Glide",
    };
    return installations[lang] || "Installation instructions coming soon";
  }

  async getRenderedGlideDocs() {
    try {
      const response = await fetch("/docs/GLIDE_DOCS.md");
      if (!response.ok) throw new Error("Failed to load Glide docs");
      const text = await response.text();
      return text ? renderMarkdown(text) : this.getDefaultGlideDocs();
    } catch (error) {
      console.warn("Failed to load Glide docs, using default:", error);
      return this.getDefaultGlideDocs();
    }
  }

  async getGeneralConcepts() {
    return this.dummyContent.topics;
  }

  async getCommands() {
    return this.dummyContent.commands;
  }

  async getModules() {
    return this.dummyContent.modules;
  }

  async getClientLanguages() {
    return this.dummyContent.languages;
  }

  getSupportedLanguages() {
    return [
      {
        id: "c",
        name: "C",
        icon: "⚙️",
        status: "stable",
        clients: ["valkey-c", "libvalkey", "valkey-embedded"],
      },
      {
        id: "python",
        name: "Python",
        icon: "🐍",
        status: "stable",
        clients: ["valkey-py", "asyncvalkey", "valkey-cluster-py"],
      },
      {
        id: "nodejs",
        name: "Node.js",
        icon: "🟢",
        status: "stable",
        clients: ["valkey-glide", "valkey-node", "valkey-async-node"],
      },
      {
        id: "go",
        name: "Go",
        icon: "🔵",
        status: "stable",
        clients: ["valkey-go", "govalkey", "valkey-cluster-go"],
      },
      {
        id: "scala",
        name: "Scala",
        icon: "🔴",
        status: "beta",
        clients: ["valkey-scala", "reactive-valkey"],
      },
      {
        id: "rust",
        name: "Rust",
        icon: "🦀",
        status: "beta",
        clients: ["valkey-rs", "rustvalkey", "valkey-oxide"],
      },
      {
        id: "zig",
        name: "Zig",
        icon: "⚡",
        status: "development",
        clients: ["valkey-zig", "zigvalkey"],
      },
      {
        id: "php",
        name: "PHP",
        icon: "🐘",
        status: "stable",
        clients: ["valkey-php", "phpvalkey", "valkey-async-php"],
      },
      {
        id: "java",
        name: "Java",
        icon: "☕",
        status: "stable",
        clients: ["valkey-java", "spring-valkey", "valkey-reactive"],
      },
      {
        id: "ruby",
        name: "Ruby",
        icon: "💎",
        status: "beta",
        clients: ["valkey-rb", "rubyvalkey", "valkey-rails"],
      },
      {
        id: "ocaml",
        name: "OCaml",
        icon: "🐫",
        status: "development",
        clients: ["valkey-ml", "ocamlvalkey"],
      },
      {
        id: "nim",
        name: "Nim",
        icon: "👑",
        status: "development",
        clients: ["valkey-nim", "nimvalkey"],
      },
      {
        id: "lua",
        name: "Lua",
        icon: "🌙",
        status: "beta",
        clients: ["valkey-lua", "lualkey"],
      },
      {
        id: "julia",
        name: "Julia",
        icon: "🔮",
        status: "development",
        clients: ["valkey-julia", "juliavalkey"],
      },
      {
        id: "kotlin",
        name: "Kotlin",
        icon: "🎯",
        status: "beta",
        clients: ["valkey-kt", "kotlinvalkey", "valkey-coroutines"],
      },
      {
        id: "elixir",
        name: "Elixir",
        icon: "💧",
        status: "development",
        clients: ["valkey-ex", "exvalkey", "valkey-phoenix"],
      },
      {
        id: "cpp",
        name: "C++",
        icon: "⚡",
        status: "stable",
        clients: ["valkey-cpp", "libvalkey-cpp", "valkey-modern"],
      },
      {
        id: "dart",
        name: "Dart",
        icon: "🎯",
        status: "development",
        clients: ["valkey-dart", "dartvalkey", "valkey-flutter"],
      },
      {
        id: "csharp",
        name: "C#",
        icon: "🔷",
        status: "stable",
        clients: ["valkey-sharp", "dotnet-valkey", "valkey-async-sharp"],
      },
    ];
  }

  getDefaultModules() {
    return [
      {
        id: "bloom",
        title: "Bloom Filter",
        content:
          "# Bloom Filter Module\nProbabilistic data structure for membership testing...",
      },
      {
        id: "neural",
        title: "Neural Search",
        content:
          "# Neural Search Module\nVector similarity search capabilities...",
      },
    ];
  }

  getDefaultClients() {
    const officialClientTemplate = (name, lang, type = "standard") => ({
      name: `${name}`,
      isOfficial: true,
      version: "1.0.0",
      status: "stable",
      ecosystem: this.getEcosystem(lang),
      description:
        type === "glide"
          ? `Official Rust-powered client for ${lang} with high-performance bindings`
          : `Official ${lang} client implementation`,
      features:
        type === "glide"
          ? [
              "Rust core performance",
              "Native async support",
              "Type safety",
              "Connection pooling",
              "Cluster-aware",
            ]
          : [
              "Easy to use",
              "Full command support",
              "Connection pooling",
              "Cluster support",
            ],
      install: type === "glide" ? this.getGlideInstall(lang) : null,
    });

    const languageClients = {
      nodejs: [
        {
          id: "valkey-glide-node",
          ...officialClientTemplate("Valkey Glide", "Node.js", "glide"),
          install: "npm install @valkey/valkey-glide",
        },
        {
          id: "valkey-node",
          ...officialClientTemplate("Valkey Node", "Node.js"),
          install: "npm install valkey-node",
        },
        {
          id: "valkey-cluster-node",
          name: "Valkey Cluster Node",
          description: "Community client with advanced clustering features",
          install: "npm install valkey-cluster",
        },
      ],
      python: [
        {
          id: "valkey-glide-python",
          ...officialClientTemplate("Valkey Glide", "Python", "glide"),
          install: "pip install valkey-glide",
        },
        {
          id: "valkey-py",
          ...officialClientTemplate("Valkey Python", "Python"),
          install: "pip install valkey-py",
        },
        {
          id: "asyncvalkey",
          name: "AsyncValkey",
          description: "Async-first Python client",
          install: "pip install asyncvalkey",
        },
      ],
      go: [
        {
          id: "valkey-glide-go",
          ...officialClientTemplate("Valkey Glide", "Go", "glide"),
          install: "go get github.com/valkey-io/valkey-glide-go",
        },
        {
          id: "valkey-go",
          ...officialClientTemplate("Valkey Go", "Go"),
          install: "go get github.com/valkey-io/valkey-go",
        },
      ],
      java: [
        {
          id: "valkey-glide-java",
          ...officialClientTemplate("Valkey Glide", "Java", "glide"),
          install: "Maven: io.valkey:valkey-glide:1.0.0",
        },
        {
          id: "valkey-java",
          ...officialClientTemplate("Valkey Java", "Java"),
          install: "Maven: io.valkey:valkey-java:1.0.0",
        },
      ],
      rust: [
        {
          id: "valkey-rs",
          ...officialClientTemplate("Valkey Rust", "Rust"),
          install: "cargo add valkey",
        },
      ],
      php: [
        {
          id: "valkey-php",
          ...officialClientTemplate("Valkey PHP", "PHP"),
          install: "composer require valkey/valkey",
        },
      ],
    };

    return {
      languages: Object.keys(languageClients),
      clientsByLanguage: languageClients,
    };
  }

  async getClientsByLanguage(language) {
    const { clientsByLanguage, clientDetails } = this.getDefaultClients();
    const clients = clientsByLanguage[language] || [];
    return clients.map((clientId) => ({
      id: clientId,
      ...clientDetails[clientId],
    }));
  }

  async getClientDetails(clientId) {
    const { clientDetails } = this.getDefaultClients();
    return clientDetails[clientId] || null;
  }

  getDefaultGeneralConcepts() {
    return [
      {
        id: "intro",
        title: "Introduction to Valkey",
        content: `# Introduction to Valkey
        
Valkey is a modern distributed key-value store system designed for high performance and scalability.

## Key Features

- Distributed Architecture
- High Availability
- Horizontal Scaling
- Rich Data Structures
- Multi-Language Support`,
      },
      {
        id: "architecture",
        title: "System Architecture",
        content: `# Valkey Architecture

## Core Components

- Distributed Storage Engine
- Replication Manager
- Client Protocol Handler
        - Command Processor`,
      },
    ];
  }

  getDefaultCommands() {
    const commandCategories = {
      "Access Control": {
        icon: "🔒",
        commands: [
          "acl-cat",
          "acl-deluser",
          "acl-dryrun",
          "acl-genpass",
          "acl-getuser",
          "acl-help",
          "acl-list",
          "acl-load",
          "acl-log",
          "acl-save",
          "acl-setuser",
          "acl-users",
          "acl-whoami",
        ],
      },
      "String Operations": {
        icon: "📝",
        commands: [
          "append",
          "get",
          "getbit",
          "getdel",
          "getex",
          "getrange",
          "getset",
          "set",
          "setbit",
          "setex",
          "setnx",
          "setrange",
          "strlen",
          "substr",
        ],
      },
      "Hash Operations": {
        icon: "🔨",
        commands: [
          "hdel",
          "hexists",
          "hget",
          "hgetall",
          "hincrby",
          "hincrbyfloat",
          "hkeys",
          "hlen",
          "hmget",
          "hmset",
          "hrandfield",
          "hscan",
          "hset",
          "hsetnx",
          "hstrlen",
          "hvals",
        ],
      },
      "List Operations": {
        icon: "📋",
        commands: [
          "blmove",
          "blmpop",
          "blpop",
          "brpop",
          "brpoplpush",
          "lindex",
          "linsert",
          "llen",
          "lmove",
          "lmpop",
          "lpop",
          "lpos",
          "lpush",
          "lpushx",
          "lrange",
          "lrem",
          "lset",
          "ltrim",
        ],
      },
      "Set Operations": {
        icon: "🎯",
        commands: [
          "sadd",
          "scard",
          "sdiff",
          "sdiffstore",
          "sinter",
          "sintercard",
          "sinterstore",
          "sismember",
          "smembers",
          "smismember",
          "smove",
          "spop",
          "srandmember",
          "srem",
          "sscan",
          "sunion",
          "sunionstore",
        ],
      },
      "Sorted Set Operations": {
        icon: "📊",
        commands: [
          "zadd",
          "zcard",
          "zcount",
          "zdiff",
          "zdiffstore",
          "zincrby",
          "zinter",
          "zintercard",
          "zinterstore",
          "zlexcount",
          "zmpop",
          "zmscore",
          "zpopmax",
          "zpopmin",
          "zrandmember",
          "zrange",
          "zrangebylex",
          "zrangebyscore",
          "zrangestore",
          "zrank",
          "zrem",
          "zremrangebylex",
          "zremrangebyrank",
          "zremrangebyscore",
          "zrevrange",
          "zrevrangebylex",
          "zrevrangebyscore",
          "zrevrank",
          "zscan",
          "zscore",
          "zunion",
          "zunionstore",
        ],
      },
      "Cluster Management": {
        icon: "🌐",
        commands: [
          "cluster-addslots",
          "cluster-addslotsrange",
          "cluster-bumpepoch",
          "cluster-count-failure-reports",
          "cluster-countkeysinslot",
          "cluster-delslots",
          "cluster-delslotsrange",
          "cluster-failover",
          "cluster-flushslots",
          "cluster-forget",
          "cluster-getkeysinslot",
          "cluster-help",
          "cluster-info",
          "cluster-keyslot",
          "cluster-links",
          "cluster-meet",
          "cluster-myid",
          "cluster-myshardid",
          "cluster-nodes",
          "cluster-replicas",
          "cluster-replicate",
          "cluster-reset",
          "cluster-saveconfig",
          "cluster-set-config-epoch",
          "cluster-setslot",
          "cluster-shards",
          "cluster-slaves",
        ],
      },
      "Connection Management": {
        icon: "🔌",
        commands: [
          "auth",
          "client-caching",
          "client-getname",
          "client-getredir",
          "client-id",
          "client-info",
          "client-kill",
          "client-list",
          "client-no-evict",
          "client-no-touch",
          "client-pause",
          "client-setinfo",
          "client-setname",
          "client-tracking",
          "client-unblock",
          "client-unpause",
          "echo",
          "ping",
          "quit",
          "select",
        ],
      },
      "Server Management": {
        icon: "⚙️",
        commands: [
          "bgrewriteaof",
          "bgsave",
          "command-count",
          "command-docs",
          "command-getkeys",
          "command-help",
          "command-info",
          "command-list",
          "config-get",
          "config-resetstat",
          "config-rewrite",
          "config-set",
          "dbsize",
          "flushall",
          "flushdb",
          "info",
          "lastsave",
          "memory-doctor",
          "memory-help",
          "memory-malloc-stats",
          "memory-purge",
          "memory-stats",
          "memory-usage",
          "save",
          "shutdown",
          "slaveof",
          "slowlog-get",
          "slowlog-len",
          "slowlog-reset",
          "time",
        ],
      },
      Transactions: {
        icon: "🔄",
        commands: ["discard", "exec", "multi", "unwatch", "watch"],
      },
      Scripting: {
        icon: "📜",
        commands: [
          "eval",
          "eval_ro",
          "evalsha",
          "evalsha_ro",
          "script-debug",
          "script-exists",
          "script-flush",
          "script-kill",
          "script-load",
        ],
      },
      "Pub/Sub": {
        icon: "📢",
        commands: [
          "publish",
          "psubscribe",
          "pubsub-channels",
          "pubsub-numpat",
          "pubsub-numsub",
          "pubsub-shardchannels",
          "pubsub-shardnumsub",
          "punsubscribe",
          "subscribe",
          "unsubscribe",
        ],
      },
    };

    return Object.entries(commandCategories).flatMap(([category, info]) =>
      info.commands.map((cmd) => ({
        name: cmd,
        category,
        categoryIcon: info.icon,
        description: this.getCommandDescription(cmd),
        syntax: this.getCommandSyntax(cmd),
        examples: this.getCommandExamples(cmd),
      }))
    );
  }

  getCommandDescription(cmd) {
    const descriptions = {
      get: "Retrieve the value of a key",
      set: "Set the string value of a key",
    };
    return descriptions[cmd] || `Documentation for ${cmd} command`;
  }

  getCommandSyntax(cmd) {
    const syntax = {
      get: "GET key",
      set: "SET key value [EX seconds] [PX milliseconds] [NX|XX]",
    };
    return syntax[cmd] || `${cmd.toUpperCase()} [arguments]`;
  }

  getCommandExamples(cmd) {
    const examples = {
      get: ["GET mykey", "GET user:1:name"],
      set: ["SET mykey value", 'SET user:1:name "John Doe" EX 3600'],
    };
    return examples[cmd] || [`${cmd.toUpperCase()} example:key`];
  }
}

export default new DocumentationService();
