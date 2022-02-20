<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-dark" bordered>
      <q-toolbar>
        <q-toolbar-title>Digital Logic Sim</q-toolbar-title>
      </q-toolbar>

      <q-tabs
        v-model="openedTab"
        @update:modelValue="setVisibleChip(openedTab)"
        dense
        class="bg-dark text-white"
      >
        <q-tab
          v-for="openChipId in openedChipsIds"
          :key="openChipId"
          :name="openChipId"
        >
          <span>
            {{ getChipById(openChipId)?.name || '' }}
            <q-btn flat padding="none">
              <q-icon name="close" @click="removeChip(openChipId)"></q-icon>
            </q-btn>
          </span>
        </q-tab>
        <q-btn flat>
          <q-icon name="add" @click="addNewChip()"></q-icon>
        </q-btn>
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="nodesDrawerModel"
      show-if-above
      :breakpoint="700"
      class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm" id="nodes_preview_container">
          <chip-preview-component
            v-for="node in nodes"
            :key="node.id"
            :node="node"
            :disabled="openedTab === node.id"
            @add="addSubChip(node.id)"
            @edit="setVisibleChip(node.id)"
          ></chip-preview-component>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- <q-btn
        unelevated
        color="primary"
        @click="toggleChipsDrawer()"
        id="nodes-drawer-toggle"
      >
        <q-icon name="menu"></q-icon>
      </q-btn> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Chip } from 'src/models/chips/Chip';
import { uid } from 'quasar';
import { useChips } from 'src/store/nodes';
import ChipPreviewComponent from 'src/components/nodes/ChipPreviewComponent.vue';

declare interface BaseComponentData {
  openedTab: string | null;
  nodesDrawerModel: boolean;
  openedChipsIds: string[];
}

export default defineComponent({
  name: 'MainLayout',
  components: { ChipPreviewComponent },
  data(): BaseComponentData {
    return {
      openedTab: null,
      nodesDrawerModel: true,
      openedChipsIds: [],
    };
  },
  setup() {
    const nodesStore = useChips();
    const nodes = computed(() => nodesStore.getters.nodes);
    return { nodes, nodesStore };
  },
  methods: {
    addNewChip(): void {
      const id: string = uid();
      this.nodesStore.commit('addChip', new Chip({ id, name: 'New Chip' }));
      this.openedChipsIds.push(id);
      // If there are only one node, set it as visible node
      if (this.openedChipsIds.length === 1) {
        this.setVisibleChip(id);
      }
    },
    removeChip(id: string): void {
      const nodeIndex = this.openedChipsIds.findIndex(
        (nodeId) => nodeId === id
      );
      if (nodeIndex !== -1) {
        this.openedChipsIds.splice(nodeIndex, 1);
      }
      // If there are nodes, set first as visible node,
      // otherwise delete visible node id
      if (this.openedChipsIds.length > 0) {
        this.setVisibleChip(this.openedChipsIds[0]);
      } else {
        this.setVisibleChip(null);
      }
    },
    getChipById(id: string): Chip | undefined {
      return this.nodes.find((node) => node.id === id);
    },
    toggleChipsDrawer(): void {
      this.nodesDrawerModel = !this.nodesDrawerModel;
    },
    setVisibleChip(nodeId: string | null): void {
      this.nodesStore.commit('setVisualizedChip', nodeId);
      this.openedTab = nodeId;
      if (nodeId && !this.openedChipsIds.find((id) => id === nodeId)) {
        this.openedChipsIds.push(nodeId);
      }
    },
    addSubChip(nodeId: string): void {
      this.nodesStore.commit('setChipToAdd', nodeId);
    },
  },
});
</script>

<style lang="scss" scoped>
#nodes_preview_container {
  gap: 8px;
  display: flex;
  flex-direction: column;
}

#nodes-drawer-toggle {
  border-radius: 0 4px 4px 0;
}
</style>
