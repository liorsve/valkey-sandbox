<template>
  <div class="latest-news">
    <div v-for="news in newsItems" :key="news.id" class="news-card">
      <div class="news-header">
        <h3>{{ news.title }}</h3>
        <span class="news-date">{{ formatDate(news.date) }}</span>
      </div>
      <p class="news-excerpt">{{ news.excerpt }}</p>
      <a :href="news.link" target="_blank" class="news-link">Read more →</a>
      <div class="news-tags">
        <span v-for="tag in news.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "LatestNews",

  setup() {
    const newsItems = ref([
      {
        id: 1,
        title: "Introducing Valkey 8.1",
        date: "2025-02-15",
        excerpt:
          "Major release with improved cluster management, enhanced security features, and better performance.",
        link: "#",
        tags: ["Release", "Features"],
      },
      {
        id: 2,
        title: "Valkey Glide: The Next Generation Client",
        date: "2025-01-21",
        excerpt:
          "A new approach to client libraries with enhanced developer experience and type safety.",
        link: "#",
        tags: ["Client", "Developer Tools"],
      },
      // Add more placeholder news items
    ]);

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return {
      newsItems,
      formatDate,
    };
  },
};
</script>

<style scoped>
.latest-news {
  max-width: 800px;
  margin: 0 auto;
}

.news-card {
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--surface-light);
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news-date {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.news-excerpt {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.news-link {
  color: var(--text-accent);
  text-decoration: none;
  font-weight: 500;
}

.news-tags {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: var(--surface-dark);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
  color: var(--text-secondary);
}
</style>
