import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Header} from '../../components/Header';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {Color} from '../../config/designTokens';
import {BookCard} from '../../components/BookCard';
import {FabButton} from "../../components/FabButton";
import {ListHeaderComponent} from "./_blocks";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import {FlatList} from "react-native-gesture-handler";

interface HomeScreenProps {
  navigation: DrawerNavigationHelpers;
}

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);


export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [data] = useState(new Array(10))
  const [refresh, setRefresh] = useState(false)

  const translationY = useSharedValue(0);
  const flatListRef = useRef(null);
  const fabButtonStyle = useAnimatedStyle(() => {
    return {
      display: translationY.value > 600 ? 'flex' : 'none'
    }
  }, [])

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const fabButtonHandler = useCallback(() => {
    flatListRef.current.scrollToIndex({animated: true, index: 0})
  }, [flatListRef.current])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header navigation={navigation}/>
        <ReanimatedFlatList
          ref={flatListRef}
          initialScrollIndex={0}
          style={styles.contentBackground}
          ListHeaderComponent={<ListHeaderComponent/>}
          data={data}
          onScroll={scrollHandler}
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(!refresh)
          }}
          renderItem={({item}) => <BookCard style={styles.itemMargin}/>}
        />
        <FabButton onPress={fabButtonHandler} style={fabButtonStyle}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Color.WHITE
  },
  contentBackground: {
    backgroundColor: Color.BACKGROUND
  },
  content: {
    flex: 1
  },
  itemMargin: {
    marginHorizontal: 16,
  }
});
