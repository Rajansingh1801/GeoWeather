import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import p1 from '../../assets/images/p1.jpg';
import p2 from '../../assets/images/p2.jpg';
import p3 from '../../assets/images/pexels-daniel-kux-932320.jpg';
import p4 from '../../assets/images/wheather.jpg';

//icon
import sealevel from '../../assets/icon/sea-level.png';
import ground from '../../assets/icon/ground.png';
import sun from '../../assets/icon/sun.png';
import cloudy from '../../assets/icon/cloudy-day.png';
import min from '../../assets/icon/min.png';
import max from '../../assets/icon/max.png';
import pressure from '../../assets/icon/pressure-gauge.png';
import humidity from '../../assets/icon/humidity.png';

const Home = props => {
  const [weatherdata, setWeatherData] = useState();
  const [location, setLocation] = useState('hata');

  const handleChange = value => {
    setLocation(value);
  };
  const searchlocation = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d41cbaaad2f01b75473e4e3263fbfc2f&units=metric`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(response);
      setWeatherData(data);
      console.log(data);
      setLocation('');
      console.log(data.main.temp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchlocation();
  }, []);

  return (
    <>
      <ImageBackground source={p1} style={styles.imagebg} resizeMode="cover">
        <View style={styles.mainCont}>
          <View style={styles.inputpcontainer}>
            <TextInput
              placeholder="City name"
              value={location}
              onChangeText={handleChange}
              style={styles.input}
            />
            <TouchableOpacity onPress={searchlocation}>
              <Icon name="search" style={{fontSize: 22}}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.temp}>{weatherdata?.main?.temp}°C</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.city}>{weatherdata?.name}</Text>
            <Text style={styles.city}>{weatherdata?.sys?.country}</Text>
          </View>
          <Text style={styles.city}>
            {weatherdata?.weather[0]?.description}
          </Text>
          <View style={styles.abso}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.mainContainer}>
              <View style={styles.boxCont}>
                <Image style={styles.img} source={sun} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.feels_like}°C
                </Text>
                <Text style={styles.tempname}>Feel like </Text>
              </View>
              <View style={styles.boxCont}>
                <Image style={styles.img} source={cloudy} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.clouds?.all} oktas
                </Text>
                <Text style={styles.tempname}>Cloud</Text>
              </View>

              <View style={styles.boxCont}>
                <Image style={styles.img} source={max} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.temp_max}°C
                </Text>
                <Text style={styles.tempname}>Max temp</Text>
              </View>
              <View style={styles.boxCont}>
                <Image style={styles.img} source={min} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.temp_min}°C
                </Text>
                <Text style={styles.tempname}>Min temp</Text>
              </View>

              <View style={styles.boxCont}>
                <Image style={styles.img} source={pressure} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.pressure} Pa
                </Text>
                <Text style={styles.tempname}>Pressure</Text>
              </View>
              <View style={styles.boxCont}>
                <Image style={styles.img} source={humidity} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.humidity} %rh
                </Text>
                <Text style={styles.tempname}>Humidity</Text>
              </View>
              <View style={styles.boxCont}>
                <Image style={styles.img} source={sealevel} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.sea_level} m
                </Text>
                <Text style={styles.tempname}>Sea level</Text>
              </View>
              <View style={styles.boxCont}>
                <Image style={styles.img} source={ground} alt="" />
                <Text style={styles.tempdata}>
                  {weatherdata?.main?.grnd_level} m
                </Text>
                <Text style={styles.tempname}>Ground level</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  imagebg: {
    flex: 1,
    height: '100%',
  },
  mainCont: {
    paddingHorizontal: 30,
    position: 'relative',
  },
  inputpcontainer: {
    backgroundColor: 'transparent',
    marginVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    color: 'white',
    borderColor: '#86C8BC',
    borderWidth: 3,
    fontWeight: '700',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    color: 'white',
    fontWeight: '700',
    width: '100%',
  },
  temp: {
    marginTop: 25,
    fontSize: 74,
    color: 'white',
    fontFamily: 'Righteous-Regular',
  },
  city: {
    fontSize: 24,
    fontFamily: 'Caudex-Bold',
    paddingEnd: 20,
  },
  mainContainer: {
    marginTop: 100,
  },
  boxCont: {
    height: 150,
    width: 150,
    backgroundColor: 'white',
    marginEnd: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  img: {
    height: 75,
    width: 75,
  },
  tempdata: {
    color: 'black',
    fontFamily: 'Caudex-Bold',
  },
  tempname: {
    color: 'black',
    fontFamily: 'Caudex-Bold',
  },
});
// fontFamily: 'Satisfy-Regular',

// fontFamily: 'Righteous-Regular',

// fontFamily: 'Caudex-Bold',
//  const searchloaction = event => {
//    console.log('pressed');
//    if (event.key === 'Enter') {
//      axios.get(url).then(response => {
//        setData(response.data);
//        console.log(response.data);
//      });
//    }
//  };

// Cascadia Code
