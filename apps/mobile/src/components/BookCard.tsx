import React, { FC } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { AppText } from './AppText';
import { TextVariant } from '../config/textVariants';
import { Color, shadowVariants } from '../config/designTokens';

const DummyImage = require('../assets/unsplash_aZ_MmSmAcjg.png');

enum BookStatus {
  OVERDUE,
  ReturnTill,
}

interface IBookCard {
  style: StyleProp<ViewStyle>;
}

export const BookCard: FC<IBookCard> = ({ style }) => {
  const bookStatus = BookStatus.OVERDUE;

  const renderStatus = () => {
    const overdue = BookStatus.OVERDUE === bookStatus;

    return (
      <View
        style={[
          styles.bookStatusContainer,
          overdue && styles.overdueBookContainer,
        ]}
      >
        <AppText
          variant={TextVariant.CAPTION_M}
          color={overdue ? Color.TEXT_ERROR : Color.ACCENT_BLUE_100}
          text={overdue ? 'Overdue' : 'Return till: 26.04.2022'}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} resizeMode={'stretch'} source={DummyImage} />
      <View style={styles.infoContainer}>
        <View style={styles.textWrapper}>
          <AppText variant={TextVariant.CAPTION_R} text={'Psychology'} />
          <AppText
            variant={TextVariant.BODY_M}
            style={styles.title}
            text={'The Psychology of Money Second part. New version'}
          />
          <AppText
            variant={TextVariant.BODY_L}
            style={styles.description}
            text={'Morgan Housel'}
          />
        </View>
        {renderStatus()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: Color.WHITE,
    ...shadowVariants.shadowXL,
  },
  image: { width: 80, height: 130 },
  textWrapper: { width: '85%' },
  infoContainer: { marginLeft: 16, justifyContent: 'space-between' },
  description: { marginTop: 10 },
  title: { marginTop: 8 },
  bookStatusContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 10,
    flexGrow: 0,
    borderColor: Color.ACCENT_BLUE_100,
  },
  overdueBookContainer: {
    borderColor: Color.ACCENT_ORANGE_100,
  },
});
