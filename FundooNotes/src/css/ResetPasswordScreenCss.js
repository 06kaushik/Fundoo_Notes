import { StyleSheet } from 'react-native';
import {COLOR} from '../Utility/Styling'
//import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const ResetPasswordScreenCss = StyleSheet.create({
    container1: {
        width: '100%',
        height: '100%',
    },
    container2: {
        width: '80%',
        height: '80%',
        marginRight: '10%',
        marginLeft: '10%',
        justifyContent: 'center',
    },
    container3: {
        justifyContent: 'space-between',
        height: '39%'
    },
    TextInput: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 50,
        borderRadius: 10,
        paddingLeft: 17,
        color: (COLOR.TEXT_COLOR)

    },

    regexredError: {
        color: 'red',
        height: 52,
        top: 4
    },

    buttonResetView: {
        backgroundColor: '#ffa500',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },    
});

export default ResetPasswordScreenCss