// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { anotherName, anotherLogin, loginUser } from '../action/myactions';
import { BASE_URL } from '../constants/constants';
const SplashScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const [loginSession, setIsFetching] = useState(false);

  const total_counts = useSelector((state) => state.total_counts);
  const counter = useSelector((state) => state.counter);

  // const anotherLogin = useSelector((state) => state.anotherLogin);
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  // AsyncStorage.getItem('user_id').then((value) =>
      //   // navigation.replace(value === null ? 'Auth' : 'MainDrawer'),
      //   console.log(result)
      // );
  const fetchUserData = (userId) => {
    console.log("Console of Splsh Screen: "+ JSON.parse(userId));
    if(userId){
    //   navigation.replace('MainDrawer');
    // }
    fetch(BASE_URL+"/user-get", {
      method: 'POST',
      headers: {
          Accept: 'application/json; charset=UTF-8;',
          'Content-Type': 'application/json; charset=UTF-8;'
      },
      body: JSON.stringify({
          id: JSON.parse(userId)
      })
  })
      .then((response) => response.json())
      .then((json) => {
        console.log("json ka data: "+JSON.stringify(json))
          if(json.status == 200){
            console.log("json ka data: "+JSON.stringify(json.data))
            dispatch(anotherLogin(json.data));  
            navigation.replace('MainDrawer');
          }
      })
      .catch((error) => {
          console.error(error);
      });
    }else{
      navigation.replace('Auth');
    }
  }     
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // const user_new_id = AsyncStorage.getItem('user_id');
      
      // console.log("Async Data:  "+JSON.stringify(AsyncStorage.getItem('user_id')));
      
      // AsyncStorage.getItem('user_id').then((value) =>
      // fetchUserData(value)
      // );
      navigation.replace('Auth');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pics/b.jpg')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
