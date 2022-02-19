import { uid } from 'quasar';
import { ColorUtils } from 'src/utils/ColorUtils';
import { PinModel } from './PinModel';
import SubNodeModel from './SubNodeModel';

export interface BaseNode {
  id?: string;
  name: string;
  inputs?: PinModel[];
  outputs?: PinModel[];
  function?: (inputs: boolean[]) => boolean[];
  color?: string;
  subNodes?: SubNodeModel[];
}

export class Node implements BaseNode {
  public id?: string;
  public name: string;
  public inputs: PinModel[] | undefined;
  public outputs: PinModel[] | undefined;
  public function: ((inputs: boolean[]) => boolean[]) | undefined;
  public color?: string;
  public subNodes?: SubNodeModel[];

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
