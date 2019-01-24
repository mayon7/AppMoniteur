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

import {auth, db, fb } from '../Firebase/Firebase';
import styles from '../Styles/Style'
import {hello} from '../Components/Distance'

class MoniteurViewAllMission extends React.Component {
  constructor() {
    super();
    this.permis = db.ref('autoecoles');
    this.autoecole = db.ref('autoecoles/'+auth.currentUser.uid);
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
      this.permis.on('value', (snap) => {
        this.setState({
         arrawMissions:snap.val(),
        })
      })
    } catch (error) {
      console.log('yeeeesss')
    }

  }

getMission(){
    if(this.state.arrawMissions){
        var output=[]
        var tempItem =''
        var idAutoEcole = Object.keys(this.state.arrawMissions)
        var nbAutoEcole = Object.keys(this.state.arrawMissions).length
        console.log('idAutoEcole',idAutoEcole)
        console.log('nbautoécole',nbAutoEcole)
        for(let i=0;i<nbAutoEcole;i++){
         if(this.state.arrawMissions[idAutoEcole[i]].Missions) {
           console.log('rrr',i)
           var idMission = Object.keys(this.state.arrawMissions[idAutoEcole[i]].Missions)
           console.log('idMission',idMission)
              console.log('idMission',idMission.length)
           for(let y=0;y<idMission.length;y++){
              tempItem = (<View key={y}  style={customs.MissionView} ><Text>
                 <Text style={customs.MissionName} >{this.state.arrawMissions[idAutoEcole[i]].firstname }{'\n'}</Text>
                 <Text>Début de mission : {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].StartDate }{'\n'}</Text>
                 <Text> Horaire : {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].StartHour}{'\n'}</Text>
                 <Text>Fin de mission : {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].EndDate}{'\n'}</Text>
                 <Text>Horaire : {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].EndHour}{'\n'}</Text>
                 <Text>Permis demandé(s){'\n'}</Text>
                 <Text>{this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].typePermisSelect}</Text>
               </Text><TouchableOpacity><Text> Je me propose !</Text></TouchableOpacity></View>)
                 console.log('Date',this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].StartDate)
                 console.log('Hour',this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].StartHour)
                 console.log('Date2',this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].EndDate)
                 console.log('Hour2',this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[y]].EndHour)
               output.push(tempItem)
             }
           }
        }
        return <View>{output}</View>
    } else {
        return <Text>Pas de missions pour le moment</Text>
      }
}

getCityMyUser(){
  console.log(this.state.arrawMissions[idAutoEcole[i]])
}


  render(){
    return(
      <ScrollView>
        <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>
          <View><Text style={customs.title} >Les missions disponibles</Text>
          </View>{this.getMission()}
        </ImageBackground>
      </ScrollView>
    )
  }
}


export default MoniteurViewAllMission


const customs = StyleSheet.create({
  title:{
    textAlign:'center',
    justifyContent:'center',
    fontSize:32,
    marginVertical:15
  },
  MissionView:{
    backgroundColor:'white',
    marginVertical:15,
    padding:5,
    width:200
  },
  MissionName:{
    color:'blue',
    fontSize:20
  }

})
