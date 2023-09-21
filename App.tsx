import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home from './src/screen/home';
// import SplashScreen from './src/screen/splash screen';
import Loading from './src/screen/loading';
import SplashScreen from './src/screen/splash screen';

const App = () => {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1500);
  });
  return (
    <>
      <View style={styles.container}>
        {splash ? <Loading /> : <Home name="rajan" />}
      </View>

      {/* <Home /> */}
      {/* <Loading /> */}
      {/* <SplashScreen /> */}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
