import { Chip } from 'src/models/chips/Chip';

export default class ChipsState {
  public nodes: Chip[] = [
    new Chip({
      name: 'NOT',
    }),
    new Chip({
      name: 'AND',
    }),
  ];
  public visualizedChipId: string | null = null;
}
