<template>
  <q-page class="row items-center justify-center">
    <div id="editor-container">
      <node-editor :node="selectedNode"></node-editor>
    </div>
  </q-page>
</template>

<script lang="ts">
import NodeEditor from 'src/components/NodeEditor.vue';
import { defineComponent } from 'vue';
import { Node } from 'src/models/NodeModel';

export default defineComponent({
  name: 'PageIndex',
  components: {
    NodeEditor,
  },
  data() {
    return {
      selectedNode: new Node({
        id: '0',
        name: 'New Node',
        inputs: 2,
      }),
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
