import React, { useRef, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import { DismissKeyboardView } from './DissmissKeybordView';
import { styles } from './styles';
import { AppText } from '../AppText';
import { TextVariant } from '../../config/textVariants';
import { ButtonIcon } from '../ButtonIcon';
import { CloseIcon } from '../icons/CloseIcon';

export type ModalBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  height?: number | string;
  headerStyle?: StyleProp<ViewStyle>;
  swiperStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  modalContentStyle?: StyleProp<ViewStyle>;
  isSwiper?: boolean;
  modalPanel?: boolean;
} & ViewProps;

export const StyledModal: React.FC<ViewProps> = (props) => {
  return (
    <View
      style={{ ...styles.modalScreen, ...(props.style as object) }}
      {...props}
    >
      {props.children}
    </View>
  );
};

export const ModalBottomSheet: React.FC<ModalBottomSheetProps> = (props) => {
  const {
    isSwiper = true,
    modalPanel = false,
    height = 600,
    visible,
    onClose,
    headerStyle,
    swiperStyle,
    bodyStyle,
    modalContentStyle,
    style,
    children,
  } = props;

  const [scrollOffset] = useState<any>(null);
  const scrollViewRef = useRef<any>(null);

  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
      propagateSwipe={true}
      avoidKeyboard={true}
      style={[styles.modal, style]}
    >
      <StyledModal
        style={[styles.scrollableModal, modalContentStyle, { height }]}
      >
        <View style={[styles.header, headerStyle]}>
          {isSwiper && (
            <View style={[styles.swiper, swiperStyle]}>
              <AppText variant={TextVariant.H1} text={'Filters'} />
              <ButtonIcon icon={<CloseIcon />} onPress={onClose} />
            </View>
          )}
        </View>
        <DismissKeyboardView>
          <View style={[styles.modalBody, bodyStyle]}>{children}</View>
        </DismissKeyboardView>
      </StyledModal>
    </Modal>
  );
};
