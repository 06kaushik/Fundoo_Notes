import React from 'react'
import { Dimensions,Image } from "react-native";
import { heightPercentageToDP,widthPercentageToDP } from './CalculationSize';
const {width,height} = Dimensions.get('window').width
const fontscale = Dimensions.get('window').fontScale


export const COLOR ={
    TEXT_COLOR: 'black',
    PLACE_HOLDER_COLOR: 'grey',
    CARD_BACKGROUND_COLOR: 'yellow',
    PLUS_BACKGROUND_COLOR: 'transparent',
    FOOTER_BACKGROUND_COLOR: '#fff',
    TOUCHABLE_BORDER_COLOR: '#ffffff',
    TOUCHABLE_BACKGROUND_COLOR: '#ffffff',
    TRANSPARENT: 'rgba(0,0,0,0)',
    TEXT_INPUT_BORDER_COLOR: 'grey',
    SUBMIT_BACKGROUND_COLOR: '#ffa500',
    ERROR_COLOR: 'red',
    LABEL_BORDER_COLOR: 'grey',
    BACKGROUND: 'white',
    SUBMIT_COLOR: '#ffa500',
    LOGIN_COLOR: '#ffa500',
    IMAGE_COLOR: 'grey',
    LABEL_COLOR: 'lightgrey',
    R_COLOR:'grey',

}

export const MARGIN = {
    MARGIN_LEFT: 20,
    MARGIN_LEFTT: 22,
    MARGIN_TOP:30,
    MARGIN_VERTICAL:20,
    BACK_ARROW_MARGIN:14,
    MARGIN:15,
    COLOR_LEFT_MARGIN:22,
    MARGIN_RIGHT:20,
    IMAGE_MARGIN:10,
    IMAGE_MARGIN_TOP:20,
    LABEL_MARGIN_LEFT:17,
    LABEL_MARGIN_TOP:10,
    LIST_MARGIN:180,
    EDIT_MARGIN_LEFT:150,
    MENU_MARGIN:25,
    BRUSH_MARGIN:14,
    MARGIN_BOTTTOM:60,
    I_MARGIN: 5,
    I_MARGINTOP:2,
    TOP: 20,
    CHECKBOX_MARGIN:170,
    E_MARGIN:12,
    M_BOTTOM:10,
    R_MARGIN:7,
    T_MARGIN:15,
    M_TOP:10,
    R_LEFTMARGIN:30,
    
}

export const FLEX ={
    FLEX_:1,
    FLEX_DIRECTION: 'row',
    FLEX_WRAP:'wrap'

}

export const HEIGHT = {
    HEIGHT_ : 25,
    IMAGE_HEIGHT: 20,
    IMAGE_HEIGHT1: 15,
    SCREEN_HEIGHT: '100%',
    LABEL_HEIGHT: 30,
    D_HEIGHT: 40,
    L_HEIGHT: 45,
    S_HEIGHT:35,
    RB_HEIGHT:160,
    H:1,
    

}

export const WIDTH ={
     
    WIDTH_ : 25,
    IMAGE_WIDTH : 20,
    SCREEN_WIDTH: '100%',
    LABEL_WIDTH: 110,
    S_WIDTH: 200,
    GRID_WIDTH: 149,
    LIST_WIDTH:328,
}

export const IMAGES = {
    UNPIN_IMAGE :  <Image
    source={require('..//Assets/icons/unpin.png')}/>,
    PIN_IMAGE: <Image
    source={require('..//Assets/icons/pin.png')}/>
}
export const FONT = {
    TEXT_FONTSIZE: 20,
    FONT_SIZE:15,
    FONT_WEIGHT: 'bold'
}

export const BORDER = {
    LABEL_RADIUS: 10,
    JUSTIFY_CONTENT:'center',
    BORDER_RADIUS: 20,
    R_RADIUS:10,
    BR:6
}

export const PADDING = {
    L_PADDING:5,
    PADDING_ : 12

}

export const STYLE = {
    JUSTIFY_CONTENT : 'space-between',
    ALIGN_ITEM:'center'

}
export const COLORMARGIN = {
    MARGIN_TOP:13,
    MARGIN_LEFT:15,
    HEIGHT:30,
    WIDTH:30,
    M_TOP:24,
    RADIUS:30,
    B_WIDTH:0.5,
    COLOR:'grey',
    MARGIN:7,


}

export const LISTSTYLE={
    marginLeft : widthPercentageToDP('30%')

}
