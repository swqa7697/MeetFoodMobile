import { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface LoadingIndicatorProps {
  duration: number;
  spinnerSize: number;
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  duration,
  spinnerSize,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ).start();
  }, [spinValue]);

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Ionicons name="reload-circle" size={spinnerSize} />
    </Animated.View>
  );
};
