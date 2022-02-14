<template>
  <div id="node-editor">
    <div id="node-editor__inputs">
      <div class="input" v-for="input in node.inputs" :key="input"></div>
    </div>
    <div id="node-editor__editor"></div>
    <div id="node-editor__outputs">
      <div class="output" v-for="output in node.outputs" :key="output"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NodeEditor',
  props: {
    node: {
      type: Node,
      required: true,
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

.input,
.output {
  width: 24px;
  height: 24px;
  background-color: #202020;
  border-radius: 50%;
  border: 1px solid #101010;
}
</style>
