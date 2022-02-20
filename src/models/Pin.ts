import { uid } from 'quasar';
import { Link } from './Link';

export interface BasePin {
  id?: string;
  connectedLink?: Link;
}

export class Pin {
  public id: string;
  public connectedLink: Link | undefined;

  constructor(pin?: BasePin) {
    this.id =
      pin && Object.prototype.hasOwnProperty.call(pin, 'id')
        ? pin.id || uid()
        : uid();
    this.connectedLink =
      pin && Object.prototype.hasOwnProperty.call(pin, 'connectedLink')
        ? pin.connectedLink || undefined
        : undefined;
  }
}
