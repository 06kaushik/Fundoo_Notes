import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import {getNotes, setAllCheckBoxValueFalse} from '../Services/NotesServices';
import {useNavigation} from '@react-navigation/native';
import { BORDER, FLEX, FONT, MARGIN, PADDING, WIDTH } from '../Utility/Styling';

export default function DeleteCard(props) {
  const [notes, setNotes] = useState([]);
  const [displayNoteData, setdisplayNoteData] = useState([]);

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
        flex: (FLEX.FLEX_),
        flexWrap: (FLEX.FLEX_WRAP),
        flexDirection: (FLEX.FLEX_DIRECTION),
      }}>
      {notes.map(note => {
        labelarr = note._data.LabelArr;
        let gridView = {
          width: (WIDTH.GRID_WIDTH),
          borderRadius: (BORDER.R_RADIUS),
          backgroundColor: note._data.Colour,
        };
        let listView = {
          width: (WIDTH.LIST_WIDTH),
          borderRadius: (BORDER.R_RADIUS),
          backgroundColor: note._data.Colour,
        };
        if(note._data.Trash == true && note._data.Archive == false&& note._data.Pin == false) 
        {
          return (
            <View key={note.id}>
              <TouchableOpacity onPress={() => navigateEditScreen(note)}>
                <Card containerStyle={props.gridListdata ? gridView : listView}>
                <Text style={{fontWeight: (FONT.FONT_WEIGHT), fontSize: (FONT.FONT_SIZE)}}>
                    {note._data.Title}
                  </Text>
                  <Text>{note._data.Description} </Text>
                  {labelarr.map(labelData => {

                    return (
                      <View
                        style={{
                          borderRadius: (BORDER.BORDER_RADIUS),
                          justifyContent: (BORDER.JUSTIFY_CONTENT),
                          padding: (PADDING.L_PADDING),
                          marginRight: (MARGIN.I_MARGIN),
                          marginTop: (MARGIN.R_MARGIN),
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


