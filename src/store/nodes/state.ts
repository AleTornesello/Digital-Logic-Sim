import { Chip } from 'src/models/Chip';

export default class ChipsState {
  public nodes: Chip[] = [
    new Chip({
      name: 'NOT',
      function: (inputs: boolean[]): boolean[] => {
        return [!inputs[0]];
      },
    }),
    new Chip({
      inputs: new Array(2).fill(false),
      name: 'AND',
      function: (inputs: boolean[]): boolean[] => {
        return [inputs[0] && inputs[1]];
      },
    }),
  ];
  public visualizedChipId: string | null = null;
}
