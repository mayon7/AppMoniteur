import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
  } from 'react-native';

export default class Logo extends React.Component {
  render(){
    return(
        <View>
        <Image style={{width:200, height: 200}}
        source={require('../Images/logo-monmoniteur.png')}/>
        <Text style={styles.logoText}>
          MON<Text style={{color:'black'}}>ITEUR</Text>
        </Text>
        <Text style={styles.logoSousText}>monmoniteur.fr</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  logoText : {
    marginVertical: 5,
    fontSize:35,
    color:'#09239c',
    textAlign:'center'
  },
  logoSousText : {
    fontSize:20,
    color:'black',
    textAlign:'center'
  }
})
