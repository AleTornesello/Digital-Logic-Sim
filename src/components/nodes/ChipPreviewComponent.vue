<template>
  <div
    class="node-preview"
    :style="{ 'background-color': disabled ? '#888888' : node.color }"
    :class="{ clickable: !disabled }"
    @click="onPreviewClick()"
  >
    <div class="node-preview__name">{{ node.name }}</div>
    <div v-if="isCustomChip">
      <q-btn flat @click.stop="onEditClick()">
        <q-icon name="edit"></q-icon>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Chip } from 'src/models/chips/Chip';
import { CustomChip } from 'src/models/chips/CustomChip';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChipPreview',
  props: {
    node: {
      type: Chip,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isCustomChip() {
      return this.node instanceof CustomChip;
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
