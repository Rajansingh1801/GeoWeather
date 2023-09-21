import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import img from '../../assets/images/wheather.jpg';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar hidden={false} translucent backgroundColor="transparent" />
      <View style={styles.loticont}>
        <LottieView
          source={require('../../assets/loader.json')}
          style={styles.loti}
          autoPlay
          loop
        />
      </View>
      <View style={styles.txtCont}>
        <Text style={styles.txt}>GeoWeather ☀️</Text>
        <Text style={styles.txt}>Made with ❤️‍🔥 India</Text>
      </View>
    </SafeAreaView>
  );
};

export default Loading;
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'black',
  },
  txtCont: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },

  txt: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'Satisfy-Regular',
  },
  loticont: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loti: {
    width: 300,
    height: 300,
  },
});
