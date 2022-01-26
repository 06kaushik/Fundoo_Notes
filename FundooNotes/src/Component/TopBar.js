import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import {Storage} from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import {handleProfileUpdate} from '../Services/NotesServices';
import DashBoardCss from '../css/DashBoardCss';
import {Card} from 'react-native-elements';
import Modal from 'react-native-modal';
import ArchiveCss from '../css/ArchiveScreenCss';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useLocalisation from '../Localisation/useLocalisation';


export default function Profile(props) {
  const navigation = useNavigation();

  const [asyncEmail, setasyncEmail] = useState('');
  const [asyncFirstName, setasyncFirstName] = useState('');
  const [asyncLastName, setasyncLastName] = useState('');
  const [profileId, setprofileId] = useState('');
  const [image, setImage] = useState('');
  const [avtarImage, setAvtarImage] = useState(
    'https://www.w3schools.com/howto/img_avatar.png',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [propsImage, setPropsImage] = useState(
    'https://www.w3schools.com/howto/img_avatar.png',
  );
  // const[avtarImage,setavtarImage]=useState('https://www.w3schools.com/howto/img_avatar.png')
  const [open, setopen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [checkGoogle, setcheckGoogle] = useState('');

  const removeAsyncStorage = () => {
    setModalVisible(!isModalVisible);
    AsyncStorage.clear();

    googleSignout();

    navigation.navigate('SignInScreen');
  };
  //--------------
  googleSignout = async () => {
    // var checkGoogle =await AsyncStorage.getItem('googleCheck')
    if (checkGoogle == 'true') {
      try {
        await GoogleSignin.signOut().then(function () {
          Alert.alert('Signout Succesful');
        });
        // this.setState({user: null}); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
      auth().signOut();
    }
  };

  const firstNameLastName = async emailData => {
    if (emailData != '') {
      await firestore()
        .collection('Users')
        // Filter results
        .where('Emial', '==', emailData)
        .get()
        .then(data => {
          data.docs.forEach(async doc => {
            var docdata = doc.exists;
            setasyncFirstName(doc._data.firstName);
            setasyncLastName(doc._data.lastName);
            // console.log('5555555555555', doc._data.lastName);
            //console.log('66666666666', doc._data.lastName);
          });
        })
        .catch(error => {
          console.log('something went wrong', error);
        });
    }
  };

  //------------

  useEffect(async () => {
    var asyncEmailValue = await AsyncStorage.getItem('Email');
    firstNameLastName(asyncEmailValue);
    var asyncEmailValue = await AsyncStorage.getItem('Email');
    var asyncFirstName = await AsyncStorage.getItem('firstName');
    var asyncLastName = await AsyncStorage.getItem('lastName');
    var checkGoogle = await AsyncStorage.getItem('googleCheck');

    // console.log('profilefirsttttttttttttt',);
    setcheckGoogle(checkGoogle);
    setasyncEmail(asyncEmailValue);
    setasyncFirstName(asyncFirstName);
    setasyncLastName(asyncLastName);
  }, [navigation]);

  const choosePhotoFromLibrary = () => {
    // console.log('choosePhotoFromLibrary........');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const takePhotoFromCamera = () => {
    // console.log('takePhotoFromCamerajfjjjjjjjjj');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const getUserProfileImage = async () => {
    var asyncemail = await AsyncStorage.getItem('Email');
    // console.log('asyncemailllllllllll', asyncemail);
    const currentUser = await firestore()
      .collection('profile')
      .where('Email', '==', asyncemail)
      .get()
      .then(data => {
        data.docs.forEach(doc => {
          var docdata = doc.exists;

          setUserData(doc.data());
          setImage(doc.data().Image);
          let profileuser = doc.data().Image;
          let asyncset = AsyncStorage.setItem('userImage', profileuser);

          setprofileId(doc.id);
        });
      });
  };

  useEffect(() => {
    getUserProfileImage();
  }, []);

  const handleUpdate = async url => {
    handleProfileUpdate(url, profileId);
  };

  
  const handlesearch = () => {
    navigation.navigate('SearchScreen');
  };

  const gridView = () => {
    // console.log('revertttttttttt');
    let check = !open;
    props.ListData(check);
    setopen(check);
  };

  const refRBSheetProfile = useRef();
  const dictonary = useLocalisation('EN')
  return (
    <View>
      <View style={DashBoardCss.header}>
        <Card containerStyle={DashBoardCss.card}>
          <View style={DashBoardCss.navBar}>
            <View style={{flexDirection: 'row'}}>
              <View style={DashBoardCss.menueImgview}>
              <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
                <Image
            source={require('../Assets/icons/menu.png')}
            style={{
                height:25,
                width:25,
                tintColor:'grey'
            }}  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={handlesearch}>
                  <Text style={{marginLeft:18,marginTop:6}}>Search your notes</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={DashBoardCss.listprofileview}>
              {open ? (
                <View style={DashBoardCss.listImgview}>
                  <TouchableOpacity onPress={() => gridView()}>
                  <Image style={ArchiveCss.listImg}  source={require('../Assets/icons/grid.png')}/>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={DashBoardCss.listImgview}>
                  <TouchableOpacity onPress={() => gridView()}>
                  <Image style={ArchiveCss.listImg}  source={require('../Assets/icons/list.png')}/>
                  </TouchableOpacity>
                </View>
              )}

              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!isModalVisible)}>
                  <Image
                    style={DashBoardCss.profileImg}
                    source={{
                      uri: image ? image : avtarImage,
                    }}
                  />
                </TouchableOpacity>
                <Modal isVisible={isModalVisible}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      height: '40%',
                      borderRadius: 10,
                    }}>
                    <View style={{marginLeft: 20}}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!isModalVisible)}>
                       <Image
            source={require('../Assets/icons/close.png')}
            style={{
                height:25,
                width:25,
                tintColor:'grey',
                marginTop:7
                
            }}  />
                      </TouchableOpacity>
                      <Avatar
                        style={{height: 35, width: 35, marginTop: 18}}
                        rounded
                        source={{
                          uri: image ? image : avtarImage,
                        }}
                      />
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 20}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          marginLeft: 40,
                          marginTop:9,
                          color: 'crimson',
                        }}>
                        Fundoo Notes
                      </Text>
                      <Text style={{fontWeight: 'bold', marginTop:14}}>
                        {asyncFirstName} {asyncLastName}
                      </Text>
                      <Text>{asyncEmail}</Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffa500',
                          height: 35,
                          width: 230,
                          marginTop: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{fontSize: 17}}
                          onPress={removeAsyncStorage}>
                          Logout
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={takePhotoFromCamera}
                        style={{
                          backgroundColor: '#ffa500',
                          height: 35,
                          width: 230,
                          marginTop: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 17}}>Take photo</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={choosePhotoFromLibrary}
                        style={{
                          backgroundColor: '#ffa500',
                          height: 35,
                          width: 230,
                          marginTop: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 17}}>choose from library</Text>
                      </TouchableOpacity>
                     
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {}
    </View>
  );
}
