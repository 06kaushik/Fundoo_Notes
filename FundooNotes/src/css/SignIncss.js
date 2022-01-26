import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container1: {
    // width: '100%',
    height: '100%',
    backgroundColor:'white',
    // flex: 1,
  },
  container2: {
    width: '80%',
    height: '100%',
    marginRight: '10%',
    marginLeft: '10%',
    justifyContent: 'center',
    marginBottom: 135,
  },
  container3: {
    // justifyContent: 'space-between',
    height: '80%',
   //height:500,
   // backgroundColor:'red'
  },
  TextInput: {
    // borderWidth: 1,
    // borderColor: 'gray',
    // height: 50,
    // borderRadius: 10,
    // paddingLeft: 17,
    
  },

  Forgottxt: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#ffa500',
    bottom: 10,
  },
  accountSignUpView: {
    flexDirection: 'row',
    top: 10,
    // marginBottom:135
  },
  accounttxt: {
    paddingLeft: '15%',
  },
  SignUptxt: {
    paddingLeft: '2%',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#ffa500',
  },

  regexredError: {
    color: 'red',
    height: 55,
    top: 4,
  },

  buttonSignInView: {
    backgroundColor: '#ffa500',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignIntxt: {
    fontSize: 17,
  },
  GoolebuttonSignInView: {
    marginTop: 25,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
  },
  facebookButtonView: {
    marginTop: 25,
    backgroundColor: '#4267B2',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
    //marginBottom:120
  },
  GooleSignIntxt: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  facebookSignIntxt: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  GoogleImg: {
    height: 30,
    width: 30,
  },
});

export default styles;
