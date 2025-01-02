<template>
  <div class="weekly-blog">
    <div v-for="post in blogPosts" :key="post.id" class="blog-post">
      <div class="post-header">
        <h2>{{ post.title }}</h2>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-author">by {{ post.author }}</span>
        </div>
      </div>
      <div class="post-image" v-if="post.image">
        <img :src="post.image" :alt="post.title" />
      </div>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <div class="post-content" v-html="post.content"></div>
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "WeeklyBlog",

  setup() {
    const blogPosts = ref([
      {
        id: 1,
        title: "Building Scalable Systems with Valkey Streams",
        date: "2025-02-20",
        author: "Sarah Tech",
        image: "/images/blog/streams.png",
        excerpt:
          "Learn how to leverage Valkey Streams for building real-time data pipelines and event-driven architectures.",
        content: `<p>Valkey Streams provides a powerful way to handle real-time data processing...</p>
                 <p>In this deep dive, we'll explore advanced patterns for stream processing...</p>`,
        tags: ["Streams", "Real-time", "Architecture"],
      },
      {
        id: 2,
        title: "Advanced Cluster Management",
        date: "2025-02-13",
        author: "Mike DevOps",
        excerpt:
          "Best practices for managing large Valkey clusters in production environments.",
        content: `<p>Managing a distributed system at scale requires careful planning...</p>
                 <p>Let's look at some advanced techniques for cluster management...</p>`,
        tags: ["Cluster", "DevOps", "Production"],
      },
    ]);

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return {
      blogPosts,
      formatDate,
    };
  },
};
</script>

<style scoped>
.weekly-blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-post {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--surface-light);
}

.blog-post:last-child {
  border-bottom: none;
}

.post-header {
  margin-bottom: 1.5rem;
}

.post-meta {
  color: var(--text-secondary);
  font-size: 0.9em;
  margin-top: 0.5rem;
}

.post-author {
  margin-left: 1rem;
}

.post-image {
  margin: 1rem 0;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: auto;
}

.post-excerpt {
  font-size: 1.1em;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.post-content {
  line-height: 1.8;
}

.post-tags {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: var(--surface-darker);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
}
</style>
