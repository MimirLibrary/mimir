import React from 'react';
import {AppText} from '../../../components/AppText';
import {TextVariant} from '../../../config/textVariants';
import {StyleSheet, View} from 'react-native';
import {Avatar} from '../../../components/Avatar';
import {Fonts} from '../../../assets/fonts';

const DUMMY_DATA =
  'https://avatars.mds.yandex.net/i?id=69223b715b8bde25b0473fef8d40cb6c-5488638-images-thumbs&n=13&exp=1';

export const UserCard = () => {
  return (
    <View style={styles.userCardContainer}>
      <AppText
        variant={TextVariant.H1}
        text={'MIMIR'}
        fontFamily={Fonts.MontserratSemiBold}
      />
      <View style={styles.avatarContainer}>
        <Avatar avatar={DUMMY_DATA} containerStyle={styles.avatar} />
        <AppText
          variant={TextVariant.H2}
          text={'Ivan Ivanov'}
          fontFamily={Fonts.MontserratSemiBold}
        />
      </View>
      <AppText
        variant={TextVariant.CAPTION_R}
        text={'Ux/Ui Designer'}
        fontFamily={Fonts.MontserratSemiBold}
      />
      <AppText
        variant={TextVariant.CAPTION_R}
        text={'Lodz, Piotrkowska 155'}
        style={styles.description}
        fontFamily={Fonts.MontserratSemiBold}
      />
      <AppText
        variant={TextVariant.CAPTION_R}
        text={'ivan.ivanov@itechart-group.com'}
        style={styles.description}
        fontFamily={Fonts.MontserratSemiBold}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userCardContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 56,
  },
  avatarContainer: {flexDirection: 'row', marginTop: 32, marginBottom: 16},
  avatar: {width: 80, height: 80, marginRight: 16},
  description: {
    marginTop: 8,
  },
});
