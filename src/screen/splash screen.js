import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import img from '../../assets/images/wheather.jpg';
import vid from '../../assets/images/video.mp4';
import Video from 'react-native-video';
const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar hidden={false} translucent backgroundColor="transparent" />
      {/* 
      <ImageBackground source={img} style={styles.img} resizeMode="cover">
        <Text style={styles.txt}>MY Whaether App</Text>
      </ImageBackground>{' '}
      */}
      <Video
        source={vid}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <View style={styles.txtCont}>
        <Text style={styles.txt}>GeoWeather ☀️</Text>
        <Text style={styles.txt}>Made with ❤️‍🔥 India</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  //   img: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     width: '100%',
  //     height: '100%',
  //   },
  bg: {
    position: 'relative',
    height: '100%',
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

  backgroundVideo: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});
