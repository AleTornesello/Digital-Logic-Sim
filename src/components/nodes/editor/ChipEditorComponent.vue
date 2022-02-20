<template>
  <div id="node-editor" v-if="nodeId && node">
    <div id="node-editor__inputs">
      <chip-input-pin
        v-for="(input, index) in node.inputs"
        :key="index"
        :state="input.connectedLink?.state || false"
        @toggle="toggleInput(index)"
      ></chip-input-pin>
      <!-- <q-menu touch-position>
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup @click="newInputPin()">
            <q-item-section>New input pin</q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->
    </div>
    <div id="node-editor__editor">
      <sub-chip-component
        v-for="subChip in subChips"
        :key="subChip.node.id"
        :node="subChip.node"
        :position="subChip.position"
        class="node-editor__editor__sub-node"
      ></sub-chip-component>
    </div>
    <div id="node-editor__outputs">
      <chip-output-pin
        v-for="(output, index) in node.outputs"
        :key="index"
        :state="output.connectedLink?.state || false"
      ></chip-output-pin>
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
import ChipInputPin from '../../pins/InputPinComponent.vue';
import ChipOutputPin from '../../pins/OutputPinComponent.vue';
import { defineComponent, PropType } from 'vue';
import { Chip } from 'src/models/Chip';
import { extend } from 'quasar';
import { Pin } from 'src/models/Pin';
import SubChipComponent from './SubChipComponent.vue';
import interact from 'interactjs';
import { InteractEvent } from '@interactjs/types';
import Position from 'src/models/core/Position';
import SubChip from 'src/models/SubChip';

export default defineComponent({
  name: 'ChipEditor',
  components: {
    ChipInputPin,
    ChipOutputPin,
    SubChipComponent,
  },
  props: {
    nodes: {
      type: Array as PropType<Array<Chip>>,
      required: true,
    },
    nodeId: {
      type: String,
      required: true,
    },
  },
  data() {
    let node: Chip | undefined;

    return {
      node,
    };
  },
  watch: {
    nodeId(newChipId: string) {
      const node = this.nodes.find((node) => node.id === newChipId);

      if (node) {
        this.node = extend(true, {}, node);
      }
    },
  },
  computed: {
    subChips(): { node: Chip; position: Position }[] {
      if (this.node && this.node.subChips) {
        return this.node.subChips.map((subChip) => {
          return {
            node: this.getChipFromId(subChip.id),
            position: subChip.position,
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
        this.node.inputs[index].connectedLink?.toggleState();
      }
    },
    newInputPin(): void {
      if (this.node?.inputs) {
        this.node.inputs.push(new Pin());
      }
    },
    newOutputPin(): void {
      if (this.node?.outputs) {
        this.node.outputs.push(new Pin());
      }
    },
    addSubChip(nodeId: string): void {
      if (this.node?.subChips) {
        this.node.subChips.push(new SubChip(nodeId, new Position(0, 0)));
      }
    },
    getChipFromId(nodeId: string): Chip {
      const node = this.nodes.find((node) => node.id === nodeId);
      if (node) {
        return node;
      } else {
        throw new Error(`Chip with id ${nodeId} not found`);
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
