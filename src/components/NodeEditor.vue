<template>
  <div id="node-editor" v-if="nodeId && node">
    <div id="node-editor__inputs">
      <node-input-pin
        v-for="(input, index) in node.inputs"
        :key="index"
        :state="input"
      ></node-input-pin>
    </div>
    <div id="node-editor__editor"></div>
    <div id="node-editor__outputs">
      <node-output-pin
        v-for="(output, index) in node.outputs"
        :key="index"
        :state="output"
      ></node-output-pin>
    </div>
  </div>
</template>

<script lang="ts">
import NodeInputPin from './InputPin.vue';
import NodeOutputPin from './OutputPin.vue';
import { defineComponent, PropType } from 'vue';
import { Node } from 'src/models/NodeModel';

export default defineComponent({
  name: 'NodeEditor',
  props: {
    nodes: {
      type: Array as PropType<Array<Node>>,
      required: true,
    },
    nodeId: {
      type: String,
      required: true,
    },
  },
  components: {
    NodeInputPin,
    NodeOutputPin,
  },
  computed: {
    node(): Node | undefined {
      return this.nodes.find((node) => node.id === this.nodeId);
    },
  },
});
</script>

<style lang="scss" scoped>
#node-editor {
  width: 90%;
  max-width: 1000px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  border: thin solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  display: flex;
  flex-direction: row;

  &__inputs {
    flex-shrink: 1;
    left: -13px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  &__editor {
    flex-grow: 1;
  }

  &__outputs {
    flex-shrink: 1;
    right: -13px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
</style>
