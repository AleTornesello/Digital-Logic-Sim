import { Chip } from 'src/models/Chip';
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

  setVisualizedChip(nodeId: string | null) {
    this.state.visualizedChipId = nodeId;
  }

  setChipToAdd(nodeId: string | null) {
    emitter.emit('sub-node:add', nodeId as string);
  }
}
