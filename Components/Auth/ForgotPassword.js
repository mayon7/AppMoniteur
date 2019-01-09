import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground
  } from 'react-native'
import {
  FormLabel, 
  FormInput,
  CheckBox
} from 'react-native-elements'

import {auth} from '../../Firebase/Firebase'
import {db} from '../../Firebase/Firebase'

import styles from '../../Styles/Style'

class ForgotPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {email:'', error:'', success:'', loading:false}
  }

  _forgotPasswordPress() {
    const email = this.state.email;
    auth.sendPasswordResetEmail(email)
    .then(() => {
       this.setState({success:"Un email vient de vous être envoyé", loading:false})
    }).catch(() => {
       this.setState({error:"Email non existant", loading:false})
    });
  }

  _renderButtonOrLoading(){
    if(this.state.loading){
      return <Text> Chargement </Text>
    }
    return <View>
    <TouchableOpacity onPress={this._forgotPasswordPress.bind(this)} style={styles.button}>
      <Text style={styles.buttonText}>Envoyer</Text>
    </TouchableOpacity>
    </View>
  }
    
  render(){
    return(
      <ImageBackground source={require('../../Images/accueil.jpg')} style={styles.container}>
        <View style={styles.container}>
          <Text>Réinitialiser le mot de passe</Text>
          <TextInput 
           style={styles.inputBox}
           value = {this.state.email}
           underlineColorAndroid='rgba(0,0,0,0)'
           placeholder='Email'
           onChangeText={email => this.setState({email})}
          />
          <Text>{this.state.error}</Text>  
          <Text>{this.state.success}</Text>   
          {this._renderButtonOrLoading()}
        </View>
      </ImageBackground>
    )
  }

}

export default ForgotPassword

