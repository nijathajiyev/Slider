/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import CustomImageCarousal from './src/CustomImageCarousal';
import ReanimatedInterpolate from './src/Reanimated';
import CustomReanimatedInterpolate from './src/CustomReanimated';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Test from './src/test';

const App = () => {
  const data2 = [
    {
      image: require('./src/assets/image/image-product-1-landscape.jpg'),
    },
    {
      image: require('./src/assets/image/image-product-2-landscape.jpg'),
    },
    // {
    //   image: require('./src/assets/image/image-product-3-landscape.jpg'),
    // },
    // {
    //   image: require('./src/assets/image/image-product-4-landscape.jpg'),
    // },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.carouselContainer}>
          <Test data={data2} />
          {/* <CustomImageCarousal data={data2} /> */}
        </View>
      </SafeAreaView>
    </>
  );
};
{
  /* <SafeAreaView style={styles.container}>
       <View style={styles.carouselContainer}> <CustomImageCarousal data={data2} /> </View> 
    </SafeAreaView> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  carouselContainer: {
    marginBottom: 20,
  },
});

export default App;
