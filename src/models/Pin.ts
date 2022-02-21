import { uid } from 'quasar';
import { Link } from './Link';

export enum PinType {
  INPUT,
  OUTPUT,
}

export interface BasePin {
  id?: string;
  // Input pin can be connected to only one link
  // Output pin can be connected to more links
  connectedLinks?: Link[];
  type?: PinType;
}

export class Pin {
  public id: string;
  public connectedLinks: Link[];
  public type: PinType;

  constructor(pin?: BasePin) {
    this.id =
      pin && Object.prototype.hasOwnProperty.call(pin, 'id')
        ? pin.id || uid()
        : uid();
    this.connectedLinks =
      pin && Object.prototype.hasOwnProperty.call(pin, 'connectedLinks')
        ? pin.connectedLinks || []
        : [];
    this.type =
      pin && Object.prototype.hasOwnProperty.call(pin, 'type')
        ? pin.type || PinType.INPUT
        : PinType.INPUT;
  }
}
