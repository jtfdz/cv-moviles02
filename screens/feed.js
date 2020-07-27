import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Block, Text } from '../components';


export default class Feed extends React.Component {

 static navigationOptions = {
   header : null
 }


 render(){
   return (
     <Block middle>
       <Text>feed</Text>
     </Block>
    
   );
 }
 }

const styles = StyleSheet.create({

});