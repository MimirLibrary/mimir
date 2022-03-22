import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const NO_BARCODE_STRING = 'There is no barcode detected';

export const Start = (props) => {
  const barCode = props.route?.params?.barCode;
  const [barCodeString, setBarCodeString] = useState(null);

  const handleRouteChange = () => {
    props.navigation.navigate('Camera');
  };

  useEffect(() => {
    setBarCodeString(barCode);
  }, [barCode]);

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Start screen</Text>
      <View style={styles.button}>
        <Pressable onPress={handleRouteChange}>
          <Text style={styles.text}>Camera</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.text}>
          {!barCodeString
            ? NO_BARCODE_STRING
            : `The result barcode is ${barCodeString}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  button: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#86e97e',
  },
});
