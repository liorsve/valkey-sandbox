<template>
  <Transition name="fade">
    <div v-show="show" class="loading-overlay" :class="{ blur: enableBlur }">
      <div class="loading-content">
        <div v-if="showLogo" class="loading-logo">{ Valkey Sandbox }</div>
        <div class="loading-text">{{ computedText }}</div>
        <div class="loading-spinner"></div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { defineComponent, computed, isRef } from "vue";

export default defineComponent({
  name: "LoadingOverlay",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: [String, Object],
      default: "Loading...",
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    enableBlur: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const computedText = computed(() => {
      return isRef(props.text) ? props.text.value : props.text;
    });

    return {
      computedText,
    };
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background: var(--surface-darker);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-overlay.blur {
  backdrop-filter: blur(5px);
}

.loading-content {
  text-align: center;
  transform: translateY(-5%);
}

.loading-logo {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "JetBrains Mono", monospace;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: pulse 2s infinite;
}

.loading-text {
  color: var(--text-secondary);
  margin: 1rem 0;
  font-size: 1.1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 3px solid var(--surface-light);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
