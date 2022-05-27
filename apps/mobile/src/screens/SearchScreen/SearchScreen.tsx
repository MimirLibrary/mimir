import React, { FC } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { FlatList, StyleSheet, View } from 'react-native';
import { BookCard } from '../../components/BookCard';

interface SearchScreenProps {
  navigation: DrawerNavigationHelpers;
}

export const SearchScreen: FC<SearchScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
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
