import { BuiltinChip } from './BuiltinChip';
import { BaseChip } from './Chip';

export class NotChip extends BuiltinChip {
  constructor(chip?: BaseChip) {
    super(chip);
  }

  public process(): void {
    if (this.outputs[0].connectedLink && this.inputs[0].connectedLink) {
      this.outputs[0].connectedLink.state =
        !this.inputs[0].connectedLink?.state;
    }
  }
}
