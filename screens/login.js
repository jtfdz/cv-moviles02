import React from 'react';
import { Alert, ActivityIndicator, Keyboard, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Block, Text, Input } from '../components';
import { theme } from '../constants';

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

    fetch('https://moviles02cv.herokuapp.com/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then((response) => {
      if(response.status === 200){
        Alert.alert(
        'éxito',
        'has accesado',
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
          // check with backend API or with some static data
    //if (email !== VALID_EMAIL) { errors.push('email');}
    //if (password !== VALID_PASSWORD) {errors.push('password');}

    //this.setState({ errors, loading: false });
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