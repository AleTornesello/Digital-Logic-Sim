import { Actions } from 'vuex-smart-module';
import ChipGetters from './getters';
import ChipsMutations from './mutations';
import ChipsState from './state';

export default class ChipsActions extends Actions<
  ChipsState,
  ChipGetters,
  ChipsMutations,
  ChipsActions
> {}
