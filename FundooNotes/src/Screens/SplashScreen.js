import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import Global from '../css/Global';
import styles from '../css/SignIncss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import PushNotification from "react-native-push-notification";


export async function CheckEmailSplash() {
  var emialdata1 = await AsyncStorage.getItem('Email');

  if (emialdata1 != '') {
    let fial1 = 'fail';
    let success1 = 'success';
    let response1;

    await firestore()
      .collection('Users')
      .where('Emial', '==', emialdata1)
      .get()
      .then(data => {
        data.docs.forEach(element => {
          var elementdata = element.exists;
          if (elementdata) return (response1 = success1);
          else return (response1 = fial1);
        });
      })
      .catch(error => {
        return error;
      });
    return response1;
  }
}
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  createChannels=()=>{
    PushNotification.createChannel({
      channelId:'test-channel',
      channelName:'Test Channel'
    })
  }
  async componentDidMount() {

    this.createChannels()
    let response = await CheckEmailSplash();
    if (response == 'success') {
      setTimeout(() => {
        this.props.navigation.navigate('DashBoardScreen');
      }, 300);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('SignInScreen');
      }, 300);
    }
  }
  render() {
    return (
        <View style={{height:'100%'}}>
      <View style={styles.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('../Assets/images/noteslogo1.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
        </View>
      </View>
      </View>
    );
  }
}
