import { uid } from 'quasar';
import { ColorUtils } from 'src/utils/ColorUtils';
import { Pin } from './Pin';
import SubChip from './SubChip';

export interface BaseChip {
  id?: string;
  name: string;
  inputs?: Pin[];
  outputs?: Pin[];
  function?: (inputs: boolean[]) => boolean[];
  color?: string;
  subChips?: SubChip[];
}

export class Chip implements BaseChip {
  public id?: string;
  public name: string;
  public inputs: Pin[] | undefined;
  public outputs: Pin[] | undefined;
  public function: ((inputs: boolean[]) => boolean[]) | undefined;
  public color?: string;
  public subChips?: SubChip[];

  constructor(node?: BaseChip) {
    this.id =
      node && Object.prototype.hasOwnProperty.call(node, 'id')
        ? node.id
        : uid();
    this.name =
      node && Object.prototype.hasOwnProperty.call(node, 'name')
        ? node.name
        : 'New Chip';
    this.inputs =
      node && Object.prototype.hasOwnProperty.call(node, 'inputs')
        ? node.inputs
        : [new Pin()];
    this.outputs =
      node && Object.prototype.hasOwnProperty.call(node, 'outputs')
        ? node.outputs
        : [new Pin()];
    this.function =
      node && Object.prototype.hasOwnProperty.call(node, 'function')
        ? node.function
        : undefined;
    this.color =
      node && Object.prototype.hasOwnProperty.call(node, 'color')
        ? node.color
        : ColorUtils.getRandomColor();
    this.subChips =
      node && Object.prototype.hasOwnProperty.call(node, 'subChips')
        ? node.subChips
        : [];
  }
}
