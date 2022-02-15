<template>
  <q-page class="row items-center justify-center">
    <div id="editor-container">
      <node-editor :nodes="nodes" :node-id="visualizedNodeId"></node-editor>
    </div>
  </q-page>
</template>

<script lang="ts">
import NodeEditor from 'src/components/NodeEditor.vue';
import { computed, defineComponent } from 'vue';
import { useNodes } from 'src/store/nodes';

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

    return {
      visualizedNodeId,
      nodes,
    };
  },
});
</script>

<style lang="scss" scoped>
#editor-container {
  width: 100%;
  height: 100%;
}
</style>
