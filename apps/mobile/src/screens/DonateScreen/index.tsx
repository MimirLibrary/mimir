import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { AppText } from '../../components/AppText';
import { TextVariant } from '../../config/textVariants';
import { Fonts } from '../../assets/fonts';
import { StyleSheet, View } from 'react-native';
import { FormTextInput } from '../../components/forms/FormTextInput';
import React, { FC } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { HomeIcon } from '../../components/icons/HomeIcon';
import { Color } from '../../config/designTokens';
import { Button, ButtonVariant } from '../../components/Button';
import { QRCodeIcon } from '../../components/icons/QRCodeIcon';

interface DonateScreenProps {
  navigation: DrawerNavigationHelpers;
}

export const DonateScreen: FC<DonateScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 24, paddingHorizontal: 16 }}>
      <Header navigation={navigation} />
      <AppText
        variant={TextVariant.H1}
        text={'Are you planning to donate something to the library?'}
        fontFamily={Fonts.MontserratSemiBold}
        style={{ marginTop: 36 }}
      />
      <AppText
        variant={TextVariant.BODY_L}
        text={'Fill in the required* fields or try to scan the code'}
        fontFamily={Fonts.MontserratLight}
        style={{ marginTop: 16 }}
      />
      <View style={{ marginTop: 16 }}>
        <FormTextInput
          onChangeText={() => {}}
          onBlur={() => {}}
          value={''}
          placeholder={'Name of the item*'}
        />
        <FormTextInput
          onChangeText={() => {}}
          onBlur={() => {}}
          value={''}
          containerStyle={styles.inputContainer}
          placeholder={'Genre*'}
        />
        <FormTextInput
          onChangeText={() => {}}
          onBlur={() => {}}
          value={''}
          containerStyle={styles.inputContainer}
          placeholder={'Author'}
        />
        <FormTextInput
          onChangeText={() => {}}
          onBlur={() => {}}
          containerStyle={styles.inputContainer}
          value={''}
          placeholder={'Description (Not necessary)'}
        />
        <Button onPress={() => {}} text={'Donate'} style={{ marginTop: 16 }} />
        <Button
          onPress={() => {}}
          text={'Scan a code'}
          icon={<QRCodeIcon color={Color.WHITE} />}
          style={{ marginTop: 8 }}
        />
        <Button
          onPress={() => {}}
          text={'Ask manager'}
          variant={ButtonVariant.GRAY_INVERTED}
          style={{ marginTop: 8 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
  },
});
