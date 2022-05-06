import {TextStyle} from 'react-native';
import {Fonts} from '../assets/fonts';

export enum TextVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  BODY_L = 'bodyL',
  BODY_M = 'bodyM',
  CAPTION_M = 'captionM',
  CAPTION_R = 'captionR',
}

export const textVariants: {[key in TextVariant]: TextStyle} = {
  [TextVariant.H1]: {
    fontWeight: '600',
    fontSize: 27.34,
    lineHeight: 32.81,
    fontFamily: Fonts.MontserratRegular,
  },
  [TextVariant.H2]: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24.38,
    fontFamily: Fonts.MontserratRegular,
  },
  [TextVariant.H3]: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.5,
    fontFamily: Fonts.MontserratRegular,
  },
  [TextVariant.BODY_L]: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19.5,
    fontFamily: Fonts.MontserratRegular,
  },
  [TextVariant.BODY_M]: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.5,
    fontFamily: Fonts.MontserratRegular,
  },
  [TextVariant.CAPTION_M]: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: Fonts.MontserratMedium,
  },
  [TextVariant.CAPTION_R]: {
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: Fonts.MontserratRegular,
  },
};
