import { BuiltinChip } from './BuiltinChip';
import { BaseChip } from './Chip';

export class CustomChip extends BuiltinChip {
  constructor(chip?: BaseChip) {
    super(chip);
  }

  public process(): void {
    // TODO implement method
    return;
  }
}
