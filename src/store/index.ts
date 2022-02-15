import { store } from 'quasar/wrappers';
import { createStore, Module, createComposable } from 'vuex-smart-module';

import nodesModule from './nodes';

// Root store module, add other modules under module prop
// if you want to use them with namespace
const root = new Module({
  modules: {
    nodes: nodesModule,
  },
});

export default store(function (/* { ssrContext } */) {
  const Store = createStore(root, {
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export const useStore = createComposable(root);
