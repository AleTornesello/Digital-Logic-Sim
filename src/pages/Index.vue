<template>
  <q-page class="row items-center justify-center">
    <div id="editor-container">
      <node-editor
        ref="editor"
        :nodes="nodes"
        :node-id="visualizedNodeId"
      ></node-editor>
    </div>
  </q-page>
</template>

<script lang="ts">
import NodeEditor from 'src/components/NodeEditor.vue';
import { computed, defineComponent, ref } from 'vue';
import { useNodes } from 'src/store/nodes';
import { emitter } from 'src/boot/global-event-bus';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export default defineComponent({
  name: 'PageIndex',
  components: {
    NodeEditor,
  },
  setup() {
    const nodesStore = useNodes();
    const nodes = computed(() => nodesStore.getters.nodes);
    const visualizedNodeId = computed(
      () => nodesStore.getters.visualizedNodeId
    );

    const editor = ref(NodeEditor);

    return {
      visualizedNodeId,
      nodes,
      editor,
    };
  },
  mounted() {
    emitter.on('sub-node:add', (nodeId: string) => {
      if (this.editor) {
        this.editor.addSubNode(nodeId);
      }
    });
  },
  beforeUnmount() {
    emitter.off('sub-node:add');
  },
});
</script>

<style lang="scss" scoped>
#editor-container {
  width: 100%;
  height: 100%;
}
</style>
