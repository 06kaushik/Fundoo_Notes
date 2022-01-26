import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import DashBoardScreen from '../Screens/DashBoardScreen';
import LabelScreen from '../Screens/LabelScreen';
import ArchiveScreen from '../Screens/ArchiveScreen';
import DeleteScreen from '../Screens/DeleteScreen';
import UpdateDeleteLabel from '../Screens/UpdateDeleteLabel';


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoardScreen"
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} />
      <Drawer.Screen name="LabelScreen" component={LabelScreen}/>
      <Drawer.Screen name="ArchiveScreen" component={ArchiveScreen}/>
      <Drawer.Screen name="DeleteScreen" component={DeleteScreen}/>
      <Drawer.Screen name='UpdateDeleteLabel' component={UpdateDeleteLabel}/>


    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
