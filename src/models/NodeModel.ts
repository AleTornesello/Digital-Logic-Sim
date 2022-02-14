import { uid } from 'quasar';
export class Node implements BaseNode {
  public id?: string;
  public name?: string;
  public inputs?: number;
  public outputs?: number;
  public function?: (inputs: boolean[]) => boolean[];
  public color?: string;

  constructor(node?: BaseNode) {
    this.id =
      node && Object.prototype.hasOwnProperty.call(node, 'id')
        ? node.id
        : uid();
    this.name =
      node && Object.prototype.hasOwnProperty.call(node, 'name')
        ? node.name
        : 'New Node';
    this.inputs =
      node && Object.prototype.hasOwnProperty.call(node, 'inputs')
        ? node.inputs
        : 1;
    this.outputs =
      node && Object.prototype.hasOwnProperty.call(node, 'outputs')
        ? node.outputs
        : 1;
    this.function =
      node && Object.prototype.hasOwnProperty.call(node, 'function')
        ? node.function
        : undefined;
    this.color =
      node && Object.prototype.hasOwnProperty.call(node, 'color')
        ? node.color
        : '#ffcc00';
  }
}

export interface BaseNode {
  id?: string;
  name?: string;
  inputs?: number;
  outputs?: number;
  function?: (inputs: boolean[]) => boolean[];
  color?: string;
}
