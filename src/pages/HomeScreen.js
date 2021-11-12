import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { ColorPalette } from '../colors/ColorPalette';
import {connect} from 'react-redux';
import SliderTopHeader from '../head/SliderTopHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import { anotherLogin, authLogout } from '../../action/myactions';


 class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
              ]
        };
    }

    logoutUser = (data) => {
        this.props.logoutUser(data);
        Snackbar.show({
            text: "Logout successfully",
            duration: Snackbar.LENGTH_SHORT,
          });
        this.props.navigation.navigate('LoginScreen'); 
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: ColorPalette.LightColors.White }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={ColorPalette.LightColors.Plight}
                />
                <ScrollView>
                    <SafeAreaView>
                        <View>
                            <View style={{
                                backgroundColor: ColorPalette.LightColors.Plight,
                                borderBottomLeftRadius: 50,
                                borderBottomRightRadius: 50,
                                elevation: 5
                            }}>
                                <SliderTopHeader />
                            </View>

                            <View style={{ margin: "4%", padding: 0 }}>
                               
                                
                                <View >
                                   {/* <Text>Welcome Here</Text> */}
                                        <TouchableOpacity
                                            style={styles.get}
                                            onPress={() => { this.logoutUser(this.props.loginUser) }}
                                        >

                                            <View style={{ flexDirection: 'row', padding: '5%' }}>

                                                <Text style={styles.textGet}>Logout </Text>
                                                <MaterialIcons name="logout" size={20} color='white' />
                                            </View>

                                        </TouchableOpacity>
                                </View>
                            </View>
                            

                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    loginUser: state.loginUser
})
const mapDispatchToProps = (dispatch) => ({
    loginSession: (data) => { dispatch(anotherLogin(data)) },
    logoutUser: (data) => {dispatch(authLogout(data))}
})

export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen);



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
  
    }
  });