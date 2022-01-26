import React, {Component} from 'react';
import {TouchableOpacity,View,Image,TextInput,Text,StatusBar} from 'react-native';
import EditeNoteScreenCss, {passcolordata} from '../css/CreateNoteScreenCss';
import { deleteBooleanChipUpdate,EditLabelForEditeLabelScreen1,editNoteDataUpdate,editNoteDataUpdateTimeDate,generateRandomIdData,updateNotificationId} from '../Services/NotesServices';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import AddReminder from '../Component/AddReminder';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import { BORDER, COLOR, FLEX, HEIGHT, MARGIN, PADDING, WIDTH } from '../Utility/Styling';


export default class EditNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', //this.props.navigation.state.params.display,
      description: '',
      color: 'white',
      trash: false,
      pin: false,
      archive: false,
      key: '',
      labelArrData: [],
      updatedLabelTrueFalse: false,
      labelArrayfromLabelArr: [],
      CardBolean1: true,
      isModalVisible: false,
      isDatePickerVisible: false,
      isTime: false,
      formateDate: '',
      formateTime: '',
      timeDateBoolean: false,
      selectedDate: '',
      selectedTime: '',
      timeDateBoolean1: false,
      RandomId1: '',
      RandomId: '',
    };
  }

  //handle archive true false and nevigat dashbord
  handleArchive = () => {
    this.setState({archive: !this.state.archive}, () => {
    });
  };

  handlePin = () => {
    this.setState({pin: !this.state.pin}, () => {
    });
  };

  handleTrash = () => {
    this.setState({trash: !this.state.trash}, () => {
    });
  };

  colorHandler = color => {
    this.setState({color: color});
    console.log('colrrrrrrrrrr', color);
  };

  handleTitle = title => {
    this.setState({
      title: title,
    });
  };

  handleNoteDescription = Description => {
    this.setState({
      description: Description,
    });
  };

  //send data to add into firebase
  backArrow = () => {
    if (this.state.timeDateBoolean == true) {
      this.handleLocalPushNotification();
    }
    if (
      this.state.title != '' &&
      this.state.description != '' &&
      this.state.color != ''
    )
      var response = editNoteDataUpdate(
        this.state.key,
        this.state.title,
        this.state.description,
        this.state.color,
        this.state.trash,
        this.state.pin,
        this.state.archive,
        this.state.labelArrayfromLabelArr,
      );
    this.props.navigation.navigate('DashBoardScreen'); //goBack()
    if (this.state.timeDateBoolean1 == true) {
      editNoteDataUpdateTimeDate(
        this.state.key,
        moment(this.state.selectedDate).format('D MMM'),
        moment(this.state.selectedTime).format('h:mm a'),
        this.state.timeDateBoolean,
      );
    }
  };

  componentDidMount() {
    this.generateRandomId();
    const {displayNoteData, key, searchOpen} = this.props.route.params;

    this.focusListener = this.props.navigation.addListener('focus', () => {
      const {labelArrDataState, labelArrayTrueFalse} = this.props.route.params;
      this.setState({updatedLabelTrueFalse: labelArrayTrueFalse});
      if (labelArrayTrueFalse == true) {
        this.setState({labelArrayfromLabelArr: labelArrDataState});
      } else {
        this.setState({labelArrayfromLabelArr: this.state.labelArrData});
      }
    });

    if (searchOpen) {
      this.setState({
        key: key,
        title: displayNoteData.Title,
        color: displayNoteData.Colour,
        description: displayNoteData.Description,
        pin: displayNoteData.Pin,
        archive: displayNoteData.Archive,
        trash: displayNoteData.Trash,
        labelArrData: displayNoteData.LabelArr,
        formateDate: displayNoteData.Date,
        formateTime: displayNoteData.Time,
        timeDateBoolean: displayNoteData.DateTimeChipBoolean,
        RandomId1: displayNoteData.RandomId,
      });
    } else {
      this.setState({
        key: key,
        title: displayNoteData.Title,
        color: displayNoteData.Colour,
        description: displayNoteData.Description,
        pin: displayNoteData.Pin,
        archive: displayNoteData.Archive,
        trash: displayNoteData.Trash,
        labelArrData: displayNoteData.LabelArr,
        formateDate: displayNoteData.Date,
        formateTime: displayNoteData.Time,
        timeDateBoolean: displayNoteData.DateTimeChipBoolean,
        RandomId1: displayNoteData.RandomId,
      });
    }
  }

  handleNavigateEditeScreen = () => {
    EditLabelForEditeLabelScreen1(this.state.labelArrData);

    setTimeout(() => {
      this.props.navigation.navigate('EditLabelScreen', {
        labelArrData1: this.state.labelArrData,
      });
    }, 60);
  };

  handleLabel = () => {
    setTimeout(() => {
      this.props.navigation.navigate('EditLabelScreen', {
        labelArrData1: this.state.labelArrData,
      });
    }, 70);
  };

  generateRandomId = () => {
    let randomId = generateRandomIdData();
    this.setState({RandomId: randomId}, 
    );
  };

  handleLocalPushNotification = () => {
    updateNotificationId(this.state.key, this.state.RandomId);
    if (this.state.timeDateBoolean1 == true) {
      if (this.state.selectedDate != null && this.state.selectedDate != null) {
        let date = JSON.stringify(this.state.selectedDate).slice(1, 11);
        let time = JSON.stringify(this.state.selectedTime).slice(11, 25);
        let dateShedule = new Date(date + time);
        PushNotification.localNotificationSchedule({
          id: this.state.RandomId,
          channelId: 'test-channel',
          title: this.state.title,
          message: this.state.description,
          date: dateShedule,
        });
      }
    }
  };

  deleteBooleanUpdate = deleteBoolean => {
    PushNotification.cancelLocalNotification({id: this.state.RandomId1});
    this.setState({timeDateBoolean: deleteBoolean}, () =>
      deleteBooleanChipUpdate(this.state.key, this.state.timeDateBoolean),
    );
  };

  render() {
    return (
      <View
        style={{
          height: (HEIGHT.SCREEN_HEIGHT),
          width: (WIDTH.SCREEN_WIDTH),
          backgroundColor: this.state.color,
        }}>
        <StatusBar
          backgroundColor={this.state.color}
          hidden={false}
          barStyle="default"
        />
        <View style={EditeNoteScreenCss.container2}>
          <View>
            <TouchableOpacity onPress={this.backArrow}>
            <Image
                source={require('..//Assets/icons/backArrow.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
                  width:(WIDTH.WIDTH_),
                  tintColor:(COLOR.IMAGE_COLOR),
                  marginLeft:(MARGIN.I_MARGIN)
                }}  />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: (FLEX.FLEX_DIRECTION), marginRight: (MARGIN.MARGIN_RIGHT)}}>
            <View>
              {this.state.pin ? (
                <TouchableOpacity onPress={this.handlePin}>
                  <Image
                source={require('..//Assets/icons/unpin.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
                  width:(WIDTH.WIDTH_),
                  tintColor:(COLOR.IMAGE_COLOR),
                    marginTop:(MARGIN.I_MARGINTOP)
                }}  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.handlePin}>
                  <Image
                source={require('..//Assets/icons/pin.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
                  width:(WIDTH.WIDTH_),
                  tintColor:(COLOR.IMAGE_COLOR),
                    marginTop:(MARGIN.I_MARGINTOP)
                }}  />
                </TouchableOpacity>
              )}
            </View>

            <AddReminder
              colorProps={this.state.color}
              sendDateTime={(date, time, chip) =>
                this.setState({
                  selectedDate: date,
                  selectedTime: time,
                  timeDateBoolean1: chip,
                  timeDateBoolean: chip,
                })
              }
              DeleteTimeLabelBooleanRecieve={this.deleteBooleanUpdate}
            />
            <View style={{marginLeft: (MARGIN.COLOR_LEFT_MARGIN)}}>
              <TouchableOpacity onPress={this.handleArchive}>
              <Image
                source={require('..//Assets/icons/archive.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
                  width:(WIDTH.WIDTH_),
                  tintColor:(COLOR.IMAGE_COLOR),
                }}  />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{top: 11}}>
          <TextInput
            placeholder="Title"
            style={EditeNoteScreenCss.titleinputtxt}
            multiline={true}
            numberOfLines={1}
            maxLength={100}
            onChangeText={this.handleTitle}
            value={this.state.title}
          />
          <TextInput
            multiline={true}
            numberOfLines={1}
            placeholder="Note"
            style={EditeNoteScreenCss.noteinputtext}
            onChangeText={this.handleNoteDescription}
            value={this.state.description}
          />
        </View>
        {this.state.updatedLabelTrueFalse ? (
          <View
            style={{
              flexWrap: (FLEX.FLEX_WRAP),
              marginLeft: 12,
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginRight: (MARGIN.IMAGE_MARGIN),
            }}>
            {this.state.labelArrayfromLabelArr.map(labelData => {
              return (
                <View key={labelData.id}>
                  <TouchableOpacity
                    onPress={this.handleNavigateEditeScreen}
                    style={{
                      backgroundColor: (COLOR.IMAGE_COLOR),
                      borderRadius: (BORDER.BORDER_RADIUS),
                      justifyContent: (BORDER.BORDER_RADIUS),
                      padding: (PADDING.L),
                      marginRight: (MARGIN.I_MARGIN),
                      marginTop: (MARGIN.I_MARGIN),
                    }}>
                    <Text>{labelData}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              flexWrap: (FLEX.FLEX_WRAP),
              marginLeft: (MARGIN.E_MARGIN),
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginRight: (MARGIN.IMAGE_MARGIN),
            }}>
            <View>
              {this.state.timeDateBoolean ? (
                <View
                  style={{
                    marginBottom: (MARGIN.M_BOTTOM),
                    backgroundColor: (COLOR.LABEL_COLOR),
                    height: (HEIGHT.LABEL_HEIGHT),
                    borderRadius: (BORDER.LABEL_RADIUS),
                    justifyContent: (BORDER.JUSTIFY_CONTENT),
                    marginTop: (MARGIN.I_MARGIN),
                    marginRight: (MARGIN.R_MARGIN),
                  }}>
                  {this.state.timeDateBoolean1 ? (
                    <Text>
                      {moment(this.state.selectedDate).format('D MMM')},
                      {moment(this.state.selectedTime).format('h:mm a')}
                    </Text>
                  ) : (
                    <Text>
                      {this.state.formateDate},{this.state.formateTime}
                    </Text>
                  )}
                </View>
              ) : null}
            </View>

            {this.state.labelArrData.map(labelData => {
              return (
                <View key={labelData.id}>
                  <TouchableOpacity
                    onPress={this.handleNavigateEditeScreen}
                    style={{
                      backgroundColor: (COLOR.LABEL_COLOR),
                      borderRadius: (BORDER.BORDER_RADIUS),
                      justifyContent: (BORDER.JUSTIFY_CONTENT),
                      padding: (PADDING.L_PADDING),
                      marginRight: (MARGIN.I_MARGIN),
                      marginTop: (MARGIN.I_MARGIN),
                    }}>
                    <Text>{labelData}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <View style={EditeNoteScreenCss.footerContainer}>
          <View style={EditeNoteScreenCss.footer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.RBSheet.open()}>
                <Image
                  style={EditeNoteScreenCss.addcolour}
                  source={require('..//Assets/icons/color.png')}
                />
              </TouchableOpacity>
            </View>
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={140}
              openDuration={1}>
              <ColorChager colorDataProps={this.colorHandler} />
            </RBSheet>
            <View>
              <TouchableOpacity onPress={() => this.RBSheetMore.open()}>
                <Image
                  style={EditeNoteScreenCss.threedotmenue}
                  source={require('..//Assets/icons/threedotmenue.png')}
                />
              </TouchableOpacity>
            </View>
            <RBSheet
              ref={ref => {
                this.RBSheetMore = ref;
              }}
              height={130}
              duration={1}>
              <TouchableOpacity onPress={this.handleTrash}>
                <View style={{flexDirection: 'row', height: 45}}>
                <Image
                source={require('..//Assets/icons/delete.png')}
                style={{
                    height:20,
                    width:20,
                    tintColor:'grey',
                    marginTop:15,
                    marginLeft:5
                }}  />
                  <Text style={{top: 15, marginLeft: 20}}>Delete</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleLabel}>
                <View style={{flexDirection: 'row', height: 45}}>
                <Image
                source={require('..//Assets/icons/label.png')}
                style={{
                    height:20,
                    width:20,
                    tintColor:'grey',
                    marginTop:15,
                    marginLeft:5
                }}  />
                  <Text style={{top: 15, marginLeft: 20}}>Label</Text>
                </View>
              </TouchableOpacity>
            </RBSheet>
          </View>
        </View>
      </View>
    );
  }
}
