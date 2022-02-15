import { uid } from 'quasar';
import { ColorUtils } from 'src/utils/ColorUtils';
export class Node implements BaseNode {
  public id?: string;
  public name?: string;
  public inputs?: boolean[];
  public outputs?: boolean[];
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
        : [false];
    this.outputs =
      node && Object.prototype.hasOwnProperty.call(node, 'outputs')
        ? node.outputs
        : [false];
    this.function =
      node && Object.prototype.hasOwnProperty.call(node, 'function')
        ? node.function
        : undefined;
    this.color =
      node && Object.prototype.hasOwnProperty.call(node, 'color')
        ? node.color
        : ColorUtils.getRandomColor();
  }
}

export interface BaseNode {
  id?: string;
  name?: string;
  inputs?: boolean[];
  outputs?: boolean[];
  function?: (inputs: boolean[]) => boolean[];
  color?: string;
}
