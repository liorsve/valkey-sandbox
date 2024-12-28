export const valkeyGo = {
  standalone: {
    code: `// Valkey Go Example
package main

import (
    "fmt"
    "os"
    "github.com/valkey-io/valkey-go/v9"
    "context"
)

func main() {
    ctx := context.Background()
    host := os.Getenv("VALKEY_STANDALONE_HOST")
    if host == "" {
        host = "valkey-standalone:6379"
    }
    
    rdb := valkey.NewClient(&valkey.Options{
        Addr: host,
    })
    defer rdb.Close()

    // Example operations
    err := rdb.Set(ctx, "key", "value", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := rdb.Get(ctx, "key").Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("key", val)
}`,
    description:
      "A standalone Go template for Valkey Glide, demonstrating basic set and get operations.",
  },

  cluster: {
    code: `// Valkey Go Example - Cluster Mode
package main

import (
    "fmt"
    "os"
    "github.com/valkey-io/valkey-go/v9"
    "context"
)

func main() {
    ctx := context.Background()
    host := os.Getenv("VALKEY_CLUSTER_HOST")
    if host == "" {
        host = "valkey-cluster:7000"
    }

    rdb := valkey.NewFailoverClient(&valkey.FailoverOptions{
        MasterName:    "mymaster",
        SentinelAddrs: []string{host},
    })
    defer rdb.Close()

    // Example operations
    err := rdb.Set(ctx, "key", "value", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := rdb.Get(ctx, "key").Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("key", val)
}`,
    description:
      "A cluster mode Go template for Valkey Glide, showcasing interaction with a Valkey cluster.",
  },
};

export default valkeyGo;
