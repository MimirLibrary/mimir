import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { Camera, CameraType } from 'react-native-camera-kit';
import { Color } from '../../config/designTokens';
import {
  Canvas,
  DiffRect,
  Group,
  rect,
  rrect,
  Image,
  useImage,
} from '@shopify/react-native-skia';
import { Blur } from '@shopify/react-native-skia/src/renderer/components/imageFilters/Blur';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');
const SIZE = width - 50;
const PADDING = height / 4;

const path = 'M2 44.982V22.001C2 10.955 10.954 2 22 2h23.197';
const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(rect(25, PADDING, SIZE, SIZE), 20, 20);
const img = require('../../assets/ISBN.png');
export const CameraScreen = (props) => {
  const navigation = useNavigation<any>();
  const cameraRef = useRef(null);
  const image = useImage(img);

  const handleReadCode = (event) => {
    Alert.alert(event.nativeEvent.codeStringValue);
    // Alert barCode: event.nativeEvent.codeStringValue,
  };

  return (
    <>
      <SafeAreaView style={styles.body}>
        <Camera
          style={styles.camera}
          ref={cameraRef}
          scanBarcode={true}
          cameraType={CameraType.Back}
          onReadCode={handleReadCode}
        />
      </SafeAreaView>
      <Canvas
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <Group color={Color.ACCENT_GRAY_100}>
          <DiffRect outer={outer} inner={inner} opacity={0.5}>
            <Blur blur={4} />
          </DiffRect>
          {image && (
            <Image
              image={image}
              fit="contain"
              x={25}
              y={PADDING}
              width={SIZE}
              height={SIZE}
            />
          )}

          {/*<Group transform={[{ translateY: width },{ translateX: width/3 }]}>*/}
          {/*  <Path path={path} color="#61DAFB"/>*/}

          {/*</Group>*/}
        </Group>
      </Canvas>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  camera: {
    height: '100%',
  },
});

// <Svg
//   width={width}
//   height={height}
//   fill="none"
// >
//   {/*<Defs>*/}
//   {/*  <Mask id="cut-off-bottom" >*/}
//   {/*    <Rect x="0" y="0" width="100" height="100" fill="white" />*/}
//
//   {/*    <Rect width="100%" height="100%" fill={Color.ACCENT_BLACK_100} />*/}
//   {/*   */}
//   {/*  </Mask>*/}
//   {/*</Defs>*/}
//
//   <Rect width={height} height={height} opacity={0.8} mask="url(#cut-off-bottom)" fill={Color.ACCENT_BLACK_100}/>
//
// </Svg>
