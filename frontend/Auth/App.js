import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import HomeScreen from './Screens/Homescreen';
import QR from './Screens/QR';
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPresent: false,
    };
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('secret');
    if (token) {
      this.setState({
        tokenPresent: true,
      });
    }
  };

  render() {
    if (this.state.tokenPresent) {
      return <QR />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="QR" component={QR} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
