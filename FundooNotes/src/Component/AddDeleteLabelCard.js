import React from 'react';
import {TextInput, View, TouchableOpacity, StyleSheet,Image} from 'react-native';
import {deleteLabel, updateLabel} from '../Services/NotesServices';


const AdditeDeleteLabelCard = props => {
  const [Label, setLabelData] = React.useState(props.Label);
  const [isEdit, setIsEdit] = React.useState(true);

  // function for delete note
  const onDeleteButton = () => {
    setIsEdit(true);
    const labelId = props.labelId;
    deleteLabel(labelId).then(() => {
      props.fetchData();
    });
  };

  //function for edit label
  const labelOperation = () => {
    const LabelData = {Label};
    const labelId = props.labelId;
    updateLabel(LabelData, labelId).then(() => {
      props.fetchData();
    });
  };
  const onCheckButton = async () => {
    setIsEdit(true);
    labelOperation();
  };

  return (
    <View>
      <View>
        <View style={{flexDirection: 'row'}}>
          {isEdit ? (
           <Image
           source={require('..//Assets/icons/label.png')}
           style={{
               height:25,
               width:25,
               tintColor:'grey',
               marginLeft:12,
               marginTop:12
           }}  />
          ) : null}
          <TouchableOpacity onPress={onDeleteButton}>
            {!isEdit ? (
              <Image
              source={require('..//Assets/icons/delete.png')}
              style={{
                  height:25,
                  width:25,
                  tintColor:'grey',
                  marginLeft:12,
               marginTop:12
                  
              }}  />
            ) : null}
          </TouchableOpacity>
          <View style={{width: '35%'}}>
            <TextInput
              style={{fontSize: 20, marginLeft: '17%', width: 250}}
              value={Label}
              onChangeText={value => setLabelData(value)}
            />
          </View>
          <View style={styles.check}>
            <TouchableOpacity onPress={() => setIsEdit(false)}>
              {isEdit ? (
                <Image
                source={require('..//Assets/icons/edit.png')}
                style={{
                    height:25,
                    width:25,
                    tintColor:'grey',
                    marginTop:6
                }}  />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onCheckButton}>
              {!isEdit ? <Image
                source={require('..//Assets/icons/tick.png')}
                style={{
                    height:25,
                    width:25,
                    tintColor:'grey',
               marginTop:12,
               marginTop:6
                }}  /> : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  check: {
    padding: 10,
    marginLeft: '38%',
  },
  textInput: {
    width: '100%',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});

export default AdditeDeleteLabelCard;
