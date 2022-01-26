import React, { useState } from 'react';
import {View, Image, Text,ScrollView, Touchable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArchiveCard from '../Component/ArchiveCard';
import ArchiveCss from '../css/ArchiveScreenCss';
import {FONT, MARGIN} from '../Utility/Styling'

export default function ArchiveScreen(props) {
   
  const[open,setopen]=useState(false)
  const gridView = () => {
    setopen(!open)
  };

  return (
    <View style={ArchiveCss.container1}>
        <View style={ArchiveCss.headerView}>
          <View style={ArchiveCss.ImgmenueView}>
            <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
            <Image
              style={ArchiveCss.Imgmenue}
              source={require('../Assets/icons/menu.png')}
            />
            </TouchableOpacity>
          </View>
          <View style={ArchiveCss.archivetxtview}>
            <Text style={{fontSize:(FONT.TEXT_FONTSIZE)}}>Archive</Text>
          </View>
          {open ?(
             <View style={ArchiveCss.listImgView}>
             <TouchableOpacity onPress={()=>gridView()}>
             <Image style={ArchiveCss.listImg}  source={require('../Assets/icons/list.png')}/>
             </TouchableOpacity >
           </View>
          ):(
          <View style={ArchiveCss.listImgView}>
            <TouchableOpacity onPress={()=>gridView()}>
            <Image style={ArchiveCss.listImg}  source={require('../Assets/icons/grid.png')}/>
            </TouchableOpacity>
          </View>
          )}
        </View>
        <View>
        <ScrollView style={{marginBottom: (MARGIN.MARGIN_BOTTTOM),marginTop:(MARGIN.MARGIN_TOP)}}>
          <ArchiveCard gridListdata={open} />
        </ScrollView>
        </View>
    </View>
  );
}
