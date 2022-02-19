<template>
  <div id="node-editor" v-if="nodeId && node">
    <div id="node-editor__inputs">
      <node-input-pin
        v-for="(input, index) in node.inputs"
        :key="index"
        :state="input.state || false"
        @toggle="toggleInput(index)"
      ></node-input-pin>
      <!-- <q-menu touch-position>
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup @click="newInputPin()">
            <q-item-section>New input pin</q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->
    </div>
    <div id="node-editor__editor">
      <sub-node
        v-for="subNode in subNodes"
        :key="subNode.node.id"
        :node="subNode.node"
        :position="subNode.position"
        class="node-editor__editor__sub-node"
      ></sub-node>
    </div>
    <div id="node-editor__outputs">
      <node-output-pin
        v-for="(output, index) in node.outputs"
        :key="index"
        :state="output.state || false"
      ></node-output-pin>
      <!-- <q-menu touch-position>
        <q-list dense>
          <q-item clickable v-close-popup @click="newOutputPin()">
            <q-item-section>New output pin</q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->
    </div>
  </div>
</template>

<script lang="ts">
import NodeInputPin from '../../pins/InputPin.vue';
import NodeOutputPin from '../../pins/OutputPin.vue';
import { defineComponent, PropType } from 'vue';
import { Node } from 'src/models/NodeModel';
import { extend } from 'quasar';
import { PinModel } from 'src/models/PinModel';
import SubNode from './SubNode.vue';
import interact from 'interactjs';
import { InteractEvent } from '@interactjs/types';
import PositionModel from 'src/models/core/PositionModel';
import SubNodeModel from 'src/models/SubNodeModel';

export default defineComponent({
  name: 'NodeEditor',
  components: {
    NodeInputPin,
    NodeOutputPin,
    SubNode,
  },
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
  watch: {
    nodeId(newNodeId: string) {
      const node = this.nodes.find((node) => node.id === newNodeId);

      if (node) {
        this.node = extend(true, {}, node);
      }
    },
  },
  computed: {
    subNodes(): { node: Node; position: PositionModel }[] {
      if (this.node && this.node.subNodes) {
        return this.node.subNodes.map((subNode) => {
          return {
            node: this.getNodeFromId(subNode.id),
            position: subNode.position,
          };
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    interact('.node-editor__editor__sub-node').draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: false,
        }),
      ],
      // enable autoScroll
      autoScroll: false,

      listeners: {
        // call this function on every dragmove event
        move: (event: InteractEvent) => {
          this.dragMoveListener(event);
        },
      },
    });
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
    newOutputPin(): void {
      if (this.node?.outputs) {
        this.node.outputs.push(new PinModel());
      }
    },
    addSubNode(nodeId: string): void {
      if (this.node?.subNodes) {
        this.node.subNodes.push(
          new SubNodeModel(nodeId, new PositionModel(0, 0))
        );
      }
    },
    getNodeFromId(nodeId: string): Node {
      const node = this.nodes.find((node) => node.id === nodeId);
      if (node) {
        return node;
      } else {
        throw new Error(`Node with id ${nodeId} not found`);
      }
    },
    dragMoveListener(event: InteractEvent) {
      let target = event.target;
      // // keep the dragged position in the data-x/data-y attributes
      const x: number =
        (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
      const y: number =
        (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;

      // // translate the element
      target.style.transform = `translate(${x}px, ${y}px)`;

      // // update the posiion attributes
      target.setAttribute('data-x', x.toString(10));
      target.setAttribute('data-y', y.toString(10));
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
    margin: 0 24px;
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
