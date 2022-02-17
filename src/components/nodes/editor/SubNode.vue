<template>
  <div>aaaa</div>
</template>

<script lang="ts">
import { Node } from 'src/models/NodeModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubNode',
  props: {
    node: {
      type: Node,
      required: true,
    },
  },
});
</script>
