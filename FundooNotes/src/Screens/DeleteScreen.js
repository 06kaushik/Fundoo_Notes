import React, { useState } from 'react';
import {View, Image, Text,ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeleteCard from '../Component/DeleteCard';
import DeleteCss from '../css/DeleteScreenCss';
import { FONT, MARGIN } from '../Utility/Styling';

export default function DeleteScreen(props) {
   
  const[open,setopen]=useState(false)
  const gridView = () => {
    setopen(!open)
  };

  return (
    <View style={DeleteCss.container1}>
        <View style={DeleteCss.headerView}>
          <View style={DeleteCss.ImgmenueView}>
            <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
            <Image
              style={DeleteCss.Imgmenue}
              source={require('../Assets/icons/menu.png')}
            />
            </TouchableOpacity>
          </View>
          <View style={DeleteCss.archivetxtview}>
            <Text style={{fontSize: (FONT.TEXT_FONTSIZE)}}>Deleted</Text>
          </View>
          {open ?(
             <View style={DeleteCss.listImgView}>
             <TouchableOpacity onPress={()=>gridView()}>
             <Image style={DeleteCss.listImg}  source={require('../Assets/icons/list.png')}/>
             </TouchableOpacity >
           </View>
          ):(
          <View style={DeleteCss.listImgView}>
            <TouchableOpacity onPress={()=>gridView()}>
            <Image style={DeleteCss.listImg}  source={require('../Assets/icons/grid.png')}/>
            </TouchableOpacity>
          </View>
          )}
        </View>
        <View>
        <ScrollView style={{marginBottom: (MARGIN.MARGIN_BOTTTOM),marginTop:(MARGIN.MARGIN_TOP),}}>
          <DeleteCard gridListdata={open} />
        </ScrollView>
        </View>
    </View>
  );
}
