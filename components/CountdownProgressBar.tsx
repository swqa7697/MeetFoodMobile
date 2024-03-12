import { FC, useEffect, useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { colors } from '../util/constants';

interface CountdownProgressBarProps {
  duration: number;
}

export const CountdownProgressBar: FC<CountdownProgressBarProps> = ({
  duration,
}) => {
  const { width } = useWindowDimensions();
  const animatedWidth = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth]);

  return (
    <Animated.View
      style={{
        alignSelf: 'flex-start',
        width: animatedWidth,
        borderTopWidth: 2,
        borderTopColor: colors.defaultTheme,
      }}
    />
  );
};
