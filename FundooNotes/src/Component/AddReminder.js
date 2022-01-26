import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-paper';
import moment from 'moment';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import EditeNoteScreenCss from '../css/CreateNoteScreenCss';
import { BORDER, COLOR, FLEX, HEIGHT, IMAGES, MARGIN, STYLE, WIDTH } from '../Utility/Styling';


export default class AddReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isDatePickerVisible: false,
      isTime: false,
      currrentDate: '',
      selectedDate: new Date(),
      selectedTime: new Date(moment().add(3, 'h')),
      chipBoolean: true,
      color: 'white',
      morningTime: '',
      eveningTime: '',
      deleteTimeLabelBoolean:false
    };
  }
  handleDeleteLabel=()=>{
  this.setState({deleteTimeLabelBoolean:false},()=>this.props.DeleteTimeLabelBooleanRecieve(this.state.deleteTimeLabelBoolean))
  this.setState({isModalVisible: false});
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleSave = () => {
    this.props.sendDateTime(
      this.state.selectedDate,
      this.state.selectedTime,
      this.state.chipBoolean,
    );

    this.toggleModal();
  };

  componentDidMount(){
    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD'); // for specific format
    var timeAndlabel1 = moment(tomorrow).add(8, 'h').format('h:mm a');
    var timeAndlebel2 = moment(tomorrow).add(18, 'h').format('h:mm a');
    this.setState({morningTime: timeAndlabel1, eveningTime: timeAndlebel2});
     
     var dateLabel = tomorrow//"2021-10-07";
var timeLabel = "12:00";

var timeAndDate = moment(dateLabel).startOf(timeLabel);
  let date11 = JSON.stringify(timeAndDate).slice(1, 11);
 let time11 = JSON.stringify(timeAndDate).slice(11, 25);
 let dateShedule = new Date(date11 + time11); }
   
 
  render() {
    return (
      <View>
        <View style={{marginLeft: (MARGIN.MARGIN_LEFTT)}}>
          <TouchableOpacity onPress={() => this.RBSheetReminder.open()}>
           <Image
            source={require('..//Assets/icons/reminderplus.png')}
            style={{
                height:(HEIGHT.HEIGHT_),
                width:(WIDTH.WIDTH_),
                tintColor:(COLOR.IMAGE_COLOR)
            }}  />
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={ref => {
            this.RBSheetReminder = ref;
          }}
          height={HEIGHT.RB_HEIGHT}
          customStyles={{
            container: {
              backgroundColor: this.props.colorProps,
            },
          }}>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  justifyContent: (STYLE.JUSTIFY_CONTENT),
                  flexDirection: (FLEX.FLEX_DIRECTION),
                }}>
                <View style={EditeNoteScreenCss.imageView}>
                  <Image
                    style={EditeNoteScreenCss.watchImg}
                    source={require('..//Assets/icons/watch1.png')}
                  />
                  <Text style={{marginLeft: (MARGIN.R_LEFTMARGIN)}}>Tomorrow morning</Text>
                </View>
                <Text style={{marginRight: (MARGIN.MARGIN_RIGHT), marginTop: (MARGIN.M_TOP)}}>{this.state.morningTime}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  justifyContent: (STYLE.JUSTIFY_CONTENT),
                  flexDirection: (FLEX.FLEX_DIRECTION),
                }}>
                <View style={EditeNoteScreenCss.imageView}>
                  <Image
                    style={EditeNoteScreenCss.watchImg}
                    source={require('..//Assets/icons/watch1.png')}
                  />
                  <Text style={{marginLeft: (MARGIN.R_LEFTMARGIN)}}>Tomorrow Evening</Text>
                </View>
                <Text style={{marginRight: (MARGIN.MARGIN_RIGHT), marginTop: (MARGIN.M_TOP)}}>{this.state.eveningTime}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.toggleModal}>
              <View style={EditeNoteScreenCss.imageView}>
                <Image
                  style={EditeNoteScreenCss.watchImg}
                  source={require('..//Assets/icons/watch1.png')}
                />
                <Text style={{marginLeft: 30}}>Choose a date & time</Text>
              </View>
            </TouchableOpacity>
          </View>
        </RBSheet>

        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              backgroundColor: (COLOR.BACKGROUND),
              borderRadius: (BORDER.R_RADIUS),
              //alignItems: 'center',
            }}>
            <View style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}>
              <Text style={{fontSize: 24, marginTop: 15}}>Add reminder</Text>
              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => this.setState({isDatePickerVisible: true})}>
                  <Text>
                    {moment(this.state.selectedDate).format('D MMMM')}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                // onConfirm={this.handleDate}
                onConfirm={date =>
                  this.setState({
                    selectedDate: date,
                    isDatePickerVisible: false,
                  })
                }
                onCancel={() => this.setState({isDatePickerVisible: false})}
              />

              <View
                style={{
                  backgroundColor: (COLOR.R_COLOR),
                  height: 1,
                  width: (WIDTH.SCREEN_WIDTH),
                  marginTop: (MARGIN.M_TOP),
                }}></View>
              <View style={{marginTop: (MARGIN.TOP)}}>
                <TouchableOpacity onPress={() => this.setState({isTime: true})}>
                  <Text>
                    {moment(this.state.selectedTime).format('h:mm a')}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={this.state.isTime}
                mode="time"
                onConfirm={time => {
                  this.setState({selectedTime: time, isTime: false});
                }}
                onCancel={() => this.setState({isTime: false})}
              />
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Button
                  uppercase={false}
                  style={{marginTop: 40, marginLeft: '15%', width: '30%'}}
                  mode="text"
                  onPress={this.handleDeleteLabel}>
                  <Text style={{color: 'blue'}}>Delete</Text>
                 </Button>

                <Button
                  uppercase={false}
                  style={{marginTop: 40, marginLeft: '-5%', width: '30%'}}
                  mode="text"
                  onPress={this.toggleModal}>
                  <Text style={{color: 'blue'}}>Cancel</Text>
                </Button>
                
                <Button
                  uppercase={false}
                  style={{
                    marginTop: 40,
                    marginLeft: '1%',
                    width: '30%',
                    backgroundColor: 'blue',
                    borderRadius: 20,
                  }}
                  mode="contained"
                  onPress={this.handleSave}>
                  <Text>Save</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
