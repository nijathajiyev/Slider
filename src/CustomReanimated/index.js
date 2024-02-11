import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';
import BottomSheet, {useScrollHandler} from '@gorhom/bottom-sheet';

const Words = ['what`s', 'up', 'mobile', 'devs'];

const CustomReanimatedInterpolate = () => {
  const translateY = useSharedValue(0);

  const [active, setActive] = useState(0);
  // console.log(active, 'active');

  // const {scrollHandler} = useScrollHandler();
  // console.log(scrollHandler, 'scrollHandler');

  const bottomSheetRef = useRef(null);
  const animatedIndexRef = useRef(null);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
    // console.log(event.contentOffset.y);
    console.log(event);
  });
  console.log(animatedIndexRef);

  const testhandler = event => console.log(event);

  const snapPoints = useMemo(event => {
    return ['60%', '90%'];
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setActive(index);
  }, []);
  return (
    <View style={styles.container}>
      <BottomSheet
        index={0}
        animatedIndex={animatedIndexRef.current}
        // activeOffsetY={e => testhandler(e)}
        // activeOffsetY={test}
        // activeOffsetY={translateY.value}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          {/* {active == 0 && <Text>Awesome1 🎉</Text>} */}
          {active == 0 && (
            <Page
              title={'Awesome1 🎉'}
              index={active}
              key={active.toString()}
              translateX={translateY}
            />
          )}
          {active == 1 && (
            <Page
              title={'Awesome2 🎉'}
              index={active}
              key={active.toString()}
              translateX={translateY}
            />
          )}
          {/* {active == 1 && <Text>Awesome2 🎉</Text>} */}
        </View>
      </BottomSheet>
    </View>
    // <Animated.ScrollView
    //   pagingEnabled
    //   scrollEventThrottle={16}
    //   onScroll={scrollHandler}
    //   style={styles.container}>
    //   {Words.map((title, index) => {
    //     return (
    //       <Page
    //         title={title}
    //         index={index}
    //         key={index.toString()}
    //         translateX={translateX}
    //       />
    //     );
    //   })}
    // </Animated.ScrollView>
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
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default CustomReanimatedInterpolate;
