import { Chip } from 'src/models/chips/Chip';
import { Mutations } from 'vuex-smart-module';
import ChipsState from './state';
import { emitter } from 'src/boot/global-event-bus';

export default class ChipsMutations extends Mutations<ChipsState> {
  addChip(node: Chip) {
    this.state.nodes.push(node);
  }

  removeChip(nodeId: string) {
    this.state.nodes = this.state.nodes.filter((n) => n.id !== nodeId);
  }

  updateChip(chip: Chip) {
    const oldChip = this.state.nodes.find((n) => n.id === chip.id);
    if (oldChip) {
      Object.assign(oldChip, chip);
    }
  }

  setVisualizedChip(nodeId: string | null) {
    this.state.visualizedChipId = nodeId;
  }

  setChipToAdd(nodeId: string | null) {
    emitter.emit('sub-node:add', nodeId as string);
  }
}
