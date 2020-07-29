import React, { useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator, Keyboard, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Dimensions } from 'react-native';
import { Button, Block, Text, Input, Card, Badge } from '../components';
import { theme } from '../constants';
import { SearchBar } from 'react-native-elements';
import {logout} from '../constants/acople';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const PorArticulo = props =>{
  const [search, setSearch] = useState('');
  let arrayholder = props.data;
  const [finalholder, setFinalholder] = useState(arrayholder);

  function SearchFilterFunction(text) {
    const newData = arrayholder.map(function(elements){
        const itemData = elements.nombre ? elements.nombre.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase()      
        if(itemData.indexOf(textData) > -1){
          return elements
        }
    });

    const result = newData.filter(word => word !== undefined);
    arrayholder = result
    setFinalholder(arrayholder)
    setSearch(text)
  }

      
  const Productos = props => props.arrayProductos.map(function(news){
      return(
    <TouchableOpacity key={news.id_usuario} onPress={()=> this.props.navigation.navigate('Feed')}>
        <Card center middle shadow style={styles.category}>
          <Badge>
            <Image source={require('../assets/icons/plants.png')}/>
          </Badge>
          <Text>{news.id_usuario}</Text>
          <Text gray caption>{news.nombre}</Text>
        </Card>
      </TouchableOpacity> 

    )});

      return (

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{paddingVertial: theme.sizes.base * 2}}
        >
  
          <SearchBar
          round lightTheme
          placeholder="buscar artículos..."
          onChangeText={text => { SearchFilterFunction(text) }}
          value={search}
        />

      <Block flex={false} row space="between" style={styles.categories}>
        
     {Productos != 0? 
      null:
      <Block style={{ flex: 1, paddingTop: 20 }}>
      <ActivityIndicator />
      </Block>
      } 

      <Productos arrayProductos={finalholder} />
    
   

      


      
       

      </Block>  
      </ScrollView>               
   
      );
    }

function pordepartamento() {
  return (
    <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </Block>
  );
}

function crearArticulo() {

  return (
    
    <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>crear artículo:</Text>
      <Input
      label="crear artículo"
      style={[styles.input]}
      defaultValue={this.state.username}
      onChangeText={text => this.setState({ username: text })}
    /> 
    </Block>
  );
}







export default class Feed extends React.Component {

 state = {
        data: [],
        status: 400,
        tipo: 0
    }
  

  componentDidMount() {
    fetch("http://localhost:3000/articulos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            status: result.status,
            data: result.data,
            tipo: result.tipo
          });
        },
        (error) => {
          this.setState({
            status: 400,
            tipo: 0,
            error
          });
        }
      )
  }
 

 static navigationOptions = {title: 'feed'}



 render(){
   const Tab = createBottomTabNavigator();



    return (
   
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="artículos" component={ () => <PorArticulo data={this.state.data} />} />
            <Tab.Screen name="departamento" component={pordepartamento} />
            {this.state.tipo == 3? <Tab.Screen name="crear" component={crearArticulo} /> : null }         
          </Tab.Navigator>
        </NavigationContainer>
    




      );
     
    

 }
 }























const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
category: {
   minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
   maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
   maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
 },
categories: {
  flexWrap: 'wrap',
  paddingHorizontal: theme.sizes.base * 2,
  marginTop: theme.sizes.base ,
  marginBottom: theme.sizes.base * 3.5,
},
});