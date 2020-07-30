import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Navigation from './navigation/index';

const images = [
  require('./assets/icons/back.png'),
  require('./assets/images/laptop.png'),
  require('./assets/images/contacto.png'),  
  require('./assets/images/flying-money.gif'), 
  require('./assets/images/avatar.png'),
];

export default class App extends React.Component {
  state = {isLoadingComplete: false}
  handleResourcesAsync = async () => {
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });

      return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
        <Navigation />
    );
  }
}




