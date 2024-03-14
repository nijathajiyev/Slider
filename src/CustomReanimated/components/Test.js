import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
const TEXT_HEIGHT = 50;

const App = () => {
  const translationY = useSharedValue(0);
  const showText1 = useSharedValue(true);

  const inputRange = [(0 - 1) * height, 0 * height, (0 + 1) * height];

  const text1Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationY.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(translationY.value, inputRange, [-1, 1, -1]);
    return {
      opacity: showText1.value ? opacity : 0,
      transform: [{translateY}],
    };
  });

  const text2Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationY.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(translationY.value, inputRange, [-1, 1, -1]);
    return {
      opacity: showText1.value ? 0 : opacity,
      transform: [{translateY}],
    };
  });

  const onGestureEvent = event => {
    translationY.value = event.nativeEvent.translationY;
  };

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.END) {
      // Determine whether to show text 1 or text 2 based on the direction of the gesture
      if (nativeEvent.translationY < 0) {
        showText1.value = true; // Show text 1
      } else {
        showText1.value = false; // Show text 2
      }
      // Reset translationY to 0
      translationY.value = withSpring(0);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View>
          <Animated.View style={[styles.textContainer, text1Style]}>
            <Text style={styles.text}>Text 1</Text>
          </Animated.View>
          <Animated.View style={[styles.textContainer2, text2Style]}>
            <Text style={styles.text}>Text 2</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  textContainer: {
    // position: 'absolute',
    // top: '50%',
    // left: 0,
    // right: 0,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer2: {
    // position: 'absolute',
    // top: '50%',
    // left: 0,
    // right: 0,
    height: 700,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default App;
