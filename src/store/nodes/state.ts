import { Node } from 'src/models/NodeModel';

export default class NodesState {
  public nodes: Node[] = [
    new Node({
      name: 'NOT',
      function: (inputs: boolean[]): boolean[] => {
        return [!inputs[0]];
      },
    }),
    new Node({
      inputs: new Array(2).fill(false),
      name: 'AND',
      function: (inputs: boolean[]): boolean[] => {
        return [inputs[0] && inputs[1]];
      },
    }),
  ];
  public visualizedNodeId: string | null = null;
}
