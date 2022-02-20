<template>
  <div>
    <div class="output" :class="{ active: state }"></div>
    <div class="output__line"></div>
    <div class="output__anchor" :class="{ active: state }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChipOutputPin',
  props: {
    state: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.output {
  width: 24px;
  height: 24px;
  background-color: #202020;
  border-radius: 50%;
  border: 1px solid #101010;

  &.active {
    background-color: #cc0000;
  }

  &__line {
    width: 16px;
    right: 16px;
    position: relative;
    height: 2px;
    background-color: #101010;
    bottom: 12px;
  }

  &__anchor {
    width: 16px;
    height: 16px;
    position: relative;
    right: 32px;
    background-color: #202020;
    border-radius: 50%;
    border: 1px solid #101010;
    top: -21px;

    &.active {
      background-color: #cc0000;
    }
  }
}
</style>
