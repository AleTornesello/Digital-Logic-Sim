<template>
  <div id="node-editor" v-if="nodeId && node">
    <div id="node-editor__inputs">
      <chip-input-pin
        v-for="(input, index) in node.inputs"
        :key="index"
        :state="input.connectedLinks[0]?.state || false"
        @toggle="toggleInput(index)"
        @anchor="onInputAnchorClick(index)"
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
        @anchor:input="onChipInputAnchorClick($event)"
      ></sub-chip-component>
    </div>
    <div id="node-editor__outputs">
      <chip-output-pin
        v-for="(output, index) in node.outputs"
        :key="index"
        :state="output.connectedLinks[0]?.state || false"
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
import { Chip } from 'src/models/chips/Chip';
import { extend } from 'quasar';
import { Pin, PinType } from 'src/models/Pin';
import SubChipComponent from './SubChipComponent.vue';
import interact from 'interactjs';
import { InteractEvent } from '@interactjs/types';
import SubChip from 'src/models/SubChip';
import { Position } from 'src/models/core/Position';
import { Link } from 'src/models/Link';

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
    let newLink: {
      fromPin: Pin | undefined;
      toPin: Pin | undefined;
    } = {
      fromPin: undefined,
      toPin: undefined,
    };
    let chips: Chip[] = [];

    return {
      node,
      newLink,
      chips,
    };
  },
  watch: {
    nodeId(newChipId: string) {
      this.node = this.chips.find((node) => node.id === newChipId);
    },
    nodes: {
      handler(newNodes: Chip[]) {
        this.chips = extend(true, [], newNodes);
      },
      immediate: true,
      deep: true,
    },
    node: {
      handler(newChip: Chip) {
        this.$emit('update:chip', newChip);
      },
      deep: true,
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
      if (this.node) {
        this.node.inputs[index].connectedLinks.forEach((link) => {
          link.toggleState();
        });
      }
    },
    newInputPin(): void {
      if (this.node) {
        this.node.inputs.push(new Pin());
      }
    },
    newOutputPin(): void {
      if (this.node) {
        this.node.outputs.push(new Pin({ type: PinType.OUTPUT }));
      }
    },
    addSubChip(chipId: string): void {
      if (this.node?.subChips) {
        this.node.subChips.push(new SubChip(chipId, new Position(0, 0)));
      }
    },
    getChipFromId(chipId: string): Chip {
      const chip = this.chips.find((node) => node.id === chipId);
      if (chip) {
        return chip;
      } else {
        throw new Error(`Chip with id ${chipId} not found`);
      }
    },
    dragMoveListener(event: InteractEvent) {
      let target = event.target;

      // Keep the dragged position in the data-x/data-y attributes
      const x: number =
        (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
      const y: number =
        (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;

      // Translate the element
      target.style.transform = `translate(${x}px, ${y}px)`;

      // Update the posiion attributes
      target.setAttribute('data-x', x.toString(10));
      target.setAttribute('data-y', y.toString(10));

      // Update the subChip position
      const id = target.getAttribute('id');
      if (id) {
        this.updateSubChipPosition(id, x, y);
      }
    },
    onInputAnchorClick(index: number): void {
      if (this.node) {
        // Check if exist already a start pin
        if (this.newLink.fromPin) {
          // Check if is not selected the same pin
          if (this.newLink.fromPin.id !== this.node.inputs[index].id) {
            this.newLink.toPin = this.node.inputs[index];
            this.addNewLinkToChip();
          } else {
            this.newLink.fromPin = undefined;
          }
        } else {
          this.newLink.fromPin = this.node.inputs[index];
        }
      }
    },
    onChipInputAnchorClick(pin: Pin): void {
      if (this.node) {
        // Check if exist already a start pin
        if (this.newLink.fromPin) {
          // Check if is not selected the same pin
          if (this.newLink.fromPin.id !== pin.id) {
            this.newLink.toPin = pin;
            this.addNewLinkToChip();
          } else {
            this.newLink.fromPin = undefined;
          }
        } else {
          this.newLink.fromPin = pin;
        }
      }
    },
    addNewLinkToChip() {
      if (this.node && this.newLink.fromPin && this.newLink.toPin) {
        const newLinkIndex: number = this.node.links.push(new Link());

        if (this.newLink.fromPin.type === PinType.INPUT) {
          this.newLink.fromPin.connectedLinks.push(
            this.node.links[newLinkIndex - 1]
          );
        } else {
          this.newLink.fromPin.connectedLinks[0] =
            this.node.links[newLinkIndex - 1];
        }

        if (this.newLink.toPin.type === PinType.INPUT) {
          this.newLink.toPin.connectedLinks.push(
            this.node.links[newLinkIndex - 1]
          );
        } else {
          this.newLink.toPin.connectedLinks[0] =
            this.node.links[newLinkIndex - 1];
        }

        this.newLink = {
          fromPin: undefined,
          toPin: undefined,
        };
      }
    },
    updateSubChipPosition(subChipId: string, x: number, y: number) {
      if (this.node) {
        const subChip = this.node.subChips.find(
          (subChip) => subChip.id === subChipId
        );
        if (subChip) {
          subChip.position = new Position(x, y);
        }
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
