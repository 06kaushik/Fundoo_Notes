import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View,Text} from 'react-native'
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import DashBoardScreen from '../Screens/DashBoardScreen';
import CreateNoteScreen from '../Screens/CreateNoteScreen';
import EditNoteScreen from '../Screens/EditNoteScreen';
import SearchScreen from '../Screens/SearchScreen';
import LabelScreen from '../Screens/LabelScreen';
import ArchiveScreen from '../Screens/ArchiveScreen';
import DeleteScreen from '../Screens/DeleteScreen';
import UpdateDeleteLabel from '../Screens/UpdateDeleteLabel';
import EditeLabelScreen from '../Screens/EditLabelScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();


function Navigation() {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="DashBoardScreen" screenOptions={{headerShown: false}}>
               <Stack.Screen name="SignInScreen" component={SignInScreen} /> 
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
              <Stack.Screen name="DashBoardScreen" component={DrawerNavigator} />
              <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} />
              <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="LabelScreen" component={LabelScreen} />
              <Stack.Screen name="ArchiveScreen" component={ArchiveScreen} />
        <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
        <Stack.Screen name="UpdateDeleteLabel" component={UpdateDeleteLabel} />
        <Stack.Screen name="EditLabelScreen" component={EditeLabelScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />



        </Stack.Navigator>
        </NavigationContainer>
        
    );  
}

export default Navigation;