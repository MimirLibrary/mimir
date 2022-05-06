import {ViewStyle} from 'react-native';

export enum Color {
  ACCENT_BLACK_100 = '#333333',
  ACCENT_BLUE_100 = '#1A1ED6',
  ACCENT_BLUE_50 = '#F6FBFF',
  ACCENT_GRAY_100 = '#828282',
  ACCENT_GRAY_50 = '#BDBDBD',
  ACCENT_GRAY_25 = '#E0E0E0',
  ACCENT_ORANGE_100 = '#FF910F',
  ACCENT_GREEN_100 = '#2AA816',
  WHITE = '#FFFFFF',
  BACKGROUND = '#F3F7FF',
  TERRITARY = '#F9FAFF',
  TEXT_ERROR = '#FF372A',
}

export enum ShadowVariant {
  SHADOW_M = 'shadowM',
  SHADOW_L = 'shadowL',
  SHADOW_XL = 'shadowXL',
}

export const shadowVariants: {[key in ShadowVariant]: ViewStyle} = {
  [ShadowVariant.SHADOW_M]: {
    shadowColor: Color.ACCENT_BLACK_100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  },
  [ShadowVariant.SHADOW_L]: {
    shadowColor: Color.ACCENT_BLACK_100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.6,
    elevation: 4,
  },
  [ShadowVariant.SHADOW_XL]: {
    shadowColor: Color.ACCENT_BLACK_100,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
};
