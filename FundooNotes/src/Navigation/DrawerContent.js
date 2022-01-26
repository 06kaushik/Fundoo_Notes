import React, {useCallback, useEffect, useState} from 'react';
import {View,Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Text} from 'react-native-paper';
import CustomDrawerCss from '../css/CustomDrawerCss';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchLabelsData, getLabel} from '../Services/NotesServices';
import {useSelector, useDispatch} from 'react-redux';
import {setLabelData} from '../Redux/actions';
import { BORDER, COLOR, FLEX, FONT, HEIGHT, MARGIN, STYLE, WIDTH } from '../Utility/Styling';


export function DrawerContent({props, navigation}) {
  const [labelArray, setlabelArray] = useState([]);
  const labelData = useSelector(state => state.labelData);
  const dispatch = useDispatch();

  // fetch data using redux labelData state
  const fetchData = useCallback(async () => {
    let data = await fetchLabelsData();
    
    dispatch(setLabelData(data));
  }, [dispatch]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={CustomDrawerCss.googlekeeptxtView}>
          <Text style={CustomDrawerCss.keeptxt}>Fundoo Notes</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('DashBoardScreen')}>
          <View
            style={{
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginLeft: (MARGIN.MARGIN_LEFT),
              alignItems: (BORDER.JUSTIFY_CONTENT),
              height: (HEIGHT.D_HEIGHT),
            }}>
            <Image
                source={require('..//Assets/icons/bulb.png')}
                style={{
                    height:(HEIGHT.IMAGE_HEIGHT),
                    width:(WIDTH.IMAGE_WIDTH),
                    tintColor:(COLOR.IMAGE_COLOR),
                  
                }}  />
            <Text style={{fontSize: (FONT.FONT_SIZE), marginLeft: (MARGIN.MARGIN_LEFT)}}>Notes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginLeft: (MARGIN.MARGIN_LEFT),
              alignItems: (STYLE.ALIGN_ITEM),
              height: (HEIGHT.D_HEIGHT),
              marginTop: (MARGIN.I_MARGIN),
            }}>
           <Image
                source={require('..//Assets/icons/reminderplus.png')}
                style={{
                    height:(HEIGHT.IMAGE_HEIGHT),
                    width:(WIDTH.IMAGE_WIDTH),
                    tintColor:(COLOR.IMAGE_COLOR),
                  
                }}  />
            <Text style={{fontSize: (FONT.FONT_SIZE), marginLeft: (MARGIN.MARGIN_LEFT)}}>Reminders</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: (WIDTH.SCREEN_WIDTH),
            height: (HEIGHT.H),
            backgroundColor: (COLOR.R_COLOR),
            marginTop: (MARGIN.M_TOP),
          }}></View>
        <View style={CustomDrawerCss.LabelsEdit}>
          <TouchableOpacity>
            <Text>Labels</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateDeleteLabel')}>
            <Text style={CustomDrawerCss.Edit}>Edit</Text>
          </TouchableOpacity>
        </View>
        {
          labelData.map((label, Index) => {
            return (
              <TouchableOpacity
                key={label.labelId}
                onPress={() => navigation.navigate('DashBoardScreen')}>
                <View style={CustomDrawerCss.ImagelabeltxtView}>
                <Image
                source={require('..//Assets/icons/label.png')}
                style={{
                    height:(HEIGHT.HEIGHT_),
                    width:(WIDTH.WIDTH_),
                    tintColor:(COLOR.IMAGE_COLOR),
                }}  />
                  <Text style={CustomDrawerCss.labelpriority}>
                    {label.Label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateDeleteLabel')}>
          <View
            style={{
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginLeft: (MARGIN.MARGIN_LEFT),
              alignItems: (STYLE.ALIGN_ITEM),
              marginTop: (MARGIN.TOP),
            }}>
            <Image
                source={require('..//Assets/icons/p.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
                  width:(WIDTH.WIDTH_),
                  tintColor:(COLOR.IMAGE_COLOR),
                }}  />
            <Text style={{marginLeft: 16, fontSize: 15}}>Create new label</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: (WIDTH.SCREEN_WIDTH),
            height: (HEIGHT.H),
            backgroundColor: (COLOR.R_COLOR),
            marginTop:(MARGIN.TOP),
          }}></View>
        <TouchableOpacity onPress={() => navigation.navigate('ArchiveScreen')}>
          <View
            style={{
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginLeft: (MARGIN.MARGIN_LEFT),
              alignItems: (STYLE.ALIGN_ITEM),
              height: (HEIGHT.D_HEIGHT),
              marginTop: (MARGIN.M_TOP),
            }}>
            <Image
                source={require('..//Assets/icons/archive.png')}
                style={{
                  height:(HEIGHT.HEIGHT_),
                  width:(WIDTH.WIDTH_),
                  tintColor:(COLOR.IMAGE_COLOR),
                }}  />
            <Text style={{fontSize: 15, marginLeft: 20}}>Archive</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DeleteScreen')}>
          <View
            style={{
              flexDirection: (FLEX.FLEX_DIRECTION),
              marginLeft: (MARGIN.MARGIN_LEFT),
              alignItems: (STYLE.ALIGN_ITEM),
              height: (HEIGHT.D_HEIGHT),
              marginTop: (MARGIN.M_TOP),
            }}>
            <Image
                source={require('..//Assets/icons/delete.png')}
                style={{
                  height:(HEIGHT.IMAGE_HEIGHT),
                  width:(WIDTH.IMAGE_WIDTH),
                  tintColor:(COLOR.IMAGE_COLOR),
                }}  />
            <Text style={{fontSize: (FONT.FONT_SIZE), marginLeft: (MARGIN.MARGIN_LEFT)}}>Delete</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: (WIDTH.SCREEN_WIDTH),
            height: (HEIGHT.H),
            backgroundColor: (COLOR.R_COLOR),
            marginTop:(MARGIN.TOP),
          }}></View>
      </DrawerContentScrollView>
    </View>
  );
}
