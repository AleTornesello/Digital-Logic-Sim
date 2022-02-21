<template>
  <div
    class="sub-node"
    :style="{
      backgroundColor: node.color,
      transform: `translate(${position.x}px, ${position.y}px)`,
    }"
  >
    <div class="sub-node__inputs">
      <div
        class="sub-node__inputs__anchor"
        v-for="input in node.inputs"
        :key="input.id"
        :class="{ active: input.connectedLinks[0]?.state || false }"
        @click="onInputAnchorClick(input)"
      ></div>
    </div>
    <div class="sub-node__name">
      {{ node.name }}
    </div>
    <div class="sub-node__outputs">
      <div
        class="sub-node__outputs__anchor"
        v-for="output in node.outputs"
        :key="output.id"
        :class="{ active: output.connectedLinks[0]?.state || false }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Chip } from 'src/models/chips/Chip';
import { Position } from 'src/models/core/Position';
import { Pin } from 'src/models/Pin';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubChip',
  props: {
    node: {
      type: Chip,
      required: true,
    },
    position: {
      type: Position,
      required: true,
    },
  },
  methods: {
    onInputAnchorClick(input: Pin) {
      this.$emit('anchor:input', input);
    },
  },
});
</script>

<style lang="scss">
.sub-node {
  width: 150px;
  min-height: 5.5em;
  background-color: #29e;
  color: #000000;
  border-radius: 0.75em;
  touch-action: none;
  user-select: none;
  display: flex;
  border: 1px solid #333333;

  &__inputs,
  &__outputs {
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: space-evenly;

    &__anchor {
      width: 16px;
      height: 16px;
      background-color: #202020;
      border-radius: 50%;
      border: 1px solid #101010;

      &.active {
        background-color: #cc0000;
      }
    }
  }

  &__inputs {
    right: 8px;
  }

  &__outputs {
    left: 8px;
  }

  &__name {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
}
</style>
