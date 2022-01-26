import React, {Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import styles from '../css/SignUpcss';
import Global from '../css/Global';
import {signUp} from '../Services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createImagecolleciton} from '../Services/NotesServices';
import {BORDER, COLOR, FLEX} from '../Utility/Styling'
import OutlineInput from 'react-native-outline-input'


class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      Email: '',
      EmailError: '',
      Password: '',
      PasswordError: '',
      isLoading: false,
    };
  }

  navigateSignIn = () => {
    this.props.navigation.navigate('SignInScreen');
  };

  validateFirstName = val => {
    this.setState({firstName: val});
    let rjx = /^[A-Z][a-z]{1,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({firstNameError: 'invalid firstName'});
    else this.setState({firstNameError: ''});
  };

  validatelastName = val => {
    this.setState({lastName: val});
    let rjx = /^[A-Z][a-z]{2,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({lastNameError: 'invalid lastName'});
    else this.setState({lastNameError: ''});
  };

  validateEmail = val => {
    this.setState({Email: val});
    let rjx =
      /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({EmailError: 'invalid email'});
    else this.setState({EmailError: ''});
  };

  validatePassword = val => {
    this.setState({Password: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({PasswordError: 'invalid password'});
    else this.setState({PasswordError: ''});
  };

  onSubmit = async () => {
    let signUpData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      Emial: this.state.Email,
      Password: this.state.Password,
    };
    if(this.state.firstName!='' && this.state.lastName!='' && this.state.Email!=''){
     signUp(signUpData);
     this.setState({isLoading: true});
     this.props.navigation.navigate('SignInScreen');
    }
   
    this.AsyncStoragedata();
    createImagecolleciton();
  };

  AsyncStoragedata = async () => {
    try {
      await AsyncStorage.setItem('Email', this.state.Email);
      await AsyncStorage.setItem('firstName', this.state.firstName);
      await AsyncStorage.setItem('lastName', this.state.lastName);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('../Assets/images/noteslogo1.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.container3}>
            <View>
            <OutlineInput
                label='First Name' 
                activeValueColor= {COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={styles.FirstNameInput}
                onChangeText={this.validateFirstName}/>
              <Text style={styles.TextRedError}>
                {this.state.firstNameError}
              </Text>
            </View>
            <View>
            <OutlineInput
                label='Last Name' 
                activeValueColor={COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={styles.LastNameInput}
                onChangeText={this.validatelastName}/>
              <Text style={styles.TextRedError}>
                {this.state.lastNameError}
              </Text>
            </View>
            <View>
            <OutlineInput
                label='Email' 
                activeValueColor={COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={styles.EmailIdInput}
                onChangeText={this.validateEmail}/>
              <Text style={styles.TextRedError}> {this.state.EmailError} </Text>
            </View>
            <View>
            <OutlineInput
                label='Password' 
                secureTextEntry={true} 
                activeValueColor={COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={styles.PasswordInput}
                onChangeText={this.validatePassword} />
              <Text style={styles.TextRedError}>
                {this.state.PasswordError}
              </Text>
            </View>
            {this.state.isLoading ? 
            (
              <TouchableOpacity style={styles.buttonSignUP}>
                <View
                  style={{
                    flexDirection: (FLEX.FLEX_DIRECTION),
                    justifyContent: (BORDER.JUSTIFY_CONTENT),
                    alignItems: (BORDER.JUSTIFY_CONTENT),
                  }}>
                  <ActivityIndicator size={30} color={COLOR.BACKGROUND} />
                  <Text style={styles.SignUptxt}>Loading...</Text>
                </View>
              </TouchableOpacity>
            ):(
              <TouchableOpacity
                style={styles.buttonSignUP}
                onPress={this.onSubmit}>
                <Text style={styles.SignUptxt}>SignUp</Text>
              </TouchableOpacity>
            ) 
            }
            <View style={styles.TextView}>
              <Text>Have an account with us?</Text>
              <TouchableOpacity onPress={this.navigateSignIn}>
                <Text style={styles.LoginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
