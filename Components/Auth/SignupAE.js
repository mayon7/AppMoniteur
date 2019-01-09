import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Switch,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Modal
  } from 'react-native'
import {
  FormLabel, 
  CheckBox
} from 'react-native-elements'


import { StackNavigator} from 'react-navigation'

import {auth} from '../../Firebase/Firebase'
import {db} from '../../Firebase/Firebase'
import styles from '../../Styles/Style'

import CGV from './CGV'

class SignupAE extends React.Component {
  constructor(props){
    super(props)
    this.state = {userName:'', email:'', password:'', passwordConfirm:'', checked:false, error:'', loading:false}
    this._checkedCGV = this._checkedCGV.bind(this)
    };


  _checkedCGV(){
    return this.setState({
      checked: !this.state.checked
   });
  }

  _onSignupPress() {
    const {email, password, passwordConfirm, checked} = this.state;
    if(password === passwordConfirm){
      if(checked){
        auth.createUserWithEmailAndPassword(email, password)
        .then(() =>{
          auth.currentUser.updateProfile({
             displayName: userName
          });
          db.ref('users/' + auth.currentUser.uid).set({moniteurOuAutoEcole: 'autoecole'})
          this.props.navigation.navigate('Home')
        })
        .catch((error) => {
          this.setState({error:"Problème d'authentification", loading:false})
        })
      } else {
        this.setState({error:'Vous devez accepter les CGV', loading:false})
      }
    } else {
        this.setState({error:'Les mots de passe ne sont pas identiques', loading:false})
    }
  }

  _renderButtonOrLoading(){
    if(this.state.loading){
      return <Text> Loading </Text>
    }
    return <View>
    <TouchableOpacity onPress={this._onSignupPress.bind(this)} style={styles.button}>
      <Text style={styles.buttonText}>Se Connecter</Text>
    </TouchableOpacity>
    </View>
  }
    
  render(){
    return(
      <ImageBackground source={require('../../Images/accueil.jpg')} style={styles.container}>
        <View style={styles.container}>
          <TextInput 
           style={styles.inputBox}
           value = {this.state.userName}
           underlineColorAndroid='rgba(0,0,0,0)'
           placeholder="Nom de l'auto-école"
           onChangeText={userName => this.setState({userName})}
          />
          <TextInput 
           style={styles.inputBox}
           value = {this.state.email}
           underlineColorAndroid='rgba(0,0,0,0)'
           placeholder='Email'
           onChangeText={email => this.setState({email})}
          />
          <TextInput  
           style={styles.inputBox}      
           value = {this.state.password}
           underlineColorAndroid='rgba(0,0,0,0)'
           secureTextEntry
           placeholder='Mot de passe'
           onChangeText={password => this.setState({password})}
          />
          <TextInput  
           style={styles.inputBox}      
           value = {this.state.passwordConfirm}
           underlineColorAndroid='rgba(0,0,0,0)'
           secureTextEntry
           placeholder='Confirmer mot de passe'
           onChangeText={passwordConfirm => this.setState({passwordConfirm})}
          />    
          <CGV checkedFunction={this._checkedCGV}/>
          <Text>{this.state.error}</Text>   
          {this._renderButtonOrLoading()}
        </View>
      </ImageBackground>
    )
  }

}

export default SignupAE