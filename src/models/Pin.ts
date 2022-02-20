import { uid } from 'quasar';
import { Link } from './Link';

export interface BasePin {
  id?: string;
  connectedLink?: Link;
}

export class Pin implements BasePin {
  public id?: string;
  public connectedLink?: Link;

  constructor(pin?: BasePin) {
    this.id =
      pin && Object.prototype.hasOwnProperty.call(pin, 'id') ? pin.id : uid();
    this.connectedLink =
      pin && Object.prototype.hasOwnProperty.call(pin, 'connectedLink')
        ? pin.connectedLink
        : undefined;
  }
}
