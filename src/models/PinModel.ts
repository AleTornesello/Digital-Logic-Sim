import { uid } from 'quasar';
import { LinkModel } from './LinkModel';

export interface BasePin {
  id?: string;
  connectedLink?: LinkModel;
}

export class PinModel implements BasePin {
  public id?: string;
  public connectedLink?: LinkModel;

  constructor(pin?: BasePin) {
    this.id =
      pin && Object.prototype.hasOwnProperty.call(pin, 'id') ? pin.id : uid();
    this.connectedLink =
      pin && Object.prototype.hasOwnProperty.call(pin, 'connectedLink')
        ? pin.connectedLink
        : undefined;
  }
}
