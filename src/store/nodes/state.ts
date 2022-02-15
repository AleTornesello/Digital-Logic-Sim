import { Node } from 'src/models/NodeModel';

export default class NodesState {
  public nodes: Node[] = [
    new Node({
      inputs: 1,
      outputs: 1,
      name: 'NOT',
      function: (inputs: boolean[]): boolean[] => {
        return [!inputs[0]];
      },
    }),
    new Node({
      inputs: 2,
      outputs: 1,
      name: 'AND',
      function: (inputs: boolean[]): boolean[] => {
        return [inputs[0] && inputs[1]];
      },
    }),
  ];
  public visualizedNodeId: string | null = null;
}
