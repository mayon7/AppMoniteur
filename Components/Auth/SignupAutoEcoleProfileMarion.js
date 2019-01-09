import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity
  } from 'react-native';

import Logo from '../../Components/Logo';

export default class Signup extends React.Component {
  render(){
    return(
      <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>

        <View style={styles.form}>

          <View style={styles.AlignAttribut}>
            <Text style={styles.title}>Votre profil</Text>
          </View>

         <Text style={styles.attribut}>Nom</Text>
          <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
          />
         <Text style={styles.attribut}>Prénom</Text>
         <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
          />
         <Text style={styles.attribut}>Email</Text>
         <TextInput style={styles.inputBox}
                     underlineColorAndroid='rgba(0,0,0,0)'
          />
          <Text style={styles.attribut}>Mot de passe</Text>
          <TextInput style={styles.inputBox}
                      underlineColorAndroid='rgba(0,0,0,0)'
           />
          <Text style={styles.attribut}>Téléphone fixe</Text>
          <TextInput style={styles.inputBox}
                      underlineColorAndroid='rgba(0,0,0,0)'
          />
          <Text style={styles.attribut}>Portable</Text>
          <TextInput style={styles.inputBox}
                      underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>
        <View style={styles.AlignAttribut}>
          <TouchableOpacity onPress={this.onSignupPress} style={styles.button}>
            <Text style={styles.buttonText}>SUIVANT</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  AlignAttribut:{
    justifyContent:'center',
    alignItems: 'center'
  },

  title:{
    fontSize:25,
    fontWeight: 'bold',
    marginTop:5,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },

  inputBox: {
    width:350,
    height:40,
    borderRadius: 5,
    borderColor:'rgba(0,0,0,0.3)',
    borderWidth:1,
    backgroundColor:'white',
    fontSize:5,
    marginBottom:20

  },
  form:{
    marginLeft:20,
    marginTop:10
  },
  attribut:{
    fontSize:15,
    color:'black'
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'white',
    textAlign:'center',
    justifyContent:'center',
    alignItems: 'center'

  },
  button:{
    backgroundColor:'rgba(14,43,170,1)',
    borderRadius:5,
    width:300,
    paddingVertical:10
  }



});
