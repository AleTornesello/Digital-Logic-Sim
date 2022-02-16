import {uid} from 'quasar'

export interface BasePin {
  id?: string;
  state?: boolean;
}

export class PinModel implements BasePin {
  public id?: string;
  public state?: boolean;

  constructor(pin?: BasePin) {
    this.id = pin && Object.prototype.hasOwnProperty.call(pin, 'id') ? pin.id : uid();
    this.state = pin && Object.prototype.hasOwnProperty.call(pin, 'state') ? pin.state : false;
  }
}
