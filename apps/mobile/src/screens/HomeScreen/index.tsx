import React, {FC} from 'react';
import {Header} from '../../components/Header';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppText} from '../../components/AppText';
import {TextVariant} from '../../config/textVariants';
import {Fonts} from '../../assets/fonts';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button} from '../../components/Button';
import {HomeIcon} from '../../components/icons/HomeIcon';
import {Color} from '../../config/designTokens';
import {QRCodeIcon} from '../../components/icons/QRCodeIcon';
import {BookCard} from '../../components/BookCard';

interface HomeScreenProps {
  navigation: DrawerNavigationHelpers;
}

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 24}}>
      <Header navigation={navigation} style={styles.screenPadding} />
      <FlatList
        style={styles.screenPadding}
        ListHeaderComponent={
          <View style={{marginBottom: 16}}>
            <AppText
              variant={TextVariant.H1}
              text={'Did you find something interesting to claim?'}
              fontFamily={Fonts.MontserratSemiBold}
              style={{marginTop: 36}}
            />
            <AppText
              variant={TextVariant.BODY_L}
              text={'Fill in the required* fields or try to scan the code'}
              fontFamily={Fonts.MontserratLight}
              style={{marginTop: 16}}
            />
            <Button
              onPress={() => {}}
              text={'Scan a code'}
              icon={<QRCodeIcon color={Color.WHITE} />}
              style={{marginTop: 16}}
            />
            <AppText
              variant={TextVariant.H1}
              text={"Don't forget to pass"}
              fontFamily={Fonts.MontserratSemiBold}
              style={{marginTop: 48}}
            />
            <AppText
              variant={TextVariant.BODY_L}
              text={'List of items you have taken and due dates'}
              fontFamily={Fonts.MontserratLight}
              style={{marginTop: 16}}
            />
          </View>
        }
        data={[, , , ,]}
        renderItem={() => <BookCard />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 16,
  },
});
