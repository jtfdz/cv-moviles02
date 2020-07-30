import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Image, Dimensions, Animated  } from 'react-native';
import { Button, Block, Text } from '../components';
import { theme } from '../constants';

class InicioScreen extends Component {

 static navigationOptions = {
   header : null
 }

scrollX = new Animated.Value(0);
state = {}

renderIllustrations(){
  const { width, height } = Dimensions.get('window');
  const { illustrations } = this.props;
   return(
    <FlatList horizontal pagingEnabled scrollEnabled
  showsHorizontalScrollIndicator={false} scrollEventThrottle={16} snapToAlignment="center" data={illustrations} extraDate={this.state} keyExtractor={(item, index) => `${item.id}`}
  renderItem={({ item }) => ( <Block><Image
      source={item.source} resizeMode="contain" style={{ width, height: height / 2, overflow: 'visible' }}
    /><Text center bold caption>{item.text}</Text><Text primary center bold caption>{item.rosado}</Text></Block> )} 
    onScroll={
     Animated.event([{
       nativeEvent: { contentOffset: { x: this.scrollX } }
     }])
   }
    />
   )
 }


renderSteps(){
  const { illustrations } = this.props;
  const { width } = Dimensions.get('window');
  const stepPosition = Animated.divide(this.scrollX, width);
   return(
<Block row center middle style={styles.stepsContainer}>
   {illustrations.map((item, index) => {
     const opacity = stepPosition.interpolate({
       inputRange: [index - 1, index, index + 1],
       outputRange: [0.4, 1, 0.4],
       extrapolate: 'clamp',
     });

     return (
       <Block
         animated
         flex={false}
         key={`step-${index}`}
         color="powderblue"
         style={[styles.steps, { opacity }]}
       />
     )
   })}
 </Block>
   )
 }

   render(){
    return (
     <Block>
    <Block middle flex={0.1} style={{flexDirection: 'row'}} margin={[1, theme.sizes.padding * 2]}>

    <Button color={theme.colors.black} style={{width: 100, height: 30 }} shadow onPress={() => this.props.navigation.navigate('Login')}>
      <Text caption center semibold primary>iniciar sesión</Text>
    </Button>
    <Button color={theme.colors.primary} style={{ width: 100, height: 30 }} shadow onPress={() => this.props.navigation.navigate('Registro')}>
      <Text caption center semibold>registrar</Text>
    </Button>
      </Block>

       <Block center bottom flex={0.3}>
         <Text h1 center bold>compras,
           <Text h1 primary> ventas</Text>
         </Text>
       </Block>
       <Block center middle>
         {this.renderIllustrations()}
         {this.renderSteps()}
       </Block>
        
      <Block middle flex={0.2} margin={[1, theme.sizes.padding * 2]}>
    <Button color={theme.colors.secondary} shadow onPress={() => this.props.navigation.navigate('Feed')}>
      <Text center semibold>buscar artículos</Text>
    </Button>
      </Block>
        


     </Block>
  
    
   );
  }
  
}

InicioScreen.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/laptop.png'), text: '¿deseas algo?', rosado:' ¡ubícalo aquí!' },
    { id: 2, source: require('../assets/images/contacto.png'), text: '¿alguna duda del producto?', rosado:' ¡contacta al vendedor!' },
    { id: 3, source: require('../assets/images/flying-money.gif'), text: '¡el único requisito:', rosado:'  dinero!' },
  ],
};

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    top: 100,
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});

export default InicioScreen;
