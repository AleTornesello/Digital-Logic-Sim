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
      this.outputs[0].connectedLink &&
      this.inputs[0].connectedLink &&
      this.inputs[1].connectedLink
    ) {
      this.outputs[0].connectedLink.state =
        this.inputs[0].connectedLink?.state &&
        this.inputs[1].connectedLink?.state;
    }
  }
}
