import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import p1 from '../../assets/images/p1.jpg';
import p2 from '../../assets/images/p2.jpg';
import cold2 from '../../assets/images/cold2.jpg';
import normal from '../../assets/images/normal.jpg';

import {get} from 'lodash';
//icon
import sealevel from '../../assets/icon/sea-level.png';
import ground from '../../assets/icon/ground.png';
import sun from '../../assets/icon/sun.png';
import cloudy from '../../assets/icon/cloudy-day.png';
import min from '../../assets/icon/min.png';
import max from '../../assets/icon/max.png';
import pressure from '../../assets/icon/pressure-gauge.png';
import humidity from '../../assets/icon/humidity.png';
import sunrise from '../../assets/icon/sunrise.png';
import sunset from '../../assets/icon/sunset.png';
import daytime from '../../assets/icon/day-and-night.png';

const Home = props => {
  const [weatherdata, setWeatherData] = useState();
  const [location, setLocation] = useState('badarinath');
  const [currentDate, setCurrentDate] = useState('');
  const [temp, setTemp] = useState('');

  const [currentTimeHour, setCurrentTimeHour] = useState('');
  const [currentTimeMin, setCurrentTimeMIn] = useState('');
  const [currentTimeSec, setCurrentTimeSec] = useState('');

  const [sunriseTimeHour, setSunriseTimeHour] = useState('');
  const [sunriseTimeMin, setSunriseTimeMIn] = useState('');

  const [sunsetTimeHour, setSunsetTimeHour] = useState('');
  const [sunsetTimeMin, setSunsetTimeMIn] = useState('');
  const [totalDayLenght, setTotalDaylenght] = useState();

  const [bg, setBg] = useState(p1);

  const handleChange = value => {
    setLocation(value);
  };
  const searchlocation = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d41cbaaad2f01b75473e4e3263fbfc2f&units=metric`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      // console.log(response);
      setWeatherData(data);
      // console.log(data);

      setLocation('');
      // console.log(data.main.temp);
    } catch (err) {
      setLocation('hata');
      console.log(err);
    }
    Keyboard.dismiss();
  };
  useEffect(() => {
    searchlocation();
  }, []);

  useEffect(() => {
    if (weatherdata) {
      let sunrise = weatherdata.sys?.sunrise;
      setSunriseTimeHour(new Date(sunrise * 1000).getHours());
      setSunriseTimeMIn(new Date(sunrise * 1000).getMinutes());
      //  ----------------------------------
      let sunset = weatherdata.sys?.sunset;
      setSunsetTimeHour(new Date(sunset * 1000).getHours() % 12);
      setSunsetTimeMIn(new Date(sunset * 1000).getMinutes());

      setTemp(parseInt(weatherdata.main?.temp));

      // ------------------
      const sunrisetime = weatherdata?.sys?.sunrise * 1000;
      const sunsettime = weatherdata?.sys?.sunset * 1000;

      // for day
      const timeDifferenceInMilliseconds = sunsettime - sunrisetime;

      const hours = Math.floor(timeDifferenceInMilliseconds / 3600000);
      const minutes = Math.floor(
        (timeDifferenceInMilliseconds % 3600000) / 60000,
      );
      setTotalDaylenght(` ${hours} Hour and ${minutes} minutes`);
      // for night

      // ------------------
    }
  }, [weatherdata]);

  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    var date = new Date().getDate();
    var month = monthNames[new Date().getMonth()];
    var year = new Date().getFullYear();
    setCurrentDate(date + ', ' + month + ' ' + year);

    const timer = setInterval(() => {
      setCurrentTimeHour(new Date().getHours().toLocaleString() % 12);
      setCurrentTimeMIn(new Date().getMinutes().toLocaleString());
      setCurrentTimeSec(new Date().getSeconds().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (weatherdata?.main?.temp >= 30) {
      setBg(p1);
    } else if (weatherdata?.main?.temp >= 20) {
      setBg(p2);
    } else if (weatherdata?.main?.temp >= 10) {
      setBg(normal);
    } else if (weatherdata?.main?.temp >= -50) {
      setBg(cold2);
    }
  }, [location]);

  return (
    <>
      <ImageBackground source={bg} style={styles.imagebg}>
        <StatusBar hidden={false} translucent backgroundColor="transparent" />
        <KeyboardAvoidingView>
          <View style={styles.mainCont}>
            <View style={styles.inputpcontainer}>
              <TextInput
                placeholder="City name"
                value={location}
                onChangeText={handleChange}
                style={styles.input}
                onSubmitEditing={searchlocation}
                placeholderTextColor={'white'}
              />
              <TouchableOpacity onPress={searchlocation}>
                <Icon
                  name="search"
                  style={{fontSize: 22, color: 'white'}}></Icon>
              </TouchableOpacity>
            </View>

            <View style={{marginHorizontal: 30}}>
              <Text style={styles.temp}>{temp}°C</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.city}>{weatherdata?.name}</Text>
                <Text style={styles.city}>{weatherdata?.sys?.country}</Text>
              </View>
              <Text style={styles.city}>
                {get(weatherdata, 'weather[0].description', 'not found')}
              </Text>
              <Text style={styles.city}>{currentDate}</Text>
              <Text style={styles.city}>
                {currentTimeHour}:{currentTimeMin}:{currentTimeSec}
              </Text>
            </View>

            <View style={styles.abso}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.mainContainer}>
                <View style={styles.boxCont}>
                  <Image style={styles.img} source={sunrise} alt="" />
                  <Text style={styles.tempdata}>
                    {sunriseTimeHour}:{sunriseTimeMin} AM
                  </Text>
                  <Text style={styles.tempname}>Sunrise</Text>
                </View>

                <View style={styles.boxCont}>
                  <Image style={styles.img} source={sunset} alt="" />
                  <Text style={styles.tempdata}>
                    {sunsetTimeHour}:{sunsetTimeMin} PM
                  </Text>
                  <Text style={styles.tempname}>Sunset</Text>
                </View>

                <View style={styles.boxCont}>
                  <Image style={styles.img} source={daytime} alt="" />
                  <Text style={styles.tempdata}>{totalDayLenght}</Text>
                  <Text style={styles.tempname}>Day Length</Text>
                </View>

                {/* <View style={styles.boxCont}>
              <Image style={styles.img} source={nightday} alt="" />
              <Text style={styles.tempdata}>{totalNightLenght}</Text>
              <Text style={styles.tempname}>Night Length</Text>
            </View> */}

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
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  imagebg: {
    flex: 1,
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  mainCont: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    height: '100%',
  },
  inputpcontainer: {
    marginHorizontal: 30,
    backgroundColor: 'transparent',
    marginVertical: 60,
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
    marginTop: 50,
    fontSize: 110,
    color: 'white',
    fontFamily: 'Righteous-Regular',
  },
  city: {
    fontSize: 25,
    fontFamily: 'Caudex-Bold',
    paddingEnd: 20,
    color: 'white',
  },
  mainContainer: {
    // marginTop: 100,
  },
  abso: {
    marginBottom: 20,
    // position: 'absolute',
    // bottom: '5%',
    // paddingHorizontal: 20,
  },
  boxCont: {
    height: 150,
    width: 150,
    backgroundColor: 'white',
    marginStart: 25,
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
    textAlign: 'center',
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
