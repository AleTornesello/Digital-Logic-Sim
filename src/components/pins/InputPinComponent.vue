<template>
  <div>
    <div class="input" :class="{ active: state }" @click="toggleState()"></div>
    <div class="input__line"></div>
    <div class="input__anchor" :class="{ active: state }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChipInputPin',
  props: {
    state: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleState() {
      this.$emit('toggle');
    },
  },
});
</script>

<style lang="scss" scoped>
.input {
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
    left: 24px;
    position: relative;
    height: 2px;
    background-color: #101010;
    bottom: 12px;
  }

  &__anchor {
    width: 16px;
    height: 16px;
    position: relative;
    left: 40px;
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
