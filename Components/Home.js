import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground
  } from 'react-native'
import {
  FormLabel, 
  FormInput
} from 'react-native-elements'

import {auth} from '../Firebase/Firebase'
import {db} from '../Firebase/Firebase'
import styles from '../Styles/Style'

class Home extends React.Component {
  constructor() {
        super()
  
    this.validatedAccount = db.ref('users/'+auth.currentUser.uid).child('validatedAccount')
    this.state = {validatedAccount: ''}
    }

    componentWillMount() {
      this.validatedAccount.on('value',  snap => {
        this.setState({
          validatedAccount: snap.val()
          })
        })
    }

  _completeProfile() {
    alert(this.state.validatedAccount)
      if(this.state.validatedAccount == '1'){
        return 'Profil en règle'
      } else {
        return 'Veuillez compléter votre profil'
      }
  }
  

  _readName() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        return auth.currentUser.displayName
      } 
    })
  }

  render() {
    return(
      <View>
        <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>
          <Text>Bonjour {this._readName()}</Text>
          <Text>{this._completeProfile()}</Text>
        </ImageBackground>
      </View>
    )
  }
}

export default Home

