import { Node } from 'src/models/NodeModel';
import { Mutations } from 'vuex-smart-module';
import NodesState from './state';

export default class NodesMutations extends Mutations<NodesState> {
  addNode(node: Node) {
    this.state.nodes.push(node);
  }

  removeNode(node: Node) {
    this.state.nodes = this.state.nodes.filter((n) => n.id !== node.id);
  }

  setVisualizedNode(nodeId: string) {
    this.state.visualizedNodeId = nodeId;
  }
}
