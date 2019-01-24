import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Item
  } from 'react-native';
import {
  FormLabel,
  FormInput
} from 'react-native-elements';
import {
  ImagePicker,
  Permissions
} from 'expo';

import {auth, db, fb } from '../Firebase/Firebase';
import styles from '../Styles/Style'

class ViewMission extends React.Component {
  constructor() {
    super();
    this.permis = db.ref('autoecoles/'+auth.currentUser.uid+ '/typePermisSelect');
    this.autoecoleMission = db.ref('autoecoles/'+auth.currentUser.uid+'/missions');
    this.auto = db.ref('autoecoles/'+auth.currentUser.uid+'/missions/2019-01-11');
      this.state = {
        missions: [],
        objectmission:{},
        KeyCurrentMission:'',
        EndDate:'',
        EndHour:'',
        StartDate:'',
        StartHour:''

    }
        this.moniteur = db.ref('autoecoles/'+auth.currentUser.uid);
        this.autoecole = db.ref('autoecoles/'+auth.currentUser.uid);
        this.permis = db.ref('autoecoles/'+auth.currentUser.uid+ '/typePermisSelect');
        this.state = {
          typePermisSelect: [],
          arrawMissions:[],
          allMission:[]
        };

  }


    componentDidMount() {
      this.getDataUser();

    }

getDataUser(){
    this.setState({
    userName: auth.currentUser.displayName
    })
    try{
      this.moniteur.on('value', (snap) => {
        this.setState({
         arrawMissions:snap.val().Missions,
        })
      })
    } catch (error) {
      console.log('yeeeesss')
    }

  }



getMission(){
    if(this.state.arrawMissions){
      var output=[]
      var newarr = Object.keys(this.state.arrawMissions)
      var count = Object.keys(this.state.arrawMissions).length
      for(let i=0;i<count;i++){
        this.state.keyCurrentMission = newarr[i]
        var tempItem = (<View key={i}><Text><Text style={customs.titleMission} >Missions{i+1}{'\n'}</Text>
            <Text>Début de mission : {this.state.arrawMissions[newarr[i]].StartDate }{'\n'}</Text>
            <Text> Horaire : {this.state.arrawMissions[newarr[i]].StartHour}{'\n'}</Text>
            <Text>Fin de mission : {this.state.arrawMissions[newarr[i]].EndDate}{'\n'}</Text>
            <Text>Horaire : {this.state.arrawMissions[newarr[i]].EndHour}{'\n'}</Text>
            <Text>Permis demandé(s){'\n'}</Text>
            <Text>{this.state.arrawMissions[newarr[i]].typePermisSelect}</Text>
          </Text><TouchableOpacity onPress={this.DeleteMission.bind(this,newarr[i])}><Text> Je supprime !</Text></TouchableOpacity></View>)
          output[i] = (tempItem)
      }
      return <View>{output}</View>
    } else {
        return <Text>Je n'ai plus de mission pour le moment</Text>
      }
}


  DeleteMission (keyMission){
    console.log('keyMission',keyMission)
      db.ref('autoecoles/'+auth.currentUser.uid+'/Missions/'+keyMission).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }


  render(){
    return(
      <ScrollView>
        <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>
          <View><Text style={customs.title} >Mes missions</Text>
          </View>{this.getMission()}
        </ImageBackground>
      </ScrollView>
    )
  }
}

export default ViewMission


const customs = StyleSheet.create({
  picture:{
    width: 128,
    height: 128,
    marginVertical: 15,
    borderRadius: 64,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  titleMission:{
    textAlign:'center',
    justifyContent:'center',
    color: 'blue',
    fontSize: 20,
    marginVertical:10
  },
  title:{
    textAlign:'center',
    justifyContent:'center',
    fontSize:32,
    marginVertical:15
  }

})
