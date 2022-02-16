import { Node } from 'src/models/NodeModel';
import { Mutations } from 'vuex-smart-module';
import NodesState from './state';
import { emitter } from 'src/boot/global-event-bus';

export default class NodesMutations extends Mutations<NodesState> {
  addNode(node: Node) {
    this.state.nodes.push(node);
  }

  removeNode(nodeId: string) {
    this.state.nodes = this.state.nodes.filter((n) => n.id !== nodeId);
  }

  setVisualizedNode(nodeId: string | null) {
    this.state.visualizedNodeId = nodeId;
  }

  setNodeToAdd(nodeId: string | null) {
    emitter.emit('sub-node:add', nodeId as string);
  }
}
