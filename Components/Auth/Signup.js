import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity
  } from 'react-native';

import styles from '../../Styles/Style'

export default class Signup extends React.Component {

  render(){
    return(
      <ImageBackground source={require('../../Images/accueil.jpg')} style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignupAE')} style={styles.button}>
           <Text style={styles.buttonText}>Je suis une auto-école</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignupMI')} style={styles.button}>
           <Text style={styles.buttonText}>Je suis un moniteur indépendant</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }

}
