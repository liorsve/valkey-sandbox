<template>
  <div class="watch-editor">
    <BaseEditor
      v-model="editorContent"
      :language="language"
      :readonly="false"
      @ready="onReady"
      @change="handleContentUpdate"
    />
  </div>
</template>

<script>
import { defineComponent, watch, computed } from "vue";
import BaseEditor from "@/components/base/BaseEditor.vue";
import { useEventBus, EventTypes } from "@/composables/useEventBus";

export default defineComponent({
  name: "WatchEditor",
  components: { BaseEditor },
  props: {
    content: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
  },
  emits: ["ready", "update:content"],

  setup(props, { emit }) {
    const { emit: emitEvent } = useEventBus();

    const editorContent = computed({
      get: () => props.content || "",
      set: (value) => emit("update:content", value),
    });

    const handleContentUpdate = (newContent) => {
      emit("update:content", newContent);
    };

    const onReady = () => {
      emit("ready");
      emitEvent(EventTypes.EDITOR_READY);
    };

    watch(
      () => props.content,
      (newContent) => {
        if (newContent) {
          emitEvent(EventTypes.EDITOR_CONTENT_UPDATED, newContent);
        }
      }
    );

    watch(
      () => props.language,
      (newLanguage) => {
        emitEvent(EventTypes.EDITOR_LANGUAGE_CHANGED, newLanguage);
      }
    );

    return {
      editorContent,
      onReady,
      handleContentUpdate,
    };
  },
});
</script>

<style scoped>
.watch-editor {
  height: 100%;
  border-radius: var(--radius-md);
  background-color: var(--surface-darker);
  overflow: hidden;
}
</style>
