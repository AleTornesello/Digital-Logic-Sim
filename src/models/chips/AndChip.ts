import { Pin } from '../Pin';
import { BuiltinChip } from './BuiltinChip';
import { BaseChip } from './Chip';

export class AndChip extends BuiltinChip {
  constructor(chip?: BaseChip) {
    super(chip);

    super.inputs = [new Pin(), new Pin()];
  }

  public process(): void {
    if (
      this.outputs[0].connectedLinks.length > 0 &&
      this.inputs[0].connectedLinks.length > 0 &&
      this.inputs[1].connectedLinks.length > 0
    ) {
      this.outputs[0].connectedLinks.forEach((link) => {
        link.state =
          this.inputs[0].connectedLinks[0].state &&
          this.inputs[1].connectedLinks[0].state;
      });
    }
  }
}
