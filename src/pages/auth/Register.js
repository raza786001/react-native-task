import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, StatusBar, TouchableOpacity, Alert, Platform, TextInput } from 'react-native';


import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { anotherName, anotherLogin, registerUser } from '../../../action/myactions';
import ValidationComponent from 'react-native-form-validator';
import * as Animatable from 'react-native-animatable';
import auth, { firebase } from "@react-native-firebase/auth"


class Register extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email:'',
            emailError: '',
            phone: '',
            phoneError: '',
            name: '',
            nameError: '',
            password:'',
            passwordError: '',
            con_password: '',
            con_passwordError: '',
            submitLoader: false,
            isLoading: true,
            data: [],
            secureTextEntry: true,
            check_textInputChange: false,
            confirm_secureTextEntry: true,
            setIsLoading: true,
            userToken:null,
            setUserToken:null,
            isValidName: true,
            errorName: "",
            isValidPhone: true,
            errorPhone : '',
            isValidEmail: true,
            errorEmail : '',
            isValidPassword: true,
            errorPassword : '',
            errorConPassword : '',
            loggedin: []
          }
        
      }

   
      //function for validuser
  handleValidName = (val) => {
    if (val.length >= 4) {
        this.setState({
            isValidName: true,
            nameError : "Name Must be more than 4"
        });
        this.setState({
            nameError : "Name Must be more than 4"
        });
    }
    else {
        this.setState({
            isValidName: false,
        });
    }
}
handleValidPhone = (val) => {
    if (val.length === 11) {
        this.setState({
            isValidPhone: true,
        });
    }
    else {
        this.setState({
            isValidPhone: false,
        });
    }
}
handleValidEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(val) === false) {
    // if (val.length >= 4) {
        this.setState({
            isValidEmail: false,
        });
    }
    else {
        this.setState({
            isValidEmail: true,
        });
    }
}
handleValidPassword = (val) => {
    if (val.length >= 5) {
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
    registerHandleErrors = () =>{
        if(!this.state.isValidName || !this.state.isValidPhone || !this.state.isValidEmail || !this.state.isValidPassword ){
            Alert.alert("Invalid Entries!", "Fields are Incorrect", [
                {text: 'Okay'}
            ]);
            return;
        }else{
            if(this.state.password === this.state.con_password){
                this.setState({
                    submitLoader: true
                })
                this.registerHandle();
            }else{
                Alert.alert("Invalid User!", "Password and Confirm Password Does not Matched", [
                    {text: 'Okay'}
                ]);
                return;
            }
        }
        this.setState({
            isErrorValid: false
        })
    }
    // }
     registerHandle = async () => {
        
       
        try {
            let response =  await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
             if(response){
                response.user.updateProfile({
                    displayName: this.state.name,
                    phoneNumber : this.state.phone
                  })
                  this.setState({
                      submitLoader: false,
                    name: '',
                    email: '', 
                    password: ''
                  })
                  this.props.navigation.navigate('LoginScreen');
             }
           } catch (e) {
             console.error(e.message);
           }
    
    }
     handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });

    }
     updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        });

    }
     handleConfirmPasswordChange = (val) => {

        setData({
            ...data,
            password: val,
        });

    }
     updateConfirmSecureTextEntry = () => {
        this.setState({
            confirm_secureTextEntry: !this.state.confirm_secureTextEntry
        });

    }
    render(){
        console.log("Name Error: "+this.state.nameError);
        const { submitLoader } = this.state;
    return (
        <View style={styles.container}>
            <ScrollView>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
            />
            <View style={styles.header}>
                <Text
                    style={styles.tittle}
                >
                    Registration!
                    </Text>
                <Text style={{ color: 'grey' }}>Let's get you register with our app</Text>
            </View>
            <Animatable.View
                animation='fadeInUpBig'
                style={styles.footer}>
                    
                <View>
                    <Text style={[styles.text, { color: 'black' }]}>Name</Text>
                    <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                        <MaterialIcons
                            name="phone-iphone"
                            size={20}
                            color="grey"
                        />
                        <TextInput
                            placeholder="Enter Your Name"
                            placeholderTextColor="grey"
                            style={styles.textInput}
                            onChangeText={text => this.setState({name: text})}
                            onEndEditing={(e)=>this.handleValidName(e.nativeEvent.text)}
                        />
                        {this.state.data.check_textInputChange ?
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
                    {this.state.isValidName ? null :
                      <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                              {this.state.nameError} Name is incorrect its must be more than 4*
                      </Text>
                      </Animatable.View>
                  }
                </View>

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
                            keyboardType = 'numeric'
                            style={styles.textInput}
                            onChangeText={text => this.setState({phone: text})}
                            onEndEditing={(e)=>this.handleValidPhone(e.nativeEvent.text)}
                        />
                        {this.state.data.check_textInputChange ?
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
                    {this.state.isValidPhone ? null :
                      <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                              Phone Number is incorrect it must be equal to 11*
                      </Text>
                      </Animatable.View>
                  }
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={[styles.text, { color: 'black' }]}>Email</Text>
                    <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                        <MaterialIcons
                            name="phone-iphone"
                            size={20}
                            color="grey"
                        />
                        <TextInput
                            placeholder="Enter Your Email"
                            placeholderTextColor="grey"
                            style={styles.textInput}
                            onChangeText={text => this.setState({email: text})}
                            onEndEditing={(e)=>this.handleValidEmail(e.nativeEvent.text)}
                        />
                    </View>
                    {this.state.isValidEmail ? null :
                      <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                              Email is incorrect*
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
                            onEndEditing={(e)=>this.handleValidPassword(e.nativeEvent.text)}
                            secureTextEntry={this.state.confirm_secureTextEntry ? true : false}
                        />

                        <TouchableOpacity
                            onPress={this.updateConfirmSecureTextEntry}
                        >
                            {this.state.confirm_secureTextEntry ?
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


                <View style={{ marginTop: '5%' }}>
                    <Text style={[styles.text, { color: 'black' }]}>Confirm Password</Text>
                    <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                        <MaterialIcons
                            name="enhanced-encryption"
                            size={20}
                            color="grey"
                        />
                        <TextInput
                            placeholder="Enter Your Password Again"
                            placeholderTextColor="grey"
                            style={styles.textInput}
                            onChangeText={text => this.setState({con_password: text})}
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
                </View>

                {/* Button */}
                <View style={styles.button_center}>
                    {submitLoader ?(
                        <View style={{height: 300, alignSelf:'center', margin:'40%'}}>
                        <ActivityIndicator size="large" color="#ef5739" />
                    </View>
                    ):(
                        <TouchableOpacity
                        style={styles.get}
                        onPress={() => this.registerHandleErrors()}
                    >

                        <View style={{ flexDirection: 'row', padding: '5%' }}>

                            <Text style={{ color: 'white' }}>Sign Up</Text>
                            <MaterialIcons name="app-registration" size={20} color='white' />
                        </View>

                    </TouchableOpacity>
                    )}
                    
                </View>

                <View style={[styles.button_center, { marginTop: '3%' }]}>
                    <TouchableOpacity
                        style={styles.get_line}
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                    >

                        <View style={{ flexDirection: 'row', padding: '5%' }}>

                            <Text style={[styles.textGet, { color: 'black' }]}>Login</Text>
                            <MaterialIcons name="login" size={20} color='black' />
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
                    <Text style={[styles.text, { fontSize: 12, alignSelf: 'center' }]}>
                        You can Register with third-party account
                    </Text>
                </View>

            </Animatable.View>
            </ScrollView>
        </View>
    );
}
}

const mapStateToProps = (state) => ({
    myname: state.name
})
const mapDispatchToProps = (dispatch) => ({
    loginSession: (data) => { dispatch(anotherLogin(data)) }
})
export default connect(mapStateToProps, mapDispatchToProps) (Register);


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
