import { uid } from 'quasar';
import { Pin } from './Pin';

export interface BaseLink {
  id?: string;
  state?: boolean;
  fromPin: Pin;
  toPin: Pin;
}

export class Link {
  public id: string;
  public state: boolean;
  public fromPin: Pin;
  public toPin: Pin;

  constructor(link: BaseLink) {
    this.id =
      link && Object.prototype.hasOwnProperty.call(link, 'id')
        ? link.id || uid()
        : uid();
    this.state =
      link && Object.prototype.hasOwnProperty.call(link, 'state')
        ? link.state || false
        : false;
    this.fromPin = link.fromPin;
    this.toPin = link.toPin;
  }

  public toggleState() {
    this.state = !this.state;
  }
}
