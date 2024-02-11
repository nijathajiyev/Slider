import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const SIZE = width * 0.7;

const Page = ({index, title, translateY}) => {
  // console.log(index, 'index');
  const inputRange = [
    (index - 1) * height,
    index * height,
    (index + 1) * height,
  ];

  // const rTextStyle = useAnimatedStyle(() => {
  //   const translateYy = interpolate(
  //     translateY.value,
  //     inputRange,
  //     [height / 2, 0, -height / 2],
  //     Extrapolation.CLAMP,
  //   );

  //   const opacity = interpolate(translateY.value, inputRange, [-2, 1, -2]);

  //   return {
  //     opacity,
  //     transform: [
  //       {
  //         translateY: translateYy,
  //       },
  //     ],
  //   };
  // });

  return (
    <View
      style={[
        // styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default Page;
