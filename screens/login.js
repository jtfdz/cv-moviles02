import React from 'react';
import { Alert, ActivityIndicator, Keyboard, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Block, Text, Input } from '../components';
import { theme } from '../constants';
import fetch from "isomorphic-unfetch";



export default class Login extends React.Component {

 static navigationOptions = {
  title: 'iniciar sesión'
 }

 state = {
    username: '',
    password: '',
    errors: [],
    loading: false    
  }

 handleLogin() {
    const { navigation } = this.props;
    const { username, password } = this.state;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    
    const options = { 
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
      username: username,
      password: password
    })
  
  }  


    fetch('https://moviles02cv.herokuapp.com/login', options)
    .then((response) => {

      if(response.status === 200){
        Alert.alert(
        'éxito',
        'has accesado',
        [
          {
            text: 'continuar', onPress: () => {
            
              navigation.navigate('Feed', {usuario: response.sesionfalsa})
            }
          }
        ],
        { cancelable: false }
      ) 
    
      }

    })
    .catch((error) => {
      console.error(error);
    })



  }

 render(){
  const { navigation } = this.props;
  const { loading, errors } = this.state;
  const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
   return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
      <Block middle>

      <Input 
        label="usuario"
        error={hasErrors('username')}
        style = {[styles.input, hasErrors('username')]}
        defaultValue={this.state.username}
        onChangeText={text => this.setState({username : text})}
      />

      <Input secure
        label="contraseña"
        error={hasErrors('password')}
        style={[styles.input, hasErrors('password')]}
        defaultValue={this.state.password}
        onChangeText={text => this.setState({password : text})}
      />
      <Button gradient onPress={() => this.handleLogin()}>
        {loading ?
          <ActivityIndicator size="small" color="white" /> : 
          <Text bold white center>Login</Text>
        }
      </Button>

      </Block>
      </Block>
    </KeyboardAvoidingView>
   );
 }
 }

const styles = StyleSheet.create({
input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
login: {
    flex: 1,
    justifyContent: 'center',
  },
hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
});