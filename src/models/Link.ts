import { uid } from 'quasar';

export interface BaseLink {
  id?: string;
  state?: boolean;
}

export class Link {
  public id: string;
  public state: boolean;

  constructor(link?: BaseLink) {
    this.id =
      link && Object.prototype.hasOwnProperty.call(link, 'id')
        ? link.id || uid()
        : uid();
    this.state =
      link && Object.prototype.hasOwnProperty.call(link, 'state')
        ? link.state || false
        : false;
  }

  public toggleState() {
    this.state = !this.state;
  }
}
