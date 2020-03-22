import React, { Component } from 'react'
import {
    SafeAreaView,
    View,
    Dimensions,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends Component {

    
   

    render() {

        

        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior="padding" enabled style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, alignItems: "center" }}>
                    <LinearGradient colors={['#5fdf9a', '#50bbdf']} style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width, alignItems: 'center' }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="security" size={Dimensions.get('window').height / 5} />
                        </View>

                        <View style={{ flex: 2, alignItems: 'center', width: "90%", }}>
                            <View style={{ width: "60%" }}>
                                <Button
                                    title="Log In"

                                    onPress={() => this.props.navigation.navigate('Login')}
                                    style={{ marginTop: "15%" }}
                                    titleStyle={{ color: "black" }}
                                    buttonStyle={{ borderRadius: 30, backgroundColor: "transparent", borderColor: "black", borderWidth: 1 }}
                                />
                                 <Button
                                    title="Register"
                                    onPress={() => this.props.navigation.navigate('Register')}
                                    style={{ marginTop: "15%" }}
                                    titleStyle={{ color: "black" }}
                                    buttonStyle={{ borderRadius: 30, backgroundColor: "transparent", borderColor: "black", borderWidth: 1 }}
                                />
                            </View>

                        </View>
                    </LinearGradient>
                </KeyboardAvoidingView>
            </SafeAreaView>

        )
    }

}