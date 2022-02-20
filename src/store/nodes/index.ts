import { createComposable, Module } from 'vuex-smart-module';
import ChipsState from './state';
import ChipGetters from './getters';
import ChipsMutations from './mutations';
import ChipsActions from './actions';

const nodesModule = new Module<
  ChipsState,
  ChipGetters,
  ChipsMutations,
  ChipsActions
>({
  namespaced: true,
  actions: ChipsActions,
  getters: ChipGetters,
  mutations: ChipsMutations,
  state: ChipsState,
});

export default nodesModule;

export const useChips = createComposable(nodesModule);
