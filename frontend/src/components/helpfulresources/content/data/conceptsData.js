export const conceptsData = [
  {
    id: "introduction",
    icon: "📚",
    title: "Introduction",
    summary: "Learn about the Valkey open source project",
    content: `
      <h1>Introduction to Valkey</h1>
      <p>Valkey is an open source (BSD licensed), in-memory data structure store used as a database, cache, message broker, and streaming engine. Valkey provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Built-in replication</li>
        <li>Lua scripting</li>
        <li>LRU eviction</li>
        <li>Transactions</li>
        <li>High availability via Valkey Sentinel</li>
        <li>Automatic partitioning with Valkey Cluster</li>
      </ul>
      
      <h2>Performance</h2>
      <p>To achieve top performance, Valkey works with an in-memory dataset. Depending on your use case, you can persist your data either by periodically dumping the dataset to disk or by appending each command to a disk-based log.</p>
    `,
  },
  {
    id: "cluster-tutorial",
    icon: "🌐",
    title: "Cluster Tutorial",
    summary:
      "Learn how to set up and manage horizontal scaling with Valkey Cluster",
    content: `
      <h1>Cluster Tutorial</h1>
      <p>Valkey scales horizontally with a deployment topology called Valkey Cluster. This topic will teach you how to set up, test, and operate Valkey Cluster in production.</p>

      <h2>Valkey Cluster 101</h2>
      <p>Valkey Cluster provides a way to run a Valkey installation where data is automatically sharded across multiple Valkey nodes. 
      Valkey Cluster also provides some degree of availability during partitions—in practical terms, the ability to continue operations 
      when some nodes fail or are unable to communicate.</p>

      <h2>TCP Ports Configuration</h2>
      <p>Every Valkey Cluster node requires two open TCP connections:</p>
      <ul>
        <li>A Valkey TCP port (e.g., 6379) to serve clients</li>
        <li>A cluster bus port (default: data port + 10000)</li>
      </ul>

      <h2>Data Sharding</h2>
      <p>Valkey Cluster uses 16384 hash slots for sharding. The hash slot for a key is computed using CRC16(key) mod 16384. 
      Every node in a Valkey Cluster is responsible for a subset of these hash slots.</p>

      <h2>Primary-Replica Model</h2>
      <p>To maintain availability during node failures, Valkey Cluster uses a primary-replica model where every hash slot can have 
      multiple replicas.</p>

      <h2>Consistency Guarantees</h2>
      <p>Valkey Cluster uses asynchronous replication and does not guarantee strong consistency. Under certain conditions, 
      acknowledged writes might be lost.</p>
    `,
  },
  {
    id: "data-types",
    icon: "🏗️",
    title: "Data Types",
    summary: "Overview of data types supported by Valkey",
    content: `
      <h1>Data Types</h1>
      <p>Valkey is a data structure server providing a collection of native data types that help solve a wide variety of problems.</p>

      <h2>Core Data Types</h2>
      
      <h3>Strings</h3>
      <p>The most basic Valkey data type, representing a sequence of bytes.</p>
      
      <h3>Lists</h3>
      <p>Lists of strings sorted by insertion order.</p>
      
      <h3>Sets</h3>
      <p>Unordered collections of unique strings with O(1) add, remove, and existence testing.</p>
      
      <h3>Hashes</h3>
      <p>Record types modeled as collections of field-value pairs.</p>
      
      <h3>Sorted Sets</h3>
      <p>Collections of unique strings that maintain order by associated scores.</p>
      
      <h3>Streams</h3>
      <p>Append-only log structure for event recording and processing.</p>
      
      <h3>Geospatial</h3>
      <p>Indexes for finding locations within geographic radius or bounding box.</p>
      
      <h3>Bitmaps & Bitfields</h3>
      <p>Efficient bit-level operations and multiple counter encoding.</p>
      
      <h3>HyperLogLog</h3>
      <p>Probabilistic data structure for cardinality estimation of large sets.</p>
    `,
  },
  {
    id: "acl",
    icon: "🔐",
    title: "Access Control",
    summary: "Learn about Valkey's ACL system for security",
    content: `
      <h1>Access Control Lists (ACL)</h1>
      <p>Valkey ACLs provide a flexible security layer with user management and permission control.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>User-based authentication</li>
        <li>Fine-grained command control</li>
        <li>Key pattern permissions</li>
        <li>Password management</li>
      </ul>
    `,
  },
  // More concepts can be added here...
];
