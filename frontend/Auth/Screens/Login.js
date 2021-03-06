import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import Axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async () => {
    let {data} = await Axios.post('https://totp-gateway.herokuapp.com/auth/login', {
      email: this.state.email,
      password: this.state.password,
    });

    if (data.secret && data.id) {
      let id = data.id.toString();
      let secret = data.secret.toString();
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('secret', secret);
      this.props.navigation.navigate('QR');
    } else {
      Alert.alert(
        data,
        '',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  render() {
    return (
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#5fdf9a', '#50bbdf']}
            style={{
              flex: 1,
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              alignItems: 'center',
            }}>
            <View
              style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="security"
                size={Dimensions.get('window').height / 5}
              />
            </View>

            <View style={{flex: 2, alignItems: 'center', width: '90%'}}>
              <Input
                placeholder="Email"
                leftIcon={
                  <MaterialCommunityIcons name="email-outline" size={20} />
                }
                leftIconContainerStyle={{marginRight: 10}}
                autoCompleteType="email"
                autoCapitalize="none"
                value={this.state.email}
                placeholderTextColor="#595959"
                onChangeText={email => {
                  this.setState({email});
                }}
              />
              <Input
                placeholder="Password"
                leftIcon={
                  <MaterialCommunityIcons name="lock-outline" size={20} />
                }
                leftIconContainerStyle={{marginRight: 10}}
                secureTextEntry={true}
                value={this.state.password}
                placeholderTextColor="#595959"
                onChangeText={password => {
                  this.setState({password});
                }}
              />

              <View style={{width: '60%'}}>
                <Button
                  title="Log In"
                  onPress={this.handleSubmit}
                  style={{marginTop: '15%'}}
                  titleStyle={{color: 'black'}}
                  buttonStyle={{
                    borderRadius: 30,
                    backgroundColor: 'transparent',
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                />
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
