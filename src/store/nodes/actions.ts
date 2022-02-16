import { Actions } from 'vuex-smart-module';
import NodeGetters from './getters';
import NodesMutations from './mutations';
import NodesState from './state';

export default class NodesActions extends Actions<
  NodesState,
  NodeGetters,
  NodesMutations,
  NodesActions
> {}
