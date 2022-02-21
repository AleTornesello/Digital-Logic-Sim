import { uid } from 'quasar';
import { ColorUtils } from 'src/utils/ColorUtils';
import { Link } from '../Link';
import { Pin, PinType } from '../Pin';
import SubChip from '../SubChip';

export interface BaseChip {
  id?: string;
  name: string;
  inputs?: Pin[];
  outputs?: Pin[];
  function?: (inputs: boolean[]) => boolean[];
  color?: string;
  subChips?: SubChip[];
  links?: Link[];
}

export class Chip {
  public id: string;
  public name: string;
  public inputs: Pin[];
  public outputs: Pin[];
  public color: string;
  public subChips: SubChip[];
  public links: Link[];

  constructor(node?: BaseChip) {
    this.id =
      node && Object.prototype.hasOwnProperty.call(node, 'id')
        ? node.id || uid()
        : uid();
    this.name =
      node && Object.prototype.hasOwnProperty.call(node, 'name')
        ? node.name || 'New Chip'
        : 'New Chip';
    this.inputs =
      node && Object.prototype.hasOwnProperty.call(node, 'inputs')
        ? node.inputs || [new Pin()]
        : [new Pin()];
    this.outputs =
      node && Object.prototype.hasOwnProperty.call(node, 'outputs')
        ? node.outputs || [new Pin({ type: PinType.OUTPUT })]
        : [new Pin({ type: PinType.OUTPUT })];
    this.color =
      node && Object.prototype.hasOwnProperty.call(node, 'color')
        ? node.color || ColorUtils.getRandomColor()
        : ColorUtils.getRandomColor();
    this.subChips =
      node && Object.prototype.hasOwnProperty.call(node, 'subChips')
        ? node.subChips || []
        : [];
    this.links =
      node && Object.prototype.hasOwnProperty.call(node, 'sulinksbChips')
        ? node.links || []
        : [];
  }
}
