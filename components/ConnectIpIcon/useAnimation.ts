import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { IconButton } from "native-base";

const useAnimation = (hasConnected: boolean) => {
  const scale = useSharedValue(1);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (hasConnected) {
      cancelAnimation(scale);
      scale.value = 1.0;
    } else {
      scale.value = withRepeat(
        withTiming(scale.value * 1.3, { duration: 1000 }),
        -1,
        true
      );
    }
  }, [hasConnected]);

  const AnimatedIcon = Animated.createAnimatedComponent(IconButton);

  return { scaleStyles, AnimatedIcon };
};

export default useAnimation;
