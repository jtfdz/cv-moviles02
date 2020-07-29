import React, { useState } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView,  Platform, StyleSheet } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

export default class Registro extends React.Component {

 static navigationOptions = { title: 'registrar nueva cuenta' }

 state = {
    name: null, email: null,
    type:'2', username: null,
    password: null, errors: [], loading: false,
  }

  handleSignUp() {
    const { navigation } = this.props;
    const { name, email, username, password, type } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (!email) errors.push('email');
    if (!name) errors.push('email');       
    if (!username) errors.push('username');
    if (!password) errors.push('password');
    this.setState({ errors, loading: false });



    if (!errors.length) {
    fetch('https://moviles02cv.herokuapp.com/registrar', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      nombre: name,
      tipo: type
    }),
  }).then((response) => {
      if(response.status === 200){
      
        Alert.alert(
        'éxito',
        'tu cuenta fue creada',
        [
          {
            text: 'continuar', onPress: () => {
              navigation.navigate('Feed')
            }
          }
        ],
        { cancelable: false }
      )
      }
    })
    .catch((error) => {
      alert('error: '+error);
    });

    }
  }


 render(){
  const { navigation } = this.props;
  const { loading, errors } = this.state;
  const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;  

   return (
      <KeyboardAvoidingView style={styles.signup} behavior={Platform.OS === "ios" ? "padding" : null}>
        <Block padding={[0, theme.sizes.base * 2]}>
         <Block middle styles={styles.mold} >
        
          <Input
              label="nombre"
              error={hasErrors('name')}
              style={[styles.input, hasErrors('name')]}
              defaultValue={this.state.name}
              onChangeText={text => this.setState({ name: text })}/>  
              <Input
                label="usuario"
                error={hasErrors('username')}
                style={[styles.input, hasErrors('nombre')]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />       
           
                            
            <Input
                email
                label="correo"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                secure
                label="contraseña"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
 
      <DropDownPicker
          items={[{label: 'cliente', value: '2'},
              {label: 'vendedor', value: '3'}]}
          defaultValue={this.state.type}
          containerStyle={{height: 40}}
          style={[styles.dropdown]}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.setState({
              type: item.value
          })}/>


        <Button gradient onPress={() => this.handleSignUp()}>
          {loading ?
          <ActivityIndicator size="small" color="white" /> :
            <Text bold white center>registrar</Text>
          }
        </Button>

<Block style={{ flex : 1 }} />
            </Block>
        </Block>

      </KeyboardAvoidingView>
      
    
   );
 }
 }

const styles = StyleSheet.create({
signup: {
  flex: 1,
},
mold:{
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
},
input: {
  borderRadius: 0,
  borderWidth: 0,
  borderBottomColor: theme.colors.gray2,
  borderBottomWidth: StyleSheet.hairlineWidth,
},
dropdown: {
  backgroundColor: '#fafafa',
},
hasErrors: {
  borderBottomColor: theme.colors.accent,
}
});