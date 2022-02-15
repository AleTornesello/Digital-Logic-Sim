import { createComposable, Module } from 'vuex-smart-module';
import NodesState from './state';
import NodeGetters from './getters';
import NodesMutations from './mutations';
import NodesActions from './actions';

const nodesModule = new Module<
  NodesState,
  NodeGetters,
  NodesMutations,
  NodesActions
>({
  namespaced: true,
  actions: NodesActions,
  getters: NodeGetters,
  mutations: NodesMutations,
  state: NodesState,
});

export default nodesModule;

export const useNodes = createComposable(nodesModule);
