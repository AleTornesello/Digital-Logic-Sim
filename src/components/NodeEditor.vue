<template>
  <div id="node-editor" v-if="nodeId && node">
    <div id="node-editor__inputs">
      <node-input-pin
        v-for="(input, index) in node.inputs"
        :key="index"
        :state="input.state || false"
        @toggle="toggleInput(index)"
      ></node-input-pin>
      <q-menu touch-position>
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup @click="newInputPin()">
            <q-item-section>New input pin</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
    <div id="node-editor__editor"></div>
    <div id="node-editor__outputs">
      <node-output-pin
        v-for="(output, index) in node.outputs"
        :key="index"
        :state="output.state || false"
      ></node-output-pin>
    </div>
  </div>
</template>

<script lang="ts">
import NodeInputPin from './InputPin.vue';
import NodeOutputPin from './OutputPin.vue';
import { defineComponent, PropType } from 'vue';
import { Node } from 'src/models/NodeModel';
import { extend } from 'quasar';
import { PinModel } from 'src/models/PinModel';

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
  data() {
    let node: Node | undefined;

    return {
      node,
    };
  },
  components: {
    NodeInputPin,
    NodeOutputPin,
  },
  watch: {
    nodeId(newNodeId: string) {
      const node = this.nodes.find((node) => node.id === newNodeId);

      if (node) {
        this.node = extend(true, {}, node);
      }
    },
  },
  methods: {
    toggleInput(index: number): void {
      if (this.node?.inputs) {
        this.node.inputs[index].state = !this.node.inputs[index].state;
      }
    },
    newInputPin(): void {
      if (this.node?.inputs) {
        this.node.inputs.push(new PinModel());
      }
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
