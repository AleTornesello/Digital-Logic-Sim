import { store } from 'quasar/wrappers';
import { createStore, Module, createComposable } from 'vuex-smart-module';
import VuexPersistence from 'vuex-persist';

import nodesModule from './nodes';

// Root store module, add other modules under module prop
// if you want to use them with namespace
const root = new Module({
  modules: {
    nodes: nodesModule,
  },
});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default store(function (/* { ssrContext } */) {
  const Store = createStore(root, {
    strict: !!process.env.DEBUGGING,
    plugins: [vuexLocal.plugin],
  });

  return Store;
});

export const useStore = createComposable(root);
