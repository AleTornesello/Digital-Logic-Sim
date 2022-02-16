<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-dark" bordered>
      <q-toolbar>
        <q-toolbar-title>Digital Logic Sim</q-toolbar-title>
      </q-toolbar>

      <q-tabs
        v-model="openedTab"
        @update:modelValue="setVisibleNode(openedTab)"
        dense
        class="bg-dark text-white"
      >
        <q-tab
          v-for="openNodeId in openedNodesIds"
          :key="openNodeId"
          :name="openNodeId"
        >
          <span>
            {{ getNodeById(openNodeId)?.name || '' }}
            <q-btn flat padding="none">
              <q-icon name="close" @click="removeNode(openNodeId)"></q-icon>
            </q-btn>
          </span>
        </q-tab>
        <q-btn flat>
          <q-icon name="add" @click="addNewNode()"></q-icon>
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
          <div
            v-for="node in nodes"
            :key="node.id"
            class="node_preview"
            :style="{ 'background-color': node.color }"
          >
            {{ node.name }}
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- <q-btn
        unelevated
        color="primary"
        @click="toggleNodesDrawer()"
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
import { Node } from 'src/models/NodeModel';
import { uid } from 'quasar';
import { useNodes } from 'src/store/nodes';

declare interface BaseComponentData {
  openedTab: string | null;
  nodesDrawerModel: boolean;
  openedNodesIds: string[];
}

export default defineComponent({
  name: 'MainLayout',
  data(): BaseComponentData {
    return {
      openedTab: null,
      nodesDrawerModel: true,
      openedNodesIds: [],
    };
  },
  setup() {
    const nodesStore = useNodes();
    const nodes = computed(() => nodesStore.getters.nodes);
    return { nodes, nodesStore };
  },
  methods: {
    addNewNode(): void {
      const id: string = uid();
      this.nodesStore.commit('addNode', new Node({ id, name: 'New Node' }));
      this.openedNodesIds.push(id);

      // If there are only one node, set it as visible node
      if (this.openedNodesIds.length === 1) {
        this.setVisibleNode(id);
      }
    },
    removeNode(id: string): void {
      const nodeIndex = this.openedNodesIds.findIndex(
        (nodeId) => nodeId === id
      );

      if (nodeIndex !== -1) {
        this.openedNodesIds.splice(nodeIndex, 1);
      }

      // If there are nodes, set first as visible node,
      // otherwise delete visible node id
      if (this.openedNodesIds.length > 0) {
        this.setVisibleNode(this.openedNodesIds[0]);
      } else {
        this.setVisibleNode(null);
      }
    },
    getNodeById(id: string): Node | undefined {
      return this.nodes.find((node) => node.id === id);
    },
    toggleNodesDrawer(): void {
      this.nodesDrawerModel = !this.nodesDrawerModel;
    },
    setVisibleNode(nodeId: string | null): void {
      this.nodesStore.commit('setVisualizedNode', nodeId);
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

.node_preview {
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 12px 8px;
  color: #000000;
}

#nodes-drawer-toggle {
  border-radius: 0 4px 4px 0;
}
</style>
