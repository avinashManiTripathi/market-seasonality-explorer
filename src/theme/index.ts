



import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false, // Set to true if you want to auto-detect
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      500: '#379df0',
    },
    volatility: {
      low: '#C6F6D5',
      medium: '#FEEBC8',
      high: '#FED7D7',
    },
  },
});

export default theme;
