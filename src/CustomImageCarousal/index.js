import {View, useWindowDimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated';
import Pagination from './Pagination';
import CustomImage from './CustomImage';
import axios from 'axios';

const CustomImageCarousal = ({data}) => {
  const scrollViewRef = useAnimatedRef(null);
  const interval = useRef();
  const [slide, setSlide] = useState([]);
  //   const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData, setNewData] = useState([
    {key: 'spacer-left'},
    ...slide,
    {key: 'spacer-right'},
  ]);
  const {width} = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);

  useEffect(() => {
    slider();
  }, []);

  const slider = () => {
    axios({
      method: 'get',
      url: 'https://picsum.photos/v2/list',
    }).then(response => {
      console.log(response.data, 'picsum');
      const images = response.data.map(item => {
        return {
          image: item.download_url,
          width: item.width,
          height: item.height,
        };
      });
      //   console.log(images);
      setSlide(images);
    });
  };

  // Update newData if data change
  useEffect(() => {
    setNewData([{key: 'spacer-left'}, ...slide, {key: 'spacer-right'}]);
  }, [slide]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: e => {
      offSet.value = e.contentOffset.x;
    },
  });

  //   useEffect(() => {
  //     if (isAutoPlay === true) {
  //       let _offSet = offSet.value;
  //       interval.current = setInterval(() => {
  //         if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
  //           _offSet = 0;
  //         } else {
  //           _offSet = Math.floor(_offSet + SIZE);
  //         }
  //         scrollViewRef.current.scrollTo({x: _offSet, y: 0});
  //       }, 2000);
  //     } else {
  //       clearInterval(interval.current);
  //     }
  //     return () => {
  //       clearInterval(interval.current);
  //     };
  //   }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          return (
            <CustomImage
              slide={slide}
              key={index}
              index={index}
              item={item}
              x={x}
              size={SIZE}
              spacer={SPACER}
            />
          );
        })}
      </Animated.ScrollView>
      {/* <Pagination data={slide} x={x} size={SIZE} /> */}
    </View>
  );
};

export default CustomImageCarousal;
