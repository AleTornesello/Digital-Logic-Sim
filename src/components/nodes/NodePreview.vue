<template>
  <div
    class="node-preview"
    :style="{ 'background-color': disabled ? '#888888' : node.color }"
    :class="{ clickable: !disabled }"
    @click="onPreviewClick()"
  >
    <div class="node-preview__name">{{ node.name }}</div>
    <div v-if="!node.function">
      <q-btn flat @click.stop="onEditClick()">
        <q-icon name="edit"></q-icon>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Node } from 'src/models/NodeModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NodePreview',
  props: {
    node: {
      type: Node,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onPreviewClick() {
      if (!this.disabled) {
        this.$emit('add');
      }
    },
    onEditClick() {
      this.$emit('edit');
    },
  },
});
</script>

<style lang="scss" scoped>
.node-preview {
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 12px 8px;
  color: #000000;
  display: flex;
  align-items: center;

  &.clickable {
    cursor: pointer;
  }

  &__name {
    flex-grow: 1;
  }
}
</style>
