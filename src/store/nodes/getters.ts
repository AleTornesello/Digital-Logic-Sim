import { AndChip } from 'src/models/chips/AndChip';
import { Chip } from 'src/models/chips/Chip';
import { CustomChip } from 'src/models/chips/CustomChip';
import { NotChip } from 'src/models/chips/NotChip';
import { Getters } from 'vuex-smart-module';
import ChipsState from './state';

export default class ChipGetters extends Getters<ChipsState> {
  get nodes(): Chip[] {
    return [
      new NotChip(this.state.nodes[0]),
      new AndChip(this.state.nodes[1]),
      ...this.state.nodes.slice(2).map((chip) => new CustomChip(chip)),
    ];
  }

  get visualizedChipId(): string | null {
    return this.state.visualizedChipId;
  }
}
