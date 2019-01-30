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

class MoniteurViewAllMission extends React.Component {
  constructor() {
    super();
    this.permis = db.ref('autoecoles');
    this.MyLocalisation = db.ref('moniteurs/'+auth.currentUser.uid+'/Localisation');
    this.state = {
          typePermisSelect: [],
          arrawMissions:[],
          allMission:[],
          lat:'',
          lng:'',
          city:'',
          unit:"K",
          anfray:[],
          lat1:47.190616,
          lng1:-1.569382,
          lat2:43.297225,
          lng2:5.37297,
          idEcole:'',
          idMission:'',
          caca:'',
          pipi:''

        };
  }

    componentDidMount() {
      this.getDataUser();
    }

getDataUser(){
    this.setState({
    userName: auth.currentUser.displayName
    })

      this.permis.on('value', (snap) => {
        this.setState({
         arrawMissions:snap.val(),
        })
      }),

      this.MyLocalisation.on('value', (snap) => {
        this.setState({
          anfray:snap.val(),
          lat:snap.val().lat,
          lng:snap.val().lng,
          city:snap.val().city
        })
      })
  }

/*CALCUL DE DISTANCE*/

distance(lat1, lon1, lat2, lon2, unit) {
     if ((lat1 == lat2) && (lon1 == lon2)) {
       return 0;
     }
     else {
       var radlat1 = Math.PI * lat1/180
       var radlat2 = Math.PI * lat2/180
       var theta = lon1-lon2;
       var radtheta = Math.PI * theta/180;
       var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
       if (dist > 1) {
         dist = 1;
       }
       dist = Math.acos(dist);
       dist = dist * 180/Math.PI;
       dist = dist * 60 * 1.1515;
       if (unit=="K") { dist = dist * 1.609344 }
       if (unit=="N") { dist = dist * 0.8684 }
       console.log('distance',dist)
     } return dist
}

/*RECUPERATION MISSIONS EN FONCTION DE LA DISTANCE*/

getMission = () =>{

    if(this.state.arrawMissions){
        var output=[]
        var tempItem =''
        var idAutoEcole = Object.keys(this.state.arrawMissions)
        this.state.caca = idAutoEcole
        this.state.pipi=Array(idAutoEcole.length)
        var idMission=Array(idAutoEcole.length)
        var nbAutoEcole = Object.keys(this.state.arrawMissions).length
        var latAuto = ''
        var lngAuto = ''
        var isMissionInDistance=0;
        for(let i=0;i<nbAutoEcole;i++){
         if(this.state.arrawMissions[idAutoEcole[i]].Missions && this.state.lat) {
             latAuto = this.state.arrawMissions[idAutoEcole[i]].Localisation.lat;
             lngAuto = this.state.arrawMissions[idAutoEcole[i]].Localisation.lng;
             var dist = this.distance(this.state.lat,this.state.lng,latAuto,lngAuto,this.state.unit)
             if (dist < 200){
                idMission[i] = Object.keys(this.state.arrawMissions[idAutoEcole[i]].Missions)
                this.state.pipi[i] = idMission
                 for(let y=0;y<idMission[i].length;y++){
                   isMissionInDistance++;
                    var tmp_array = this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[i][y]].typePermisSelect
                    console.log('MAMAMIA',idMission[i])
                    console.log("TestAnfray : ",i," - ",idAutoEcole[i]," - ",y," : ",idMission[i][y])
                    tempItem = (<View style={customs.MissionView}><Text>
                    <Text style={customs.MissionName} >{this.state.arrawMissions[idAutoEcole[i]].firstname }{'\n'}</Text>
                    <Text>{this.state.arrawMissions[idAutoEcole[i]].Localisation.city}{'\n'}{'\n'}</Text>
                    <Text style={{fontWeight: 'bold'}}>Début de mission :</Text><Text> {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[i][y]].StartDate }{'\n'}</Text>
                    <Text style={{fontWeight: 'bold'}}>Horaire :</Text><Text> {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[i][y]].StartHour}{'\n'}{'\n'}</Text>
                    <Text style={{fontWeight: 'bold'}}>Fin de mission :</Text><Text> {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[i][y]].EndDate}{'\n'}</Text>
                    <Text style={{fontWeight: 'bold'}}>Horaire :</Text><Text> {this.state.arrawMissions[idAutoEcole[i]].Missions[idMission[i][y]].EndHour}{'\n'}{'\n'}</Text>
                    <Text style={{fontWeight: 'bold'}}>Permis demandé(s){'\n'}</Text>
                    <Text>{tmp_array}{'\n'}</Text>
                    <Text style={{paddingVertical:'15'}}>{}</Text>
                    </Text><TouchableOpacity style={customs.Touchable} onPress={() => this._addMissionInterested(idAutoEcole[i],idMission[i][y])}><Text style={{color: 'blue'}}> Je me propose !</Text></TouchableOpacity></View>)
                    output[isMissionInDistance]= (tempItem)
                   }
              }
          }
        }
        if(isMissionInDistance==0) { return <View><Text style={customs.NoMission}>Pas de missions pour le moment, revenez plus tard !</Text></View>}

        return <View>{output}</View>
    } else {
        return <Text>Pas de missions pour le moment</Text>
      }
}

/*ALERTE VALIDATION PROPOSITION MISSION*/

alertSend(){
  Alert.alert(
    'Proposition Envoyée !',
    "Plus qu'à attendre la confirmation de l'auto école ! :)",
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  )
}

/*AJOUT MISSIONS DEMANDEES TABLEAU DE BORD*/

_addMissionInterested(idauto,idmission){
  console.log('LAAAAAAAAA',idauto)
  console.log('LAAAAAAAAA',idmission)
  this.alertSend();
  db.ref('moniteurs/' + auth.currentUser.uid + "/MyMissions/" + idauto + idmission).update({
    idMission:idmission,
    idauto:idauto
  })
}
  render(){
    return(
      <ScrollView>
        <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>
          <View style={customs.View}>
          <Text style={customs.title} >Les missions disponibles</Text>
          <Text>Les missions sont selectionnées selon votre localisation</Text>
          </View>{this.getMission()}
        </ImageBackground>
      </ScrollView>
    )
  }
}


export default MoniteurViewAllMission


const customs = StyleSheet.create({
  View:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize:32,
    marginVertical:15
  },
  MissionView:{
    backgroundColor:'white',
    marginVertical:15,
    padding:5,
    width:210,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  MissionName:{
    fontSize:20
  },
  NoMission:{
    fontSize:20,
    marginVertical:40,
    marginHorizontal:15
  },
  Touchable:{
    width:150,
    height:25,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginVertical:15,
    alignItems: 'center',
    justifyContent:'center'
  }

})
