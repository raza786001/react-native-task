// React Navigate Drawer with Bottom Tab
// https://aboutreact.com/bottom-tab-view-inside-navigation-drawer/

import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, StatusBar, ActivityIndicator, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import auth, { firebase } from "@react-native-firebase/auth"

import { anotherName, anotherLogin, loginUser } from '../../../action/myactions';
//Users
// import Users from '../modal/Users';

import * as Animatable from 'react-native-animatable';

const toastConfig = {
    'success': (internalState) => (
      <View style={{ height: '100%', width: '100%', backgroundColor: 'pink' }}>
        <Text>{internalState.text1}</Text>
        <Text>{internalState.text2}</Text>
      </View>  
    ),
    'error': () => {},
    'info': () => {},
    'any_custom_type': () => {}
    }

class Login extends React.Component {

  constructor(props){
      super(props)
      this.state = {
          email:'',
          password:'',
          isLoading: true,
          data: [],
          setIsLoading: true,
          userToken:null,
          secureTextEntry: true,
          setUserToken:null,
          isValidUser: true,
          isValidPassword: true,
          isErrorValid: true,
          submitLoader: false,
          loggedin: []
        }
      
    }
  
    componentDidMount = ()=> {
        console.log("Logged In: "+ this.props.loggedIn);
        console.log("Named In: "+ this.props.name);
    }

  

  textInputChange = (val) => {

      if (val.trim().length >= 4) {
          setData({
              ...data,
              phone: val,
              check_textInputChange: true,
              isValidUser: true
          });
      } else {
          setData({
              ...data,
              phone: val,
              check_textInputChange: false,
              isValidUser: false
          });
      }


  }
  handlePasswordChange = (val) => {
      if (val.trim().length >= 1) {
          this.setState({
              isValidPassword: true,
          });
      }

      else {

          this.setState({
              isValidPassword: false,
          });

      }

  }
updateSecureTextEntry = () => {
    this.setState({
        secureTextEntry: !this.state.secureTextEntry
    });

}
loginByFacebook = () => {
    Alert.alert("Invalid Auth ID!", "Auth ID Invalid", [
        {text: 'Okay'}
    ]);
    return;
}
loginByGoogle = () => {
    Alert.alert("Error!", "Something is Wrong", [
        {text: 'Okay'}
    ]);
    return;
}
loginHandleErrors = () =>{
    if(!this.state.isValidUser || !this.state.isValidPassword ){
        Alert.alert("Invalid User!", "User Name or Pasword Incorrect", [
            {text: 'Okay'}
        ]);
        return;
    }else{
        this.setState({
            submitLoader: true
        })
        this.loginHandle();
        // console.log("Base URLS: "+BASE_URL+"/login-api");
        // var loginArray = {
        //     email: this.state.email,
        //     password: this.state.password
        // };
        // this.props.loginUser(loginArray)
    }
    this.setState({
        isErrorValid: false
    })
}

  //handle phone & password
  loginHandle = async () => {
      // dispatch(anotherName(phone));
      // console.log("name data: " + JSON.stringify(nameData));
    //   this.props.navigation.navigate('MainDrawer');

    try {
        let response = await auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    if (response && response.user) {
        // Alert.alert("Success ✅", response.user)
        // response.user.updateProfile({
        //     displayName: "Javeed",
        //     phoneNumber : '03011234567'
        //   })
            console.log('response', response.user.displayName);
            Snackbar.show({
                        text: "Authenticated successfully",
                        duration: Snackbar.LENGTH_SHORT,
                      });
            this.setState({ submitLoader: false }) 
            this.props.loginSession(response.user);  
            this.props.navigation.navigate('MainDrawer');        
    }
      } catch (e) {
        // console.error(e.message)
        Snackbar.show({
            text: e.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          this.setState({ submitLoader: false })
      }
    
  }

  //function for validuser
  handleValidUser = (val) => {
      if (val.length >= 4) {
          this.setState({
              isValidUser: true,
          });
      }
      else {
          this.setState({
              isValidUser: false,
          });
      }
  }

  render(){
      if(this.props.loggedIn){
        this.props.navigation.navigate('MainDrawer');   
      }
      const { data, submitLoader } = this.state;


  return (
      <View style={styles.container}>
          <ScrollView>
           <>   
          <StatusBar
              barStyle="dark-content"
              backgroundColor="#FFFFFF"
          />
          <View style={styles.header}>
              <Text
                  style={styles.tittle}
              >
                  Welcome!
                  </Text>
              <Text style={{ color: 'grey' }}>Let get started with our app Name </Text>
          </View>
          <Animatable.View
              animation='fadeInUpBig'
              style={styles.footer}>
                   <Text>
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </Text>
              <View>
                  <Text style={[styles.text, { color: 'black' }]}>Mobile Phone</Text>
                  <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                      <MaterialIcons
                          name="phone-iphone"
                          size={20}
                          color="grey"
                      />
                      <TextInput
                          placeholder="Enter Your Phone Number"
                          placeholderTextColor="grey"
                          style={styles.textInput}
                          onChangeText={text => this.setState({email: text})}
                          onEndEditing={(e)=>this.handleValidUser(e.nativeEvent.text)}
                      />
                      {data.check_textInputChange ?
                          <Animatable.View
                              animation="bounceIn"
                              duration={1500}
                          >
                              <Feather
                                  name="check-circle"
                                  size={20}
                                  color='grey'

                              />
                          </Animatable.View>
                          : null}
                  </View>
                  {this.state.isValidUser ? null :
                      <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                              This email number is incorrect*
                      </Text>
                      </Animatable.View>
                  }
              </View>

              <View style={{ marginTop: '5%' }}>
                  <Text style={[styles.text, { color: 'black' }]}>Password</Text>
                  <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                      <MaterialIcons
                          name="enhanced-encryption"
                          size={20}
                          color="grey"
                      />
                      <TextInput
                          placeholder="Enter Your Password"
                          placeholderTextColor="grey"
                          style={styles.textInput}
                          onChangeText={text => this.setState({password: text})}
                          onEndEditing={(e)=>this.handlePasswordChange(e.nativeEvent.text)}
                          secureTextEntry={this.state.secureTextEntry ? true : false}
                      />

                      <TouchableOpacity
                          onPress={this.updateSecureTextEntry}
                      >
                          {this.state.secureTextEntry ?
                              <Feather
                                  name="eye-off"
                                  size={20}
                                  color='grey'

                              />
                              : <Feather
                                  name="eye"
                                  size={20}
                                  color='grey'

                              />}



                      </TouchableOpacity>

                  </View>
                  {this.state.isValidPassword ? null :
                      <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                              This password is incorrect*
                      </Text>
                      </Animatable.View>
                  }
              </View>


              {/* Button */}
              <View style={styles.button_center}>
                  {submitLoader ? (
                       <View style={{height: 300, alignSelf:'center', margin:'40%'}}>
                       <ActivityIndicator size="large" color="#ef5739" />
                   </View>
                  ):(
                    <TouchableOpacity
                      style={styles.get}
                      onPress={() => { this.loginHandleErrors() }}
                  >

                      <View style={{ flexDirection: 'row', padding: '5%' }}>

                          <Text style={styles.textGet}>Login</Text>
                          <MaterialIcons name="login" size={20} color='white' />
                      </View>

                  </TouchableOpacity>
                  )}
                  
              </View>

              <View style={[styles.button_center, { marginTop: '3%' }]}>
                  <TouchableOpacity
                      style={styles.get_line}
                      onPress={() => this.props.navigation.navigate('RegisterScreen')}
                  >

                      <View style={{ flexDirection: 'row', padding: '5%' }}>

                          <Text style={{ color: 'black' }}>Sign Up</Text>
                          <MaterialIcons name="app-registration" size={20} color='black' />
                      </View>

                  </TouchableOpacity>
              </View>

              <View style={{ marginVertical: '5%', alignItems: 'center' }}>

                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Or</Text>
              </View>

              <View style={{ marginBottom: '3%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                      <TouchableOpacity
                          style={{
                              width: 40,
                              height: 40,
                              backgroundColor: 'black',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 100

                          }}
                      >
                          <Feather
                              color="white"
                              size={20}
                              name="cloud"
                          />
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={{
                              width: 40,
                              height: 40,
                              backgroundColor: 'black',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 100

                          }}
                          onPress={() => { this.loginByFacebook() }}   
                      >
                          <Feather
                              color="white"
                              size={20}
                              name="facebook"
                          />
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={{
                              width: 40,
                              height: 40,
                              backgroundColor: 'black',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 100

                          }}
                          onPress={() => { this.loginByGoogle() }}
                      >
                          <Feather
                              color="white"
                              size={20}
                              name="chrome"
                          />
                      </TouchableOpacity>


                  </View>
              </View>

              <View>
                  <Text style={[styles.text, { fontSize: 14, alignSelf: 'center' }]}>
                      You can login with third-party account
                  </Text>
              </View>




          </Animatable.View>
          </>
          </ScrollView>
      </View>
  );
}
}


const mapStateToProps = (state) => ({
    myname: state.name,
    loggedIn: state.loggedIn
    // newsession: state.session,
    // loggedIn: state.isLoggedIn
})
const mapDispatchToProps = (dispatch) => ({
    changeName: (name) => { dispatch(anotherName(name)) },
    loginSession: (data) => { dispatch(anotherLogin(data)) },
    loginUser: (data) => {dispatch(loginUser(data))}
})
export default connect(mapStateToProps, mapDispatchToProps) (Login);
// export default Login;

const { height } = Dimensions.get("screen");
const logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
  },

  header: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: '5%'
  },

  footer: {
      flex: 4,
      backgroundColor: '#f8f8f8',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingVertical: 50,
      paddingHorizontal: 30,
      shadowOffset: { width: 5, height: 5, },
      shadowOpacity: 10,
      shadowColor: "#000",
      shadowRadius: 10,
      elevation: 10,
  },

  logo: {
      width: logo,
      height: logo,
  },
  tittle: {
      color: '#000',
      fontSize: 30,
      fontWeight: 'bold',
  },
  text: {
      color: 'grey',
      fontSize: 18,
      marginVertical: '2%'
  },
  button_center: {
      alignItems: 'center',
      marginTop: '10%'
  },
  end: {
      alignItems: 'flex-end',
      marginTop: '10%'
  },
  get: {
      width: '60%',
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
  },
  get_line: {
      width: '60%',
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 50,
  },
  textGet: {
      color: 'white',
      fontWeight: 'bold',
      paddingRight: '3%'

  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: '5%',
      color: '#000',
      borderBottomWidth: 1
  },
  errMsg: {
      color: 'red'
  }
});