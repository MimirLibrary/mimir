import {Alert, Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import { Camera, CameraType } from 'react-native-camera-kit';
import Svg, {Polygon, Defs, G, Mask, Path, Pattern, Rect, Use, Circle} from "react-native-svg";
import {Color} from "../../config/designTokens";

const {width,height} = Dimensions.get('screen')
const MARGIN_TOP = 0.28*height

export const CameraScreen = (props) => {
  const cameraRef = useRef(null);

  const handleReadCode = (event) => {
    Alert.alert(event.nativeEvent.codeStringValue)
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
      <View style={{position:'absolute'}}>
        <Svg
          width={width}
          height={height}
          fill="none"
        >
          {/*<Defs>*/}
          {/*  <Mask id="cut-off-bottom" >*/}
          {/*    <Rect x="0" y="0" width="100" height="100" fill="white" />*/}

          {/*    <Rect width="100%" height="100%" fill={Color.ACCENT_BLACK_100} />*/}
          {/*   */}
          {/*  </Mask>*/}
          {/*</Defs>*/}

          <Rect width={height} height={height} opacity={0.8} mask="url(#cut-off-bottom)" fill={Color.ACCENT_BLACK_100}/>

        </Svg>
      </View>
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
