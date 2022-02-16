import { colors } from 'src/data/colors';

export class ColorUtils {
  static getRandomColor(): string {
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
