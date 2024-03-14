import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';

const Words = ['what`s', 'up', 'mobile', 'devs'];

const ReanimatedCustomInterpolate = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
    console.log(event.contentOffset.x);
  });
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      style={styles.container}>
      {Words.map((title, index) => {
        return (
          <Page
            title={title}
            index={index}
            key={index.toString()}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ReanimatedCustomInterpolate;
