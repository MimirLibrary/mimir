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

interface SearchScreenProps {
  navigation: DrawerNavigationHelpers;
}

export const SearchScreen: FC<SearchScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingTop: 24}}>
      {/*<Header navigation={navigation} style={styles.screenPadding} />*/}
      <FlatList
        style={styles.screenPadding}
        data={[, , , ,]}
        renderItem={() => <BookCard />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 16,
  },
});
