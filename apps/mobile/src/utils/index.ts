import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const scaleWidth = (size: number) => (width * size) / 376;
