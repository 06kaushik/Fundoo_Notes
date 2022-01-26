import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import {getNotes, setAllCheckBoxValueFalse} from '../Services/NotesServices';
import {useNavigation} from '@react-navigation/native';

export default function PinCard(props) {
  const [notes, setNotes] = useState([]);
  const [displayNoteData, setdisplayNoteData] = useState([]);
  const [PinData, setPinData] = useState(true);
  const [PinData1, setPinData1] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotes().then(res => {
        setNotes(res);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const navigation = useNavigation();
  var labelarr = [];

  const navigateEditScreen = note => {
    setAllCheckBoxValueFalse();
    navigation.navigate('EditNoteScreen', {
      displayNoteData: note._data,
      key: note.id,
      CardBolean: false,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}>
      {notes.map(note => {
        labelarr = note._data.LabelArr;

        let gridView = {
          width: 149,
          borderRadius: 10,
          backgroundColor: note._data.Colour,
        };

        let listView = {
          width: 325,
          borderRadius: 10,
          backgroundColor: 'red',
          backgroundColor: note._data.Colour,
        };
        if (
          note._data.Trash == false &&
          note._data.Archive == false &&
          note._data.Pin == true
        ) {
          return (
            <View key={note.id}>
              <TouchableOpacity onPress={() => navigateEditScreen(note)}>
                <Card containerStyle={props.gridListdata ? gridView : listView}>
                  <Card.Title>{note._data.Title}</Card.Title>
                  <Text>{note._data.Description} </Text>
                  
                  {labelarr.map(labelData => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'lightgrey',
                          borderRadius: 20,
                          justifyContent: 'center',
                          padding: 5,
                          marginRight: 5,
                          marginTop: 7,
                        }}>
                        <Text>{labelData}</Text>
                      </View>
                    );
                  })}
                </Card>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
}
