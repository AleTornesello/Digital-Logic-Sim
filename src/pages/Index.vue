<template>
  <q-page class="row items-center justify-center">
    <div id="editor-container">
      <chip-editor-component
        v-if="!!visualizedChipId"
        ref="editor"
        :nodes="nodes"
        :node-id="visualizedChipId"
        @update:chip="onUpdateChip($event)"
      ></chip-editor-component>
    </div>
  </q-page>
</template>

<script lang="ts">
import ChipEditorComponent from 'src/components/nodes/editor/ChipEditorComponent.vue';
import { computed, defineComponent, ref } from 'vue';
import { useChips } from 'src/store/nodes';
import { emitter } from 'src/boot/global-event-bus';
import { Chip } from 'src/models/chips/Chip';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export default defineComponent({
  name: 'PageIndex',
  components: {
    ChipEditorComponent,
  },
  setup() {
    const nodesStore = useChips();
    const nodes = computed(() => nodesStore.getters.nodes);
    const visualizedChipId = computed(
      () => nodesStore.getters.visualizedChipId
    );

    const editor = ref(ChipEditorComponent);

    return {
      nodesStore,
      visualizedChipId,
      nodes,
      editor,
    };
  },
  mounted() {
    emitter.on('sub-node:add', (nodeId: string) => {
      if (this.editor) {
        this.editor.addSubChip(nodeId);
      }
    });
  },
  beforeUnmount() {
    emitter.off('sub-node:add');
  },
  methods: {
    onUpdateChip(chip: Chip) {
      this.nodesStore.commit('updateChip', chip);
    },
  },
});
</script>

<style lang="scss" scoped>
#editor-container {
  width: 100%;
  height: 100%;
}
</style>
