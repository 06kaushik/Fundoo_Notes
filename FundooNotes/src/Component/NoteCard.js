import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { Text, TouchableOpacity, View } from 'react-native';
import { getNotes, setAllCheckBoxValueFalse } from '../Services/NotesServices';
import { useNavigation } from '@react-navigation/native';
import { createTable, getSqliteData, insertValues } from '../Services/SqliteServices';
import { BORDER, FLEX, FONT, MARGIN, PADDING, WIDTH } from '../Utility/Styling';


export default function DashboardCard(props) {
  const [notes, setNotes] = useState([]);
  const [displayNoteData, setdisplayNoteData] = useState([]);

  useEffect(() => {
    createTable();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotes().then(res => {
        setNotes(res);
        getSqliteData();

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
      edite: true,
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
        if (
          note._data.Trash == false &&
          note._data.Archive == false &&
          note._data.Pin == false
        ) {
          return (
            <View key={note.id}>
              <TouchableOpacity onPress={() => navigateEditScreen(note)}>
                <Card containerStyle={props.gridListdata ? gridView : listView}>
                  <Text style={{ fontWeight: (FONT.FONT_WEIGHT), fontSize: (FONT.FONT_SIZE) }}>
                    {note._data.Title}
                  </Text>
                  <Text>{note._data.Description} </Text>

                  <View
                    style={{
                      flexWrap: (FLEX.FLEX_WRAP),
                      flexDirection: (FLEX.FLEX_DIRECTION),
                    }}>
                    {note._data.DateTimeChipBoolean ? (
                      <View
                        style={{
                          margin: (MARGIN.I_MARGIN),
                          marginBottom: (MARGIN.M_BOTTOM),
                          borderRadius: (BORDER.BR),
                          padding: (PADDING.L_PADDING),
                          justifyContent: (BORDER.JUSTIFY_CONTENT),
                        }}>
                        <Text>
                          {note._data.Date},{note._data.Time}
                        </Text>
                      </View>
                    ) : null}
                    {labelarr.map((labelData, Index) => {

                      return (
                        <View
                          key={Index}
                          style={{
                            margin: (MARGIN.I_MARGIN),
                            borderRadius:(BORDER.BR),
                            justifyContent: (BORDER.JUSTIFY_CONTENT),
                            padding: (PADDING.L_PADDING),
                            marginBottom: (MARGIN.M_BOTTOM),
                          }}>
                          <Text>{labelData}</Text>
                        </View>
                      );
                    })}
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
  );
}
