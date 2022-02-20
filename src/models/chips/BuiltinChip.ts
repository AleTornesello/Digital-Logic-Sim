import { BaseChip, Chip } from './Chip';

export abstract class BuiltinChip extends Chip {
  constructor(chip?: BaseChip) {
    super(chip);
  }

  public abstract process(): void;
}
