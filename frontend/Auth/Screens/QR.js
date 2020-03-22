import React, { Component } from 'react'
import {
    SafeAreaView,
    View,
    Dimensions,
    Text,
    AsyncStorage,
    Button
} from 'react-native'

import QRCode from 'react-native-qrcode-svg';

import { totp } from 'otplib';
totp.options = { step: 5}
export default class Register extends Component {

    constructor(props) {
      super(props)
      

      this.state = {
        secret:'nope',
        token:'nope',
        timestamp: 'nope',
        loading:true,
      }
    }
  
    componentDidMount = async() => {
        if(this.state.loading){
            let secret = await AsyncStorage.getItem("secret")
            let token = totp.generate(secret) 

            this.setState({
                secret,
                token
            })
        }
        
        this.interval = setInterval(() => {
            let timestamp = new Date().toISOString()
            let token = totp.generate(this.state.secret)
            this.setState({ time: Date.now(), timestamp, token})
        }, 5000);
    }
    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    render(){
        return(
            <View style= {{justifyContent: "center", alignItems: "center", height: Dimensions.get('window').height}}>
                <QRCode 
                    value={this.state.token}
                    size={Dimensions.get('window').width*.6}    
                />
                <Button
                    title="Delete secrets"
                    onPress={async () => {
                        await AsyncStorage.removeItem('secret')
                        await AsyncStorage.removeItem('id')
                    }}

                />
            </View>
        )
        
    }

}