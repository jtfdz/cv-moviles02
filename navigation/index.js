import React from 'react';
import { Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Inicio from '../screens/inicio';
import Login from '../screens/login';
import Registro from '../screens/registro';
import Feed from '../screens/feed';
import { theme } from '../constants';

const screens = createStackNavigator({
  Inicio ,
  Login,
  Registro,
  Feed,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, 
      borderBottomColor: "transparent",
      elevation: 0, 
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base,    
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
});

export default createAppContainer(screens);