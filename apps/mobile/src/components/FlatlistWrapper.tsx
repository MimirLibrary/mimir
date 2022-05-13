import React, {useRef} from 'react'
import {Dimensions, FlatList} from "react-native";

export const HorizontalSlider = ({
                                   data,
                                   renderItem,
                                   onViewableItemChange,
                                 }) => {
  const onViewableItemsChanged = info => {
    if (info?.viewableItems[0]?.item && onViewableItemChange) {
      onViewableItemChange(info.viewableItems[0].item);
    }
  };

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      snapToAlignment="center"
      decelerationRate="fast"
      snapToInterval={Dimensions.get('window').width}
      showsHorizontalScrollIndicator={false}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );
};
