import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation } from '@react-navigation/native';


export default function SearchCard(props) {
  const [notes, setNotes] = useState([]);
  const[displayNoteData,setdisplayNoteData]= useState([]);

 
 useEffect(() => {
setNotes(props.searchDataArr)
}, []);

  const navigation= useNavigation();

  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        }}>
        
      {props.searchDataArr.map(note => {
          let gridView = {width: 166,borderRadius:10, backgroundColor: 'red',backgroundColor:note.Colour};
          let listView = {width:370, borderRadius:10,backgroundColor:'red',backgroundColor:note.Colour}  
        return (
          <View key={note.id} >
            <TouchableOpacity onPress={() => {navigation.navigate('EditNoteScreen',{displayNoteData:note, key:note.id,searchOpen:true})}} > 
            <Card containerStyle={ listView} >
              <Card.Title>{note.Title}</Card.Title>
              <Text>{note.Description} </Text>
            </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
    
  );
}


