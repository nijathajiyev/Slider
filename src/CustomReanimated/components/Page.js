import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const Page = ({index, title, translateX}) => {
  console.log(index, 'index');
  const inputRange = [1, 1, 1];

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [1, 1, 1],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(translateX.value, inputRange, [1, 0, 1]);

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <SafeAreaView>
      <Animated.View style={[styles.pageContainer, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default Page;
