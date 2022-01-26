import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image,ScrollView, StatusBar} from 'react-native';
import DashBoardCss from '../css/DashBoardCss';
import DashboardCard from '../Component/NoteCard';
import Profile from '../Component/TopBar';
import { setAllCheckBoxValueFalse} from '../Services/NotesServices';
import {COLOR, MARGIN} from '../Utility/Styling'
// import  PinCard from '../Component/PinCard'


class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchText: '',
      filterSearch: false,
      notesdata: [],
      filterArray: [],
      note: [],
      isSearching: false,
      searchText: '',
      note: [],
      filterArr: [],
      userprofile: 'https://www.w3schools.com/howto/img_avatar.png',
      imageUrlProps: 'https://www.w3schools.com/howto/img_avatar.png',
      avtarImage: 'https://www.w3schools.com/howto/img_avatar.png',
      userprofileData: null,
      userprofileCop: '',
      pinDataBoolean: true,
      firstIf: false,
    };
  }

  navigateCreateNOteScreen = () => {
    setAllCheckBoxValueFalse();
    this.props.navigation.navigate('CreateNoteScreen');
  };

  async componentDidMount() {

    let asyimage = await AsyncStorage.getItem('userImage');
    this.setState({userprofile: asyimage});
  }

  handleProfiledata = imgurl => {
    this.setState({userprofile: imgurl});
  };

  handleGrideData = data => {
    this.setState({
      open: data,
    });
  };
  render() {
    return (
      <View style={DashBoardCss.container1}>
        <StatusBar
          backgroundColor= {COLOR.BACKGROUND}
          hidden={false}
          barStyle="dark-content"/>
        <Profile ListData={this.handleGrideData} />
        <ScrollView style={{marginBottom: (MARGIN.MARGIN_BOTTTOM)}}>
          <DashboardCard
            gridListdata={this.state.open}
            seachNoteData={this.state.searchText}
          />
        </ScrollView>
        <View style={DashBoardCss.footerContainer}>
          <View style={DashBoardCss.footer}>
            <View style={DashBoardCss.checkBoxrushMicImg}>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={DashBoardCss.plusView}>
              <TouchableOpacity
                style={DashBoardCss.Touchablestyle}
                onPress={this.navigateCreateNOteScreen}>
                <Image
                  style={DashBoardCss.plusImg}
                  source={require('../Assets/icons/add.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DashBoardScreen;
