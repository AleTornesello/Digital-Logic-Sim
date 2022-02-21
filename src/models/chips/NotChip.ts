import { BuiltinChip } from './BuiltinChip';
import { BaseChip } from './Chip';

export class NotChip extends BuiltinChip {
  constructor(chip?: BaseChip) {
    super(chip);
  }

  public process(): void {
    if (
      this.outputs[0].connectedLinks.length > 0 &&
      this.inputs[0].connectedLinks.length > 0
    ) {
      this.outputs[0].connectedLinks.forEach((link) => {
        link.state = !this.inputs[0].connectedLinks[0].state;
      });
    }
  }
}
