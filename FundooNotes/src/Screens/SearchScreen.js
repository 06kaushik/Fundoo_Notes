import React, {useEffect, useState} from 'react';
import {View,TextInput,Image,ScrollView,TouchableOpacity} from 'react-native';
import SearchCss from '../css/ArchiveScreenCss';
import {getNotesDataWithId} from '../Services/NotesServices';
import {useNavigation} from '@react-navigation/native';
import SearchCard from '../Component/SearchCard';
import { COLOR, HEIGHT, MARGIN, WIDTH } from '../Utility/Styling';


export default function SearchScreen(props) {
  const [note, setNOte] = useState([]);
  const [searchText, setsearchText] = useState('');
  const [filterArr, setfilterArr] = useState([]);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotesDataWithId().then(res => {
        setNOte(res);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const navigation = useNavigation();

  const searchFilterFunction = searchText => {
    if (searchText != '') {
      setsearchText(searchText);
      let arr = [];
      let newArr = [];
      arr = note.map(notes => {
        newArr.push(notes);

        let filterData = newArr.filter(noteData => {
          return (
            noteData.Title.toLowerCase().search(searchText.toLowerCase()) !==
              -1 ||
            noteData.Description.toLowerCase().search(
              searchText.toLowerCase(),
            ) !== -1
          );
        });

        setfilterArr(filterData);
      });
    }
  };

  return (
    <View style={SearchCss.container1}>
      <View style={SearchCss.headerView}>
        <View style={SearchCss.ImgmenueView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('DashBoardScreen')}>
            <Image
              style={SearchCss.Imgmenue}
              source={require('../Assets/icons/backArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={SearchCss.archivetxtview}>
          <TextInput
            placeholder="Search your notes"
            placeholderTextColor={COLOR.PLACE_HOLDER_COLOR}
            style={{width: (WIDTH.S_WIDTH), height: (HEIGHT.S_HEIGHT)}}
            onChangeText={text => {
              searchFilterFunction(text);
            }}
          />
        </View>
      </View>
      <View>
        <ScrollView style={{marginBottom: (MARGIN.MARGIN_BOTTTOM), marginTop: (MARGIN.MARGIN_TOP)}}>
          <SearchCard searchDataArr={filterArr} />
        </ScrollView>
      </View>
    </View>
  );
}
