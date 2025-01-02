<template>
  <div class="roadmap">
    <div class="timeline">
      <div
        v-for="milestone in milestones"
        :key="milestone.id"
        class="milestone"
        :class="milestone.status"
      >
        <div class="milestone-header">
          <div class="milestone-meta">
            <span class="milestone-quarter">{{ milestone.quarter }}</span>
            <span class="milestone-status">{{ milestone.status }}</span>
          </div>
          <h3>{{ milestone.title }}</h3>
        </div>

        <div class="milestone-items">
          <div
            v-for="item in milestone.items"
            :key="item.id"
            class="milestone-item"
          >
            <span class="item-icon" :class="item.category">{{
              item.icon
            }}</span>
            <div class="item-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoadMap",

  setup() {
    const milestones = [
      {
        id: 1,
        quarter: "Q2 2025",
        status: "in-progress",
        title: "Enhanced Performance & Scalability",
        items: [
          {
            id: 1,
            icon: "⚡",
            category: "performance",
            title: "Improved Memory Management",
            description:
              "New memory allocator and optimized data structures for better performance.",
          },
          {
            id: 2,
            icon: "🔄",
            category: "scalability",
            title: "Dynamic Cluster Scaling",
            description:
              "Automatic cluster expansion and contraction based on workload.",
          },
        ],
      },
      {
        id: 2,
        quarter: "Q3 2025",
        status: "planned",
        title: "Advanced Security Features",
        items: [
          {
            id: 3,
            icon: "🔐",
            category: "security",
            title: "Enhanced Access Control",
            description:
              "Role-based access control with fine-grained permissions.",
          },
          {
            id: 4,
            icon: "🛡️",
            category: "security",
            title: "Encryption at Rest",
            description: "Transparent data encryption for stored data.",
          },
        ],
      },
    ];

    return {
      milestones,
    };
  },
};
</script>

<style scoped>
.roadmap {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.timeline {
  position: relative;
}

.milestone {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--text-accent);
}

.milestone.planned {
  border-left-color: var(--text-secondary);
}

.milestone.in-progress {
  border-left-color: #4caf50;
}

.milestone-header {
  margin-bottom: 1.5rem;
}

.milestone-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.milestone-quarter {
  color: var(--text-accent);
  font-weight: bold;
}

.milestone-status {
  text-transform: uppercase;
  font-size: 0.8em;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  background: var(--surface-dark);
}

.milestone-items {
  display: grid;
  gap: 1.5rem;
}

.milestone-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-dark);
  border-radius: var(--radius-sm);
}

.item-icon {
  font-size: 1.5rem;
  padding: 0.5rem;
  background: var(--surface-darker);
  border-radius: var(--radius-sm);
}

.item-content h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-accent);
}

.item-content p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.performance {
  background: #7e57c2;
}
.scalability {
  background: #26a69a;
}
.security {
  background: #ef5350;
}
</style>
