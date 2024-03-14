import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import download from 'downloadjs';

const Test = ({data}) => {
  const [slide, setSlide] = useState([]);

  const slider = () => {
    // axios({
    //   method: 'get',
    //   url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    // }).then(response => {
    //   console.log(response.data, 'picsum');
    // });
    axios
      .get(
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        {
          // headers: this.headers,
          responseType: 'blob', // had to add this one here
        },
      )
      .then(response => {
        const content = response.headers['content-type'];
        download(response.data, 'text', content);
      })
      .catch(error => console.log(error));
  };

  // useEffect(() => {
  //   slider();
  // }, []);

  return (
    <View>
      {data.map(item => (
        <TouchableOpacity onPress={slider} key={item.image}>
          <Image
            style={{width: 240, height: 240, resizeMode: 'contain'}}
            source={item.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
