import React, {useCallback, useMemo} from 'react';
import {Animated, Dimensions, TouchableOpacity, View} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {Header} from '../components/Header';
import {SearchScreen} from '../screens/SearchScreen/SearchScreen';
import {Color} from '../config/designTokens';
import {textVariants} from '../config/textVariants';
import {MaterialTopTabDescriptor} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

const WIDTH = Dimensions.get('screen').width;

type RouteTabProps = {
  route: any;
  index: number;
  options: MaterialTopTabDescriptor;
};

const RouteTab = ({
  state,
  navigation,
  position,
  route,
  index,
}: RouteTabProps) => {
  const label = useMemo(() => route.name, [route.name]);

  const isFocused = useMemo(() => state.index === index, [index, state.index]);

  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate<any>({name: route.name, merge: true});
    }
  }, [isFocused, navigation, route.key, route.name]);

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  const inputRange = state.routes.map((_, i) => i);
  const opacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map(i => (i === index ? 1 : 0.4)),
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{flex: 1, height: 33}}>
      <Animated.Text
        style={{
          opacity,
          textAlign: 'center',
          // color,
          ...textVariants.bodyL,
        }}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export const MyTabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  // console.log(state.routes);
  console.log(position);
  // const move = useAnimatedStyle(() => {
  //   const marginLeft = interpolate(position, [-100, 0], [2, 1]);
  //   return {
  //     marginLeft: 0,
  //   };
  // }, [position]);

  const inputRange = state.routes.map((_, i) => i);
  const margin = position.interpolate({
    inputRange,
    outputRange: inputRange.map(i => (i * WIDTH) / state.routes.length),
  });

  return (
    <View style={{height: 36, marginTop: 32}}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => (
          <RouteTab
            key={index.toString()}
            route={route}
            state={state}
            index={index}
            position={position}
            navigation={navigation}
            options={descriptors[route.key]}
            descriptors={descriptors}
          />
        ))}
      </View>
      <View
        style={{
          height: 3,
          backgroundColor: Color.ACCENT_GRAY_50,
          width: '100%',
        }}>
        <Animated.View
          style={[
            {
              width: WIDTH / 4,
              backgroundColor: Color.ACCENT_BLUE_100,
              height: '100%',
            },
            {transform: [{translateX: margin}]},
          ]}
        />
      </View>
    </View>
  );
};

// ...
const Tab = createMaterialTopTabNavigator();

export const SearchStack = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 50}}>
      <Header navigation={navigation} />
        <Tab.Navigator
          screenOptions={
            {
              // tabBarItemStyle: {backgroundColor: 'red'},
              // tabBarItemStyle: {borderColor: 'red', borderBottomWidth: 2},
              // tabBarIndicatorStyle: {backgroundColor: 'gray'},
            }
          }
          tabBar={MyTabBar}>
          <Tab.Screen name="Home" component={SearchScreen} />
          <Tab.Screen name="Settings" component={SearchScreen} />
          <Tab.Screen name="Settings2" component={SearchScreen} />
          <Tab.Screen name="Settings3" component={SearchScreen} />
        </Tab.Navigator>
    </SafeAreaView>
  );
};
