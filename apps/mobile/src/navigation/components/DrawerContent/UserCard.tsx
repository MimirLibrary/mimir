import React from 'react';
import { AppText } from '../../../components/AppText';
import { TextVariant } from '../../../config/textVariants';
import { StyleSheet, View } from 'react-native';
import { Avatar } from '../../../components/Avatar';
import { Fonts } from '../../../assets/fonts';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { CloseIcon } from '../../../components/icons/CloseIcon';

const DUMMY_DATA =
  'https://avatars.mds.yandex.net/i?id=69223b715b8bde25b0473fef8d40cb6c-5488638-images-thumbs&n=13&exp=1';

export const UserCard = () => {
  return (
    <View style={styles.userCardContainer}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AppText variant={TextVariant.H1} text={'MIMIR'} />
        <ButtonIcon icon={<CloseIcon />} onPress={() => {}} />
      </View>
      <View style={styles.avatarContainer}>
        <Avatar avatar={DUMMY_DATA} containerStyle={styles.avatar} />
        <AppText
          variant={TextVariant.H2}
          text={'Ivan Ivanov'}
          style={styles.text}
        />
      </View>
      <AppText
        variant={TextVariant.CAPTION_R}
        text={`ivan.ivanov@itechart\n-group.com`}
        style={[styles.description, styles.text]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userCardContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 56,
    alignItems: 'center',
  },
  avatarContainer: { marginTop: 38, alignItems: 'center' },
  text: { textAlign: 'center' },
  avatar: { width: 80, height: 80, marginBottom: 16 },
  description: {
    marginTop: 8,
  },
});
