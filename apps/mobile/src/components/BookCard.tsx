import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import {TextVariant} from '../config/textVariants';
import {Fonts} from '../assets/fonts';
import {CalendarIcon} from './icons/CalendarIcon';
import {Color} from '../config/designTokens';

const DummyImage = require('../assets/unsplash_aZ_MmSmAcjg.png');

export const BookCard = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={DummyImage} />
      <View style={styles.infoContainer}>
        <View style={styles.textWrapper}>
          <AppText
            variant={TextVariant.BODY_M}
            fontFamily={Fonts.MontserratSemiBold}
            text={'The Psychology of Money'}
          />
          <AppText
            variant={TextVariant.BODY_L}
            fontFamily={Fonts.MontserratSemiBold}
            style={styles.description}
            text={'Psychology / Morgan Housel'}
          />
        </View>
        <View style={styles.dateContainer}>
          <CalendarIcon color={Color.ACCENT_BLUE_100} />
          <AppText
            variant={TextVariant.CAPTION_M}
            style={styles.date}
            color={Color.ACCENT_BLUE_100}
            text={'Return by: 26.04.2022'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginBottom: 16},
  image: {width: 76.6, height: 105},
  textWrapper: {width: '95%'},
  infoContainer: {marginLeft: 16, justifyContent: 'space-between'},
  description: {marginTop: 10},
  dateContainer: {flexDirection: 'row', alignItems: 'center'},
  date: {marginLeft: 6},
});
