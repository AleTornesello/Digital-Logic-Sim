import { Node } from 'src/models/NodeModel';
import { Getters } from 'vuex-smart-module';
import NodesState from './state';

export default class NodeGetters extends Getters<NodesState> {
  get nodes(): Node[] {
    return this.state.nodes;
  }
}
