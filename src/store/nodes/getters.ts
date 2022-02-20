import { Chip } from 'src/models/Chip';
import { Getters } from 'vuex-smart-module';
import ChipsState from './state';

export default class ChipGetters extends Getters<ChipsState> {
  get nodes(): Chip[] {
    return this.state.nodes;
  }

  get visualizedChipId(): string | null {
    return this.state.visualizedChipId;
  }
}
