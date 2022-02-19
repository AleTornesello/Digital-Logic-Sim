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
        :class="{ active: input.state }"
      ></div>
    </div>
    <div class="sub-node__name">
      {{ node.name }}
    </div>
    <div class="sub-node__outputs">
      <div
        class="sub-node__outputs__anchor"
        v-for="input in node.inputs"
        :key="input.id"
        :class="{ active: input.state }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import PositionModel from 'src/models/core/PositionModel';
import { Node } from 'src/models/NodeModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubNode',
  props: {
    node: {
      type: Node,
      required: true,
    },
    position: {
      type: PositionModel,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.sub-node {
  width: 20%;
  min-height: 6.5em;
  background-color: #29e;
  color: #000000;
  border-radius: 0.75em;
  touch-action: none;
  user-select: none;
  display: flex;
  align-items: center;

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
  }
}
</style>
