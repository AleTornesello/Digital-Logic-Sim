<template>
  <div>
    <div class="input"></div>
    <div class="input__line"></div>
    <div class="input__anchor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NodeInputPin',
});
</script>

<style lang="scss" scoped>
.input {
  width: 24px;
  height: 24px;
  background-color: #202020;
  border-radius: 50%;
  border: 1px solid #101010;

  &__line {
    width: 16px;
    left: 23px;
    position: relative;
    height: 2px;
    background-color: #101010;
    bottom: 12px;
  }

  &__anchor {
    width: 16px;
    height: 16px;
    position: relative;
    left: 28px;
    background-color: #202020;
    border-radius: 50%;
    border: 1px solid #101010;
    top: -21px;
  }
}
</style>
