const colors = {
  PINK_200: '#FAE2E9',
  PINK_400: '#EC87A5',
  PINK_700: '#C63B64',
  PINK_500: '#BF5C79',
  WHITE: '#fff',
  GRAY_100: '#E6E6E6',
  GRAY_200: '#E7E7E7',
  GRAY_500: '#8E8E8E',
  GRAY_700: '#575757',
  GRAY_300: '#D8D8D8',
  BLACK: '#000',
  RED_300: '#FFB4B4',
  RED_500: '#FF5F5F',
  GREEN_400: '#CCE6BA',
  YELLOW_400: '#FFE594',
  PURPLE_400: '#C4C4E7',
  BLUE_400: '#42A5F5',
  BLUE_500: '#0D8AFF',
  YELLOW_500: '#FACC15',
};

const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
} as const;

export {colors, colorHex};
