import React from "react";
import {AppText} from "../../../components/AppText";
import {TextVariant} from "../../../config/textVariants";
import {Button} from "../../../components/Button";
import {QRCodeIcon} from "../../../components/icons/QRCodeIcon";
import {Color} from "../../../config/designTokens";
import {StyleSheet, View} from "react-native";
import {ArrowIcon} from "../../../components/icons/ArrowIcon";

export const ListHeaderComponent = () => {
  return(
    <View style={[{marginBottom: 16},styles.screenPadding]}>
      <AppText
        variant={TextVariant.H1}
        text={'Did you find something interesting to claim?'}
        style={{marginTop: 36}}
      />
      <AppText
        variant={TextVariant.BODY_L}
        text={'Find the code on the item and use your camera to scan it'}
        style={{marginTop: 16}}
      />
      <Button
        onPress={() => {}}
        text={'Scan a code'}
        icon={<QRCodeIcon color={Color.WHITE} />}
        style={{marginTop: 16}}
      />
      <View style={styles.iconWrapper}><ArrowIcon /></View>
      <AppText
        variant={TextVariant.H1}
        text={"Don't forget to pass"}
        style={{marginTop: 20}}
      />
      <AppText
        variant={TextVariant.BODY_L}
        text={'List of items you have taken and due dates'}
        style={{marginTop: 16}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 16,
  },
  itemMargin: {
    marginHorizontal: 16,
  },
  iconWrapper:{alignSelf:'flex-end', right:26}
});
