

import { StyleSheet } from 'react-native'
const LabelUpdateDeleteCss = StyleSheet.create({
    header: {
        height: 40,
        flexDirection: 'row',
       // padding: 10,
       // backgroundColor: 'red',
        padding:10
       // marginBottom: '1%',
      },
      titleStyle: {
        marginLeft: 15,
        color: 'black',
        fontSize: 18,
      },
      label: {
        marginTop:14,
        borderColor: 'grey',
        borderBottomWidth: 0.7,
        borderTopWidth: 0.7,
        flexDirection: 'row',
      },
    //   container: {
    //     backgroundColor: 'red',
    //     width: widthOfScreen,
    //     height: heightOfScreen - 300,
    //  },
      text: {
        fontSize: 20,
        color: 'black',
        marginLeft: 30,
      },
      check: {
        padding: 10,
        // marginLeft: 1,
        color:'black'
      },
})

export default LabelUpdateDeleteCss