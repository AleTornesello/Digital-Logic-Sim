import { uid } from 'quasar';
import { ColorUtils } from 'src/utils/ColorUtils';
import { PinModel } from './PinModel';
export class Node implements BaseNode {
  public id?: string;
  public name?: string;
  public inputs?: PinModel[];
  public outputs?: PinModel[];
  public function?: (inputs: boolean[]) => boolean[];
  public color?: string;
  public subNodes?: { id: string; position: { x: number; y: number } }[];

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
        : [new PinModel()];
    this.outputs =
      node && Object.prototype.hasOwnProperty.call(node, 'outputs')
        ? node.outputs
        : [new PinModel()];
    this.function =
      node && Object.prototype.hasOwnProperty.call(node, 'function')
        ? node.function
        : undefined;
    this.color =
      node && Object.prototype.hasOwnProperty.call(node, 'color')
        ? node.color
        : ColorUtils.getRandomColor();
    this.subNodes =
      node && Object.prototype.hasOwnProperty.call(node, 'subNodes')
        ? node.subNodes
        : [];
  }
}

export interface BaseNode {
  id?: string;
  name?: string;
  inputs?: PinModel[];
  outputs?: PinModel[];
  function?: (inputs: boolean[]) => boolean[];
  color?: string;
  subNodes?: { id: string; position: { x: number; y: number } }[];
}
