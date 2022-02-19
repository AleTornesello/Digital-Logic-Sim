import { uid } from 'quasar';

export interface BaseLink {
  id?: string;
  state?: boolean;
}

export class LinkModel implements BaseLink {
  public id?: string;
  public state?: boolean;

  constructor(pin?: BaseLink) {
    this.id =
      pin && Object.prototype.hasOwnProperty.call(pin, 'id') ? pin.id : uid();
    this.state =
      pin && Object.prototype.hasOwnProperty.call(pin, 'state')
        ? pin.state
        : false;
  }
}
