import React, {Component} from 'react';
import {TouchableOpacity, View,Image, TextInput,Text,StatusBar} from 'react-native';
import EditeNoteScreenCss from '../css/CreateNoteScreenCss';
import {generateRandomIdData,noteData} from '../Services/NotesServices';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ColorChager from '../Component/Color';
import moment from 'moment';
import AddReminder from '../Component/AddReminder';
import PushNotification from 'react-native-push-notification';
import { BORDER, COLOR, FLEX, HEIGHT, MARGIN, PADDING, WIDTH } from '../Utility/Styling';



export default class CreateNoteScreen extends Component {
  constructor(props) {
    super(props);
    
  this.state = {
      title: '',
      description: '',
      color: 'white',
      trash: false,
      pin: false,
      archive: false,
      labelDataArr: [],
      doll: [],
      onLoad: false,
      onLoad11: false,
      isModalVisible: false,
      isDatePickerVisible: false,
      isTime: false,
      currrentDate: '',
      selectedDate: '',
      selectedTime: '',
      dateTimeChipBoolean: false,
      momentFormateDate: '',
      momentFormateTime: '',
      RandomId: '',
    };
  }
  handleLabel = () => {
    this.props.navigation.navigate('LabelScreen');
  };

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
  backArrow = async addLabelDataArr => {
    if (this.state.dateTimeChipBoolean == true) {
      this.handleLocalPushNotification();
    }

    if (
      this.state.title != '' &&
      this.state.description != '' &&
      this.state.color != ''
    ) {
      var response = await noteData(
        this.state.title,
        this.state.description,
        this.state.color,
        this.state.trash,
        this.state.pin,
        this.state.archive,
        this.state.labelDataArr,
        moment(this.state.selectedDate).format('D MMM'),
        moment(this.state.selectedTime).format('h:mm a'),
        this.state.dateTimeChipBoolean,
        this.state.RandomId,
      );
    }
    if (response == 'success') {
      Snackbar.show({
        text: 'note added!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'CLOSE',
          textColor: 'green',
        },
      });
      this.props.navigation.navigate('DashBoardScreen');
    } else {
      Snackbar.show({
        text: 'note is not added!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'CLOSE',
          textColor: 'green',
        },
      });
    }
  };

  componentDidUpdate() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const {LabbelArr} = this.props.route.params;
      this.setState({labelDataArr: LabbelArr});
    });
  }

  componentDidMount = () => {
    this.generateRandomId();
  };

  generateRandomId = () => {
    let randomId = generateRandomIdData();
    this.setState({RandomId: randomId});
  };

  handleLocalPushNotification = () => {
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
  };

  render() {
    var addLabelDataArr = [];

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
          barStyle="dark-content"
        />
        <View style={EditeNoteScreenCss.container2}>
          <View>
            <TouchableOpacity
              onPress={event => this.backArrow(addLabelDataArr)}>
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
                  dateTimeChipBoolean: chip,
                })
              }
            />
            <View style={{marginLeft: 22}}>
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
            placeholderTextColor= {COLOR.PLACE_HOLDER_COLOR}
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
            placeholderTextColor= {COLOR.PLACE_HOLDER_COLOR}
            style={EditeNoteScreenCss.noteinputtext}
            onChangeText={this.handleNoteDescription}
          />
        </View>
        <View
          style={{
            flexWrap: (FLEX.FLEX_WRAP),
            marginLeft: 10,
            flexDirection: (FLEX.FLEX_DIRECTION),
          }}
          key={this.state.labelDataArr.id}>
          <View>
            {this.state.dateTimeChipBoolean ? (
              <View
                style={{
                  marginBottom: (MARGIN.LABEL_MARGIN_TOP),
                  backgroundColor: (COLOR.LABEL_COLOR),
                  height: (HEIGHT.LABEL_HEIGHT),
                  width: (WIDTH.LABEL_WIDTH),
                  borderRadius: (BORDER.LABEL_RADIUS),
                  justifyContent: (BORDER.JUSTIFY_CONTENT),
                  marginRight: (MARGIN.IMAGE_MARGIN),
                }}>
                <Text>
                  {moment(this.state.selectedDate).format('D MMM') +
                    ',' +
                    moment(this.state.selectedTime).format('h:mm a')}
                </Text>
              </View>
            ) : null}
          </View>
          {this.state.labelDataArr.map(labelData => {
            return (
              <View key={labelData.id}>
                <TouchableOpacity
                  style={{
                    backgroundColor: (COLOR.LABEL_COLOR),
                    borderRadius: (BORDER.BORDER_RADIUS),
                    justifyContent: (BORDER.JUSTIFY_CONTENT),
                    padding: (PADDING.L_PADDING),
                    marginRight: (MARGIN.I_MARGIN),
                    marginBottom: (MARGIN.LABEL_MARGIN_TOP),
                  }}>
                  <Text>{labelData}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={EditeNoteScreenCss.footerContainer}>
          <View style={EditeNoteScreenCss.footer}>
            <View style={{flexDirection: (FLEX.FLEX_DIRECTION)}}>
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
                <View style={{flexDirection:(FLEX.FLEX_DIRECTION), height: (HEIGHT.D_HEIGHT)}}>
                <Image
            source={require('..//Assets/icons/delete.png')}
            style={{
                height:(HEIGHT.IMAGE_HEIGHT),
                width:(WIDTH.IMAGE_WIDTH),
                tintColor:(COLOR.IMAGE_COLOR),
                marginTop:(MARGIN.IMAGE_MARGIN_TOP),
                marginLeft:(MARGIN.I_MARGIN)
            }}  />
                  <Text style={{top: (MARGIN.TOP), marginLeft: (MARGIN.MARGIN_LEFT)}}>Delete</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleLabel}>
                <View style={{flexDirection: (FLEX.FLEX_DIRECTION), height: (HEIGHT.L_HEIGHT)}}>
                <Image
            source={require('..//Assets/icons/label.png')}
            style={{
                height:(HEIGHT.IMAGE_HEIGHT),
                width:(WIDTH.IMAGE_WIDTH),
                tintColor:(COLOR.IMAGE_COLOR),
                marginTop:(MARGIN.IMAGE_MARGIN_TOP),
                marginLeft:(MARGIN.I_MARGIN)
            }}  />
                  <Text style={{top: (MARGIN.TOP), marginLeft: (MARGIN.MARGIN_LEFT)}}>Label</Text>
                </View>
              </TouchableOpacity>
            </RBSheet>
          </View>
        </View>
      </View>
    );
  }
}
