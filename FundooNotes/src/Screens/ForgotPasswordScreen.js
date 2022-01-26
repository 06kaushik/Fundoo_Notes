import React from 'react';
import {View,Text,TextInput,Image,TouchableOpacity} from 'react-native';
import ForgotPasswordCss from '../css/ForgotPasswordScreenCss';
import Global from '../css/Global';
import {CheckEmail} from '../Services/UserServices';
import Snackbar from 'react-native-snackbar';
import {COLOR} from '../Utility/Styling'
import OutlineInput from 'react-native-outline-input'

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      EmailError: '',
    };
  }

  validateEmail = val => {
    this.setState({Email: val});
    let rjx =
      /^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({EmailError: 'invalid Email'});
    else this.setState({EmailError: ''});
  };

  onSubmit = async () => {
    let response = await CheckEmail(this.state.Email);
    if (response == 'success') {
      Snackbar.show({
        text: 'valid email',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'CLOSE',
          textColor: 'green',
        },
      });
      this.props.navigation.navigate('ResetPasswordScreen');
    } else {
      Snackbar.show({
        text: 'invalid emial',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'CLOSE',
          textColor: 'red',
        },
      });
    }
  };

  navigateSignIn = () => {
    this.props.navigation.navigate('SignInScreen');
  };

  render() {
    return (
      <View style={ForgotPasswordCss.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('../Assets/images/noteslogo1.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
        </View>
        <View style={ForgotPasswordCss.container2}>
          <View style={ForgotPasswordCss.container3}>
            <View>
            <OutlineInput
                label='Email Id'
                // secureTextEntry={true} 
                activeValueColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={ForgotPasswordCss.TextInput}
                onChangeText={this.validateEmail}
              />
              <Text style={ForgotPasswordCss.TextRedError}>
                {this.state.EmailError}
              </Text>
            </View>
            <TouchableOpacity
              style={ForgotPasswordCss.buttonSubmit}
              onPress={this.onSubmit}>
              <Text style={ForgotPasswordCss.SubmitButtontxt}>Submit</Text>
            </TouchableOpacity>
            <View style={ForgotPasswordCss.BackToSignIntxtView}>
              <TouchableOpacity onPress={this.navigateSignIn}>
                <Text style={ForgotPasswordCss.BackToSignIntxt}>
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ForgotPasswordScreen;
