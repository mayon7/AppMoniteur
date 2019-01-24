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
import {db, fb} from '../Firebase/Firebase'
import styles from '../Styles/Style'

class Home extends React.Component {
  constructor() {
        super()

    this.userData = db.ref('users/'+auth.currentUser.uid)
    this.UserList = db.ref('users/')
    this.userDataLocalisation = db.ref('users/'+auth.currentUser.uid+'/localisation')
    this.state = {
      address:'',
      lat:'',
      lng:'',
      siret:''

    }
  }

  getUserList(){
    console.log(this.UserList);
  }



/*Récupération donnée*/
    getDataUser(userData) {
      this.userDataLocalisation.on('value',  (snap) => {

        this.setState({
          lng:snap.val().longitude,
          lat:snap.val().latitude
        });
        })

    }

    componentDidMount() {
      this.getDataUser(this.userData)
    }

  _ajoutLocalisation() {
    db.ref('users/' + auth.currentUser.uid + "/localisation").update({longitude:"25"})
    db.ref('users/' + auth.currentUser.uid + "/localisation").update({latitude:"26"})
  }


  render() {
    return(
      <View>
        <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>
        <Button title="Add Localisation !" onPress={this.getDataUser}/>
              <Button title="UserList !" onPress={this.getUserList}/>
        <Text>Siret : {this.state.siret}</Text>
        <Text>lng : {this.state.lng}</Text>
        <Text>lng : {this.state.lat}</Text>
        </ImageBackground>
      </View>
    )
  }
}

export default Home
