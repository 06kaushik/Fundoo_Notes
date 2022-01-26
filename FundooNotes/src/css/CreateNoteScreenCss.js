import {StyleSheet} from 'react-native';
import {COLOR} from '../Utility/Styling'


//import { Button } from 'react-native-elements/dist/buttons/Button';

// export function passcolordata(color){
// var color1=color
// console.log('ccccccccccccccccccc',color1)

// }

const EditeNoteScreenCss = StyleSheet.create({
  // container1:{
  // height:'100%',
  // width:'100%',
  // //backgroundColor:color1
  // },
  container2: {
    flexDirection: 'row',
    marginVertical: 20,
    height: 30,
    justifyContent: 'space-between',
  },
  backArrowpic: {
    marginLeft: 14,
  },
  pinpic: {
    height: 25,
    width: 25,
    //marginLeft:219
  },
  reminderpluspic: {
    height: 25,
    width: 25,
    // left:240
    //  marginLeft:22
  },
  archivepic: {
    height: 25,
    width: 25,
    // marginLeft:22
  },
  deletepic: {
    height: 20,
    width: 20,
    margin: 15,
  },
  lebelpic: {
    height: 20,
    width: 25,
    marginLeft: 15,
  },
  titleinputtxt: {
    // height:45,
    fontSize: 22,
    width: '100%',
    paddingLeft: 16,
    color:(COLOR.TEXT_COLOR)
  },
  noteinputtext: {
    // height:40,
    fontSize: 15,
    width: '100%',
    paddingLeft: 16,
    color:(COLOR.TEXT_COLOR)
  },
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  footer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addfeaturemenue: {
    height: 20,
    width: 20,
    marginLeft: 14,
    marginTop:2
  },
  addcolour: {
    height: 25,
    width: 25,
    marginLeft: 22,
    marginTop:2
  },
  threedotmenue: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  watchImg: {
    height: 25,
    width: 25,
  },
  imageView: {
    margin: 10,
    flexDirection: 'row',
  },
});

export default EditeNoteScreenCss;
