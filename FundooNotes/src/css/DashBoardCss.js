import {StyleSheet} from 'react-native';
const DashBoardCss = StyleSheet.create({
  container1: {
    //flex:1,
    height: '100%',
    width: '100%',
  },

  header: {
    //flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  card: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
  },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  menueImg: {
    height: 25,
    width: 25,
  },
  menueImgview: {
    marginRight: 25,
    marginTop:3
  },

  listImg: {
    height: 25,
    width: 25,
  },
  listImgview:{
    marginRight: 20,
    marginTop:4
  },

  profileImg: {
    height: 30,
    width: 30,
    borderRadius:20  
  },

  listprofileview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  footer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 50,
    height: 50,
    alignItems: 'center',
  },

  checkBoxrushMicImg: {
    marginLeft: 14,
  },
  brushImg: {
    height: 24,
    width: 24,
    marginLeft: 24,
  },

  micImg: {
    height: 24,
    width: 24,
    marginLeft: 24,
  },

  Img: {
    height: 24,
    width: 24,
    marginLeft: 24,
  },
  plusView: {
    // flex:1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 10,
    borderRadius: 100,
    width: 67,
    height: 67,
    bottom: '50%',
    right: '7%',
    position: 'absolute',
    //borderBottomWidth:3,
  },
  Touchablestyle: {
    borderRadius: 100,
    height: 55,
    width: 55,
    borderColor: '#ffffff',
    borderWidth: 5,
    alignSelf: 'center',
    elevation: 7,
    backgroundColor: '#ffffff',
    // position: 'absolute',
  },
  plusImg: {
    width: 45,
    height: 45,
    //alignSelf:'center'
  },
});

export default DashBoardCss;
