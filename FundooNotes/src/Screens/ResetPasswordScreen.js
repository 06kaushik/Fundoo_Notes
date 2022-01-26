import React, {Component} from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,} from 'react-native';
import Global from '../css/Global';
import Snackbar from 'react-native-snackbar';
import {updatePassword} from '../Services/UserServices';
import ResetPasswordScreenCss from '../css/ResetPasswordScreenCss';
import {COLOR} from '../Utility/Styling'
import OutlineInput from 'react-native-outline-input'

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password1: '',
      Password2: '',
      passwordError1: '',
      passwordError2: '',
    };
  }

  validatePassword1 = val => {
    this.setState({Password1: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) {
      this.setState({passwordError1: 'invalid password'});
    } else {
      this.setState({passwordError1: ''});
    }
  };

  validatePassword2 = val => {
    this.setState({Password2: val});
    let rjx =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$/;
    let isValid = rjx.test(val);
    if (!isValid) this.setState({passwordError2: 'invalid password'});
    else this.setState({passwordError2: ''});
  };

  onSubmit = async () => {
    let response = await updatePassword(this.state.Password1);
    if (response) {
      Snackbar.show({
        text: 'password update',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
      this.props.navigation.navigate('SignInScreen');
    } else {
      Snackbar.show({
        text: 'password not updated',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'red',
        },
      });
    }
  };

  render() {
    return (
      <View style={ResetPasswordScreenCss.container1}>
        <View style={Global.ImageLabelView}>
          <Image
            source={require('../Assets/images/noteslogo1.png')}
            style={Global.ImageLogo}></Image>
          <Text style={Global.FundooNotestxt}>Fundoo Notes</Text>
        </View>
        <View style={ResetPasswordScreenCss.container2}>
          <View style={ResetPasswordScreenCss.container3}>
            <View>
            <OutlineInput
                label='Password'
                secureTextEntry={true} 
                activeValueColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={ResetPasswordScreenCss.TextInput}
                onChangeText={this.validatePassword1}/>
              <Text style={ResetPasswordScreenCss.regexredError}>
                {this.state.passwordError1}
              </Text>
            </View>
            <View>
            <OutlineInput
                label='Confirm Password'
                // secureTextEntry={true} 
                activeValueColor={COLOR.TEXT_COLOR}
                activeBorderColor={COLOR.TEXT_COLOR}
                passiveBorderColor={COLOR.TEXT_COLOR}
                activeLabelColor={COLOR.TEXT_COLOR}
                style={ResetPasswordScreenCss.TextInput}
                onChangeText={this.validatePassword2}/>
              <Text style={ResetPasswordScreenCss.regexredError}>
                {this.state.passwordError2}
              </Text>
            </View>
            <TouchableOpacity
              style={ResetPasswordScreenCss.buttonResetView}
              onPress={this.onSubmit}>
              <Text>Reset password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default ResetPasswordScreen;
