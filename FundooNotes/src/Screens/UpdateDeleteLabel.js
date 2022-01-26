import AdditeDeleteLabelCard from '../Component/AddDeleteLabelCard';
import React, {useCallback} from 'react';
import {Text,View,TouchableOpacity,TextInput,Dimensions,FlatList,Image} from 'react-native';
import {addLabel, fetchLabelsData} from '../Services/NotesServices';
import LabelUpdateDeleteCss from '../css/LabelUpdateDeleteCss';
import {useDispatch, useSelector} from 'react-redux';
import {setLabelData} from '../Redux/actions';
import { COLOR, FLEX, HEIGHT, MARGIN, PADDING, WIDTH } from '../Utility/Styling';

  const widthOfScreen = Dimensions.get('screen').width;
  const heightOfScreen = Dimensions.get('screen').height;
  const UpdateDeleteLabel = ({navigation}) => {
  const [label, setLabel] = React.useState('');
  const [icon, SetIcon] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const labelData = useSelector(state => state.labelData);
  const dispatch = useDispatch();

  // fetch data using redux labelData state
  const fetchData = useCallback(async () => {
    let data = await fetchLabelsData();
    // setLabelData(data);
    dispatch(setLabelData(data));
  }, [dispatch]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  const toggle = () => {
    setAdd(!add);
    SetIcon(!icon);
    setLabel('');
  };

  //function for add label
  const labelOperation = (changeData = {}) => {
    // const noteData = {label};

    addLabel(label, checked).then(() => {
      //  setLabel('');
      fetchData();
    });
  };
  const onCheckButton = () => {
    if (label != '') labelOperation();
  };

  var labelForCreateScreen = () => {
    navigation.navigate('DashBoardScreen');
  };
  return (
    <View style={{flex: (FLEX.FLEX_), marginTop: (MARGIN.TOP)}}>
      <View style={LabelUpdateDeleteCss.header}>
        <View>
          <TouchableOpacity onPress={labelForCreateScreen}>
          <Image
           source={require('..//Assets/icons/backArrow.png')}
           style={{
               height:(HEIGHT.HEIGHT_),
               width:(WIDTH.WIDTH_),
               tintColor:(COLOR.IMAGE_COLOR)
           }}  />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={LabelUpdateDeleteCss.titleStyle}>Edit Labels</Text>
        </View>
      </View>
      <View style={LabelUpdateDeleteCss.label}>
        <View style={{padding: (PADDING.PADDING_)}}>
          <TouchableOpacity onPress={toggle}>
            {icon ? (
              <Image
              source={require('..//Assets/icons/p.png')}
              style={{
                height:(HEIGHT.HEIGHT_),
                width:(WIDTH.WIDTH_),
                tintColor:(COLOR.IMAGE_COLOR)
              }}  />
            ) : (
                <Image
                source={require('..//Assets/icons/close.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
               width:(WIDTH.WIDTH_),
               tintColor:(COLOR.IMAGE_COLOR)
                }}  />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={{fontSize: 18, width: 220, marginLeft: '10%', height: 50, color:(COLOR.TEXT_COLOR)}}
            placeholder="Create new label"
            placeholderTextColor="grey"
            value={label}
            onChangeText={text => setLabel(text)}
          />
        </View>
        <View style={LabelUpdateDeleteCss.check}>
          {!add ? (
            <TouchableOpacity onPress={onCheckButton}>
               <Image
              source={require('..//Assets/icons/tick.png')}
              style={{
                height:(HEIGHT.HEIGHT_),
                width:(WIDTH.WIDTH_),
                tintColor:(COLOR.IMAGE_COLOR)
              }}  />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <FlatList
          data={labelData}
          renderItem={({item}) => (
            <AdditeDeleteLabelCard {...item} fetchData={fetchData} />
          )}
          keyExtractor={item => item.labelId}
        />
      </View>
    </View>
  );
};

export default UpdateDeleteLabel;
