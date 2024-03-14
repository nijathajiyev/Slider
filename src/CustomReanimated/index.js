import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolation,
  withSpring,
} from 'react-native-reanimated';
import Page from './components/Page';
import BottomSheet, {
  useScrollHandler,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import Test from './components/Test';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const Words = ['what`s', 'up', 'mobile', 'devs'];

const {height, width} = Dimensions.get('window');
const CustomReanimatedInterpolate = () => {
  const animatedPosition = useSharedValue(0);

  const [active, setActive] = useState(0);

  const animatedIndex = useRef(() => new Animated.Value(0)).current;

  const bottomSheetRef = useRef(null);

  // const scrollHandler = useAnimatedScrollHandler(event => {
  //   translateY.value = event.contentOffset.y;
  //   // console.log(event.contentOffset.y);
  //   console.log(event);
  // });

  const snapPoints = useMemo(event => {
    return ['40%', '90%'];
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setActive(index);
  }, []);

  // useDerivedValue(() => {
  //   console.log({hahah: animatedPosition.value});
  //   // setActiveVal(animatedPosition.value);
  // }, [animatedPosition]);
  const showText1 = useSharedValue(true);

  const inputRange = [(0 - 1) * height, 0 * height, (0 + 1) * height];

  const text1Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedPosition.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      animatedPosition.value,
      inputRange,
      [-1, 1, -1],
    );
    return {
      opacity: showText1.value ? opacity : 0,
      transform: [{translateY}],
    };
  });

  const text2Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedPosition.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      animatedPosition.value,
      inputRange,
      [-1, 1, -1],
    );
    return {
      opacity: showText1.value ? 0 : opacity,
      transform: [{translateY}],
    };
  });
  const onGestureEvent = event => {
    animatedPosition.value = event.nativeEvent.translationY;
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
      animatedPosition.value = withSpring(0);
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animatedPosition={animatedPosition}>
        <View style={{flex: 1}}>
          <Text>Nicat Seni hec kim sevmir</Text>
        </View>
        {/* <PanGestureHandler>
        </PanGestureHandler> */}
        <Animated.View>
          <Animated.View style={[styles.textContainer, text1Style]}>
            <Text style={styles.text}>Text 1</Text>
          </Animated.View>
          <Animated.View style={[styles.textContainer2, text2Style]}>
            <Text style={styles.text}>Text 2</Text>
          </Animated.View>
        </Animated.View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  // },
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: 'blue',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer2: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 700,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default CustomReanimatedInterpolate;
