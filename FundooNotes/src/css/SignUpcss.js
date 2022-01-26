import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container1: {
        height: '100%',
        width: '100%',
    },
    container2: {
        justifyContent:'center',
        flexDirection:'column',
        width: '80%',
        marginRight: '10%',
        marginLeft: '10%',  
        height:'80%'       
    },
    container3:{
    justifyContent:'space-between',
    height:'68%'
    },
    FirstNameInput:{
        // borderWidth:1,
        // borderColor:'gray',
        // borderRadius:10,
        // height:50,
        // paddingLeft:17,
        // color:'black'
    },
    TextRedError:{
        color: 'red',
         height:40,
        top:4

    },
    LastNameInput:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10,
        height:50,
        paddingLeft:17,
        color:'black'
    },
    EmailIdInput:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10,
        height:50,
        paddingLeft:17,
        color:'black'

    },
    PasswordInput:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10,
        height:50,
        paddingLeft:17,
        color:'black'

    },
SignUptxt:{
fontSize:17
},
    buttonSignUP:{
        backgroundColor:'#ffa500',
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
   TextView:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    top:10
   },
   LoginText:{
    fontWeight:'bold',
    color:'#ffa500',
    fontSize:17,paddingLeft:5
   }


})

export default styles