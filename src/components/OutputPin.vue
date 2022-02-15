<template>
  <div>
    <div class="output"></div>
    <div class="output__line"></div>
    <div class="output__anchor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NodeOutputPin',
});
</script>

<style lang="scss" scoped>
.output {
  width: 24px;
  height: 24px;
  background-color: #202020;
  border-radius: 50%;
  border: 1px solid #101010;

  &__line {
    width: 16px;
    left: -14px;
    position: relative;
    height: 2px;
    background-color: #101010;
    bottom: 12px;
  }

  &__anchor {
    width: 16px;
    height: 16px;
    position: relative;
    left: -28px;
    background-color: #202020;
    border-radius: 50%;
    border: 1px solid #101010;
    top: -21px;
  }
}
</style>
