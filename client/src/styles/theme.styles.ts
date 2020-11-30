import { DefaultTheme } from 'styled-components';

const fontSizes = [12, 14, 16, 18, 24, 34, 58, 72];

const colors = {
  primary: {
    light: '#5999f1',
    main: '#2f80ed',
    dark: '#2666be',
  },
  secondary: {
    light: '#252329',
    main: '#120F13',
    dark: '#0B090C',
  },
  danger: {
    light: '#ee8277',
    main: '#e95e50',
    dark: '#d04436',
  },
  success: {
    light: '#6ddb9c',
    main: '#43d17f',
    dark: '#29b866',
  },
  info: {
    light: '#7fe6fc',
    main: '#5adffb',
    dark: '#41c5e2',
  },
  warining: {
    light: '#e0874d',
    main: '#d7651a',
    dark: '#be4c00',
  },
  text: {
    main: '#E0E0E0',
    secondary: '##828282',
  },
  textInverse: {
    main: '#1b1f26',
    secondary: '#272c36',
  },
  bg: '#252329',
  bgInverse: '#FAFAFE',
  borderColor: 'rgba(191,196,209,.5)',
  borderFocus: 'rgba(39,44,54,.8)',
};

const lineHeight = 1.5;
const fontFamily = "'Noto Sans', Helvetica, sans-serif";
const fontWeights = [400, 500, 700];

const Theme: DefaultTheme = {
  colors,
  lineHeight,
  fontFamily,
  fontSizes,
  fontWeights,
  fontSizeBase: fontSizes[1],
  borderRadius: '12px',
};

export default Theme;
