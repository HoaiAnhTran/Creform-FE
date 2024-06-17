import { createTheme } from '@mantine/core';

import { AVATAR_COLOR_CODES } from '@/constants';

export const customTheme = createTheme({
  colors: {
    'ocean-green': [
      '#f0f9f4',
      '#dbf0e4',
      '#bae0cb',
      '#8dc8ad',
      '#5cab88',
      '#419d78',
      '#2a7156',
      '#215b46',
      '#1d4839',
      '#183c2f',
      '#0d211b',
    ],
    'burnt-sienna': [
      '#fcf5f0',
      '#f9e7db',
      '#f2ccb6',
      '#e9aa88',
      '#de774e',
      '#d95e36',
      '#ca482c',
      '#a83626',
      '#872e25',
      '#6d2721',
      '#3a1210',
    ],
    'quarter-pearl-lusta': [
      '#fffcf4',
      '#fff4d5',
      '#fee5aa',
      '#fdd274',
      '#fbb33c',
      '#f99a16',
      '#ea7e0c',
      '#c2600c',
      '#9a4b12',
      '#7c3f12',
      '#431e07',
    ],
  },
});

export const generateAvatarBgColor = () =>
  AVATAR_COLOR_CODES[Math.floor(Math.random() * 15)];
