<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark">
      <q-toolbar>
        <q-toolbar-title>Digital Logic Sim</q-toolbar-title>
      </q-toolbar>

      <q-tabs v-model="openedTab" dense class="bg-dark text-white">
        <q-tab
          v-for="openNode in openNodes"
          :key="openNode.id"
          :name="openNode.id"
        >
          <span>
            {{ openNode.name }}
            <q-btn flat padding="none">
              <q-icon name="close" @click="removeNode()"></q-icon>
            </q-btn>
          </span>
        </q-tab>
        <q-btn flat>
          <q-icon name="add" @click="addNode()"></q-icon>
        </q-btn>
      </q-tabs>
      <q-separator />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Node } from 'src/models/NodeModel';

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      openedTab: '0',
      openNodes: Array.of<Node>(
        new Node({
          id: '0',
          name: 'New Node',
        })
      ),
    };
  },
  methods: {
    addNode(): void {
      this.openNodes.push(
        new Node({
          id: this.openNodes.length.toString(),
          name: 'New Node',
        })
      );
    },
    removeNode(): void {
      const nodeIndex = this.openNodes.findIndex(
        (node) => node.id === this.openedTab
      );

      if (nodeIndex !== -1) {
        this.openNodes.splice(nodeIndex, 1);
      }
    },
  },
});
</script>
