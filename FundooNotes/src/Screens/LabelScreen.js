import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import LabelCss from '../css/LabelScreenCss';
import CheckBox from '@react-native-community/checkbox';
import {addLabel,getLabel,updateCheck} from '../Services/NotesServices';
import { COLOR, FLEX } from '../Utility/Styling';


export default function LabelScreen({props, route, navigation}) {

  const [labelText, setlabelText] = useState('');
  const [labelArray, setlabelArray] = useState([]);
  const [checked, setChecked] = useState(false);
  const [LabbelArr, setLabbelArr] = useState([]);
  const [labelArrDataState, setlabelArrDataState] = useState([]);

  var addLabelIntoFirbase = async () => {
    let LabelResponse = await addLabel(labelText, checked);
    getLabel().then(res => {
      setlabelArray(res);
    });
  };

  var labelForCreateScreen = () => {
    let filterLabelArray = [];
    labelArray.map(filterlabel => {
      if (filterlabel._data.CheckBox === true) {
        filterLabelArray.push(filterlabel._data.Label);
      }
    });
   
    navigation.navigate('CreateNoteScreen', {LabbelArr: filterLabelArray});
  };

  const updadateidvalue = (id, newValue) => {
    updateCheck(id, newValue);
    getLabel().then(res => {
    setlabelArray(res);
    });
  };

  useEffect(() => {
    getLabel().then(res => {
    setlabelArray(res);
    });
  }, []);

 
  return (
    <View style={LabelCss.container1}>
      <View style={LabelCss.container2}>
        <View style={LabelCss.arrowinputlabel}>
          <TouchableOpacity onPress={labelForCreateScreen}>
            <Image
              style={LabelCss.arrowpic}
              source={require('../Assets/icons/backArrow.png')}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Enter label name"
            placeholderTextColor= {COLOR.PLACE_HOLDER_COLOR}
            style={LabelCss.TextInput}
            onChangeText={text => setlabelText(text)}
          />
        </View>
        <View style={LabelCss.plusview}>
          <TouchableOpacity
            onPress={() => {
              addLabelIntoFirbase();
            }}>
            <Image
              style={LabelCss.plusImage}
              source={require('../Assets/icons/plus2.png')}
            />
          </TouchableOpacity>
          <Text style={LabelCss.createtxt}>Create "{labelText}"</Text>
        </View>
        <View
          style={{
            flex: (FLEX.FLEX_),
            flexWrap: (FLEX.FLEX_WRAP),
          }}>
          {labelArray.map(label => {
            return (
              <View key={label.id} style={LabelCss.labeltxtcheckView}>
                <Image
                  style={LabelCss.labelpic}
                  source={require('../Assets/icons/label1.png')}
                />
                <Text style={LabelCss.labelpriority}>{label._data.Label}</Text>
                <CheckBox
                  style={{marginLeft: 170}}
                  disabled={false}
                  value={label._data.CheckBox}
                  onValueChange={newValue => {
                    updadateidvalue(label.id, newValue);
                    setChecked({...checked, [label.id]: newValue});
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
