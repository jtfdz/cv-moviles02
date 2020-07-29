import React from 'react';
import { TouchableOpacity, Alert, ActivityIndicator, Keyboard, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Dimensions } from 'react-native';
import { Button, Block, Text, Input, Card, Badge } from '../components';
import { theme } from '../constants';
import { SearchBar } from 'react-native-elements';
import {logout} from '../constants/acople';



export default class Feed extends React.Component {



 static navigationOptions = {
   header : null
 }
  

 render(){

   return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
      <Block middle>


   





      </Block>
      </Block>
    </KeyboardAvoidingView>
    
   );
 }
 }

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

});