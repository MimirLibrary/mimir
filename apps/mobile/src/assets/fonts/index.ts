import {Platform} from "react-native";

enum FontsAndroid {
  MontserratBold = 'montserrat_bold',
  MontserratSemiBold = 'montserrat_semi_bold',
  MontserratLight = 'montserrat_light',
  MontserratMedium = 'montserrat_medium',
  MontserratRegular = 'montserrat_regular',
}

 enum FontsIos {
  MontserratBold = 'Montserrat-Bold',
MontserratSemiBold = 'Montserrat-SemiBold',
MontserratLight = 'Montserrat-Light',
MontserratMedium = 'Montserrat-Medium',
MontserratRegular = 'Montserrat-Regular',
}

export const  Fonts = Platform.OS === "ios"? FontsIos:FontsAndroid
