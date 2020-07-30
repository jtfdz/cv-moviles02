import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator, Keyboard, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Dimensions } from 'react-native';
import { Button, Block, Text, Input, Card, Badge } from '../components';
import { theme } from '../constants';
import { SearchBar } from 'react-native-elements';
import {logout} from '../constants/acople';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from "../assets/images"
const { width } = Dimensions.get('window');
import Modal from 'react-native-modalbox';




const PorArticulo = props =>{
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);
  let arrayholder = props.data;
  const [finalholder, setFinalholder] = useState(arrayholder);
  const [isOpen, setisOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({});


  function SearchFilterFunction(text) {
  const newData = arrayholder.map(function(elements){
    const itemData = elements.nombre_articulo ? elements.nombre_articulo.toUpperCase() : ''.toUpperCase();
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

  function mostrarProducto(datos){
    setisOpen(true)
    setmodalProduct(datos) 
  }

  const Productos = props => props.arrayProductos.map(function(news){
      setLoad(false)
      return(
    <TouchableOpacity key={news.id_usuario} onPress={()=> mostrarProducto(news)}>
    
        <Card center middle shadow style={styles.category}>
          <Badge>
            <Image source={images[news.nombre_departamento]}/>
          </Badge>
          <Text>{news.nombre_articulo}</Text>
          <Text gray caption>{news.precio}bs c/u</Text>
                      <Button color={theme.colors.secondary} onPress={() => setisOpen(false)}>
            <Text bold center>cerrar</Text>
            </Button>
        </Card>
      </TouchableOpacity> 
    )
    });



      return (  
      <Block>   
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{paddingVertial: theme.sizes.base * 2, backgroundColor: theme.colors.secondary}}>
      
          <SearchBar
          round lightTheme
          placeholder="buscar artículos..."
          onChangeText={text => { SearchFilterFunction(text) }}
          value={search}
        />

      <Block flex={false} row space="between" style={styles.categories}>        

      <Productos arrayProductos={finalholder} />
    
     {load? 
      <Block style={{ flex: 1, paddingTop: 20 }}>
      <ActivityIndicator />
      </Block>:null
      }    

      </Block>
 
      </ScrollView>  

         <Modal isOpen={isOpen} animationType="fade" presentationStyle="fullScreen" onClosed={() => setisOpen(false)} style={[styles.modal]} position={"bottom"} swipeArea={20}>
          <ScrollView style={[styles.sview]}>
            <Block>
            <Image source={images[modalProduct.nombre_departamento]}/>
            <Text h1 bold>{modalProduct.nombre_articulo}</Text>
            <Text><Text bold>departamento:</Text> <Text>{modalProduct.nombre_departamento}</Text></Text>
            <Text><Text bold>vendedor: </Text><Text>{modalProduct.nombre_usuario}</Text></Text>
            <Text><Text bold>contacto: </Text><Text>{modalProduct.correo}</Text></Text>              
            <Text><Text bold>precio: </Text><Text>{modalProduct.precio}</Text></Text>
            <Text><Text bold>cantidad disponible: </Text><Text>{modalProduct.cantidad}</Text></Text>
            <Button color={theme.colors.secondary} onPress={() => setisOpen(false)}>
            <Text bold center>cerrar</Text>
            </Button>
            </Block>
          </ScrollView>
        </Modal>
        </Block>         
   
      );
    }


const PorDepartamento = props =>{
  const [search, setSearch] = useState('');
  let arrayholding = props.data;
  const [load, setLoad] = useState(true);
  let arrayTodos = props.productos;
  const [arrayProductos, setarrayProducto] = useState([]);
  const [loadProductos, setloadProductos] = useState(false);
  const [nombreDepartamento, setnombreDepartamento] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [modalProduct, setmodalProduct] = useState({}); 

  function articulosDepartamento(nom_dep){
   setloadProductos(true)
   setnombreDepartamento(nom_dep)
   let arrayTemporal = []; 
    arrayTodos.map(function(elements){
      if(elements.nombre_departamento === nom_dep){
        arrayTemporal.push(elements);
      }
    })
    return arrayTemporal;
  }

  function SearchFilterFunction(text) {
  
  const newData = arrayTodos.map(function(elements){
    const itemData = elements.nombre_articulo ? elements.nombre_articulo.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase()      
    if(itemData.indexOf(textData) > -1){
      return elements
    }
  });
  const result = newData.filter(word => word !== undefined);
  arrayTodos = result
  setarrayProducto(arrayTodos)
  setSearch(text)
  }

  
  const Departamentos = props => props.arrayDepartamentos.map(function(news){
    setLoad(false)
    return(
  <TouchableOpacity key={news.id_departamento} onPress={()=> setarrayProducto(articulosDepartamento(news.nombre))}>
      <Card center middle shadow style={styles.category}>
        <Badge>
          <Image source={images[news.nombre]}/>
        </Badge>
        <Text semibold caption>{news.nombre}</Text>
      </Card>
    </TouchableOpacity> 
  )
  });

  function mostrarProducto(datos){
    setisOpen(true)
    setmodalProduct(datos) 
  }

  const ProductosDepartamentosNotEmpty = props => props.productosfiltrados.map(function(news){
    return(
    <TouchableOpacity key={news.id_usuario} onPress={()=> mostrarProducto(news)}>      
        <Card center middle shadow >
          <Badge>
            <Image source={images[news.nombre_departamento]}/>
          </Badge>
          <Text>{news.nombre_articulo}</Text>
          <Text gray caption>{news.precio}</Text>
        </Card>
      </TouchableOpacity> 
    )
  }); 

  const ProductosDepartamentos = props => {
  return(
    <Block>

      <Text bold center>{props.nombreDep}</Text>
      {props.productosfiltrados.length > 0?
      <ProductosDepartamentosNotEmpty productosfiltrados={props.productosfiltrados}/>:
      <Text center>no hay productos bajo este departamento</Text>
      }

      <Button color={theme.colors.primary} onPress={() => setloadProductos(false)}>
      <Text bold center>volver</Text>
      </Button>     
    </Block>
  )
  }

  return (
    <Block>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{paddingVertial: theme.sizes.base * 2, backgroundColor: theme.colors.secondary}}
        >
        {loadProductos?
         <SearchBar
          round lightTheme
          placeholder="buscar artículos..."
          onChangeText={text => { SearchFilterFunction(text) }}
          value={search}
        />:null}


      <Block flex={false} row space="between" style={styles.categories}>
        
      {loadProductos?
      <Block>
      <ProductosDepartamentos nombreDep={nombreDepartamento} productosfiltrados={arrayProductos} />
      </Block>
      :<Departamentos arrayDepartamentos={arrayholding} />
      }
      
    
     {load? 
      <Block style={{ flex: 1, paddingTop: 20 }}>
      <ActivityIndicator />
      </Block>:null
      }    

      </Block>  
      </ScrollView> 
  
         <Modal isOpen={isOpen} animationType="fade" presentationStyle="fullScreen" onClosed={() => setisOpen(false)} style={[styles.modal]} position={"bottom"} swipeArea={20}>
          <ScrollView style={[styles.sview]}>
            <Block >
            <Image source={images[modalProduct.nombre_departamento]}/>
            <Text h1 bold>{modalProduct.nombre_articulo}</Text>
            <Text><Text bold>departamento:</Text> <Text>{modalProduct.nombre_departamento}</Text></Text>
            <Text><Text bold>vendedor: </Text><Text>{modalProduct.nombre_usuario}</Text></Text>
            <Text><Text bold>contacto: </Text><Text>{modalProduct.correo}</Text></Text>              
            <Text><Text bold>precio: </Text><Text>{modalProduct.precio}</Text></Text>
            <Text><Text bold>cantidad disponible: </Text><Text>{modalProduct.cantidad}</Text></Text>
            <Button color={theme.colors.secondary} onPress={() => setisOpen(false)}>
            <Text bold center>cerrar</Text>
            </Button>
            </Block>
          </ScrollView>
        </Modal>

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
        tipo: 0,
        datos: [],
        estado: 400
    }
  
  componentDidMount() {
      fetch("https://moviles02cv.herokuapp.com/departamento")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            estado: result.status,
            datos: result.data,
          });
        },
        (error) => {
          this.setState({
            estado: 400,
            error
          });
        }
      )

    fetch("https://moviles02cv.herokuapp.com/articulos")
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

  alert(this.state.tipo)


  }
 

 static navigationOptions = {title: 'feed'}



 render(){
   const Tab = createBottomTabNavigator();



    return (
   
      <NavigationContainer>
        <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'artículos') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'departamentos') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondary,
      }}>

        <Tab.Screen name="artículos" component={ () => <PorArticulo data={this.state.data} />} />
        <Tab.Screen name="departamentos" component={ () => <PorDepartamento productos={this.state.data} data={this.state.datos} />} />
        {this.state.tipo === 3? <Tab.Screen name="crear" component={crearArticulo} /> : null }         
        </Tab.Navigator>
      </NavigationContainer>
    
      );
     
    
 }
 }





















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
modal: {
  paddingLeft: 10,
  backgroundColor: theme.colors.primary
},
sview: {
  flex: 1,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',

},
});