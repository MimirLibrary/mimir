import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';

export const CameraView = (props) => {
  const cameraRef = useRef(null);

  const handleReadCode = (event) => {
    props.navigation.navigate('Start', {
      barCode: event.nativeEvent.codeStringValue,
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        scanBarcode={true}
        cameraType={CameraType.Back}
        onReadCode={handleReadCode}
      />
    </SafeAreaView>
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
