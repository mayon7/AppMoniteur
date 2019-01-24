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
  Alert
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

class AfficheMission extends React.Component {
  constructor() {
    super();
    this.state = {
      tel:'',
      anfray:'',
      missions: [],
      objectmission:{},
      banane:[],
      KeyCurrentMission:'',
      gege:[],
      EndDate:'',
      EndHour:'',
      StartDate:'',
      StartHour:''
    };

    this.moniteur = db.ref('autoecoles/'+auth.currentUser.uid);
    this.autoecole = db.ref('autoecoles/'+auth.currentUser.uid);
    this.pomme = db.ref('autoecoles/'+auth.currentUser.uid+'/missions');
    this.permis = db.ref('autoecoles/'+auth.currentUser.uid+ '/typePermisSelect');
    this.state = {
      typePermisSelect: [],
      AllMission:[]
    };

    /*this.state = {missions:'', validatedAccount:''};*/

  }

  renderPermis(id){
  var index;
}


    /*  this.permis.once('value', (snap) => {
  if(snap.exists()){
    this.setState({
       typePermisSelect: snap.val().typePermisSelect
    });
  }
})*/
  getDataUser(){
        this.setState({
        userName: auth.currentUser.displayName
      })

          this.moniteur.on('value', (snap) => {
          this.setState({
          tel:snap.val().address,
          objectmission:snap.val().missions,
          banane:snap.val().missions,
          typePermisSelect: snap.val().missions

          /*missions:JSON.stringify(snap.val().missions)*/
        });
        console.log('yolo')
        console.log(this.state.typePermisSelect)

        var newarr = Object.keys(this.state.typePermisSelect)
        var count = Object.keys(this.state.typePermisSelect).length
        console.log('yo',count)
          for(let i=0;i<count;i++){
          console.log(newarr[i])
          this.state.KeyCurrentMission = newarr[i]

          console.log('current',this.state.KeyCurrentMission)

          this.moniteurM = db.ref('autoecoles/'+auth.currentUser.uid+'/missions');
          this.moniteurM.on('value', (snap) => {
          this.setState({
          tel:newarr[i],
          /*missions:JSON.stringify(snap.val().missions)*/
        });
      })
          this.moniteurMM = db.ref('autoecoles/'+auth.currentUser.uid+'/missions/'+this.state.tel);
          console.log("singe",this.state.tel)
          this.moniteurMM.on('value', (snap) => {
          this.setState({
          EndDate:snap.val().EndDate,
          EndHour:snap.val().EndHour,
          StartDate:snap.val().StartDate,
          StartHour:snap.val().StartHour
          /*missions:JSON.stringify(snap.val().missions)*/
        });
      })
      console.log('fin',this.state.EndDate)
      console.log('debut',this.state.StartDate)
      console.log('finH',this.state.EndHour)
      console.log('debutH',this.state.StartHour)
    }


 })
    
  }
    /*var count = Object.keys(this.state.objectmission).length
    console.log('yo',count)

  /*   var count = Object.keys(this.state.missions).length;
    console.log(count)
   const userStr = JSON.stringify(snap.val().missions)*/

  /*  console.log('gege !',this.state.objectmission)*/
            /*tel:this.state.tel*/
    /*this.permis.once('value', (snap) => {
      if(snap.exists()){
        this.setState({
           typePermisSelect: snap.val().typePermisSelect
        });
      }

    })*/
    DeleteMission(){

        db.ref('autoecoles/'+auth.currentUser.uid+'/missions/').remove()
        .then(function() {
          console.log("Remove succeeded.")
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
    }

    getKeyMission(){


      var newarr = Object.keys(this.state.typePermisSelect)
     console.log(newarr)
      console.log(newarr[1])
      this.KeyCurrentMission = newarr
    }

    lopp(){
      this.pomme.on('value', (snap) => {
        this.setState({
          banane:snap.val(),
          objectmission:snap.val().missions,
        });
      })
    }

AfficheAllMission(){

  console.log('ggggggggg',this.state.KeyCurrentMission)
  var newarr = Object.keys(this.state.typePermisSelect)
  var count = Object.keys(this.state.typePermisSelect).length

    console.log('pomelo')
    this.chien = db.ref('autoecoles/'+auth.currentUser.uid+'/missions/'+newarr[1]);



return(
  <View><Text>YO{this.state.KeyCurrentMission}</Text></View>
)

}
    // Recuperation value in Storage
    componentDidMount() {
      this.getDataUser()

    }

  /*  var api2= this.state.objectmission

    this.moniteur.ref('missions').remove()


  /*this.moniteur.once('value').then((snapshot) =>  {
    console.log(snapshot.val());
  })
      return console.log('tatate',api2[1])
      api2.map(function(key, val, array){
        console.log('h=keykey',key)
        return key;
      });*/

    /*  this.state.objectmission.map((userData) => {
      /*console.log('pata',userData.EndHour);
    });

    var indeex= "1"
      return(
         <View>
         {api2.map((v,index)=>{
              return <View key={index}><Text>{v.indeex}</Text></View>
         })}
         </View>

       )*/
  render(){
    return(

      <ScrollView>
        <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>

          <Text style={{fontSize:20, fontWeight:'bold'}}>Hello</Text>
          <View style={{flex:1, flexWrap: 'wrap', flexDirection:'row', width:300}}>


          </View>
        {this.AfficheAllMission()}

        </ImageBackground>
      </ScrollView>
    )
  }
}

export default AfficheMission


const customs = StyleSheet.create({
  picture:{
    width: 128,
    height: 128,
    marginVertical: 15,
    borderRadius: 64,
    overflow: 'hidden',
    resizeMode: 'contain',
  }
})
