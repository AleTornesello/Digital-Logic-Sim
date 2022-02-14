export class Node implements BaseNode {
  public id?: string;
  public name?: string;
  public inputs?: number;
  public outputs?: number;
  public function?: (input: boolean[], outputs: boolean[]) => boolean;

  constructor(node?: BaseNode) {
    this.id =
      node && Object.prototype.hasOwnProperty.call(node, 'id')
        ? node.id
        : undefined;
    this.name =
      node && Object.prototype.hasOwnProperty.call(node, 'name')
        ? node.name
        : undefined;
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
  }
}

export interface BaseNode {
  id?: string;
  name?: string;
  inputs?: number;
  outputs?: number;
  function?: (input: boolean[], outputs: boolean[]) => boolean;
}
