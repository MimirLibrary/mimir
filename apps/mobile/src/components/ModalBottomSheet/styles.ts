import { StyleSheet, ViewStyle } from 'react-native';
import {Color} from "../../config/designTokens";

const BORDER_RADIUS = 30;

type modalStyles = {
  container: ViewStyle;
  modal: ViewStyle;
  modalScreen:ViewStyle;
  scrollableModal: ViewStyle;
  header: ViewStyle;
  swiper: ViewStyle;
  modalBody: ViewStyle;
};

export const styles = StyleSheet.create<modalStyles>({
  container: {
    flex: 1,
  },
  modalScreen: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: Color.WHITE,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 600,
  },
  header: {
    // height: 30,
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: BORDER_RADIUS,
    borderTopEndRadius: BORDER_RADIUS,
  },
  swiper: {
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:38,
    paddingLeft:132,
    paddingRight:16
  },
  modalBody: {
    flex: 1,
    backgroundColor: Color.ACCENT_GRAY_50,
  },
});
