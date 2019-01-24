import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  CheckBox,
  Modal
} from 'react-native'

import { StackNavigator, Header} from 'react-navigation'
import DateTimePicker from 'react-native-modal-datetime-picker';

import {auth,db, fb} from '../Firebase/Firebase'
import styles from '../Styles/Style'
import moment from 'moment'

class CreateMission extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    isDateTimePickerVisible:false,
    isDateTimePickerVisible2:false,
    date:'',
    date2:'',
    chosenDate:'',
    choseHour:'',
    chosenData2:'',
    choseHour:'',
    input:'',
    check:true,
    typePermisSelect: [],
    missions: [],
    modalVisible: false,
    showMe:false
  }
  this.userData = db.ref('users/'+auth.currentUser.uid)
  this.UserList = db.ref('users/')
  this.autoecoles = db.ref('autoecoles/'+auth.currentUser.uid);

  };

/***************AJOUT MISSION *************/

  _ajoutMission = () => {
    db.ref('autoecoles/' + auth.currentUser.uid + "/Missions/" + this.state.chosenDate + '-'+ this.state.choseHour).update({
      StartDate:this.state.chosenDate,
      StartHour:this.state.choseHour,
      EndDate:this.state.chosenDate2,
      typePermisSelect: this.state.typePermisSelect,
      EndHour:this.state.choseHour2}).then(() => {
        console.log('succeed')
        this.props.navigation.navigate('ViewMission')
        this.setState({showMe:false,})
      })
      .catch(function(error){
        console.log('failed')
      })

  }

  /******************CALENDAR SHOW**************************/

  _showDateTimePicker = () => {
    this.setState({
    isDateTimePickerVisible: true
    })
  };
  _showDateTimePicker2 = () => {
   this.setState({
        isDateTimePickerVisible2: true
      })
    };

/*******************CALENDAR HIDE**************************/

  _hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
    })
  };

  _hideDateTimePicker2 = () => {
  this.setState({
          isDateTimePickerVisible2: false,
        })
  };

/****************CALENDAR - GET DATA******************************/

  _handleDatePicked = (date) => {
      this.setState({
          chosenDate:moment(date).format('YYYY-MM-DD')
      })
      this.setState({
          choseHour:moment(date).format('HH:mm')
      })
        this._hideDateTimePicker();
    };


    _handleDatePicked2 = (date2) => {
        this.setState({
            chosenDate2:moment(date2).format('YYYY-MM-DD')
        })
        this.setState({
            choseHour2:moment(date2).format('HH:mm')
        })
          this._hideDateTimePicker2();
      };
/********************PERMIS*************************/

  renderPermis(id){
    var index;
    if(this.state.typePermisSelect !== 'undefined'){
      index = this.state.typePermisSelect.indexOf(id);
    } else {
      index= -1
    }
    return <View>
      <TouchableOpacity
      onPress={() => {if (index !== -1) {
        this.setState({typePermisSelect: this.state.typePermisSelect.filter((_, i) => i !== index)});
      } else {
        this.setState(prevState => ({typePermisSelect: [...prevState.typePermisSelect, id]}));
      }console.log(this.state.typePermisSelect)}}
      style={(index !== -1) ? styles.buttonPermisSelected : styles.buttonPermis}>
        <Text style={(index !== -1) ? styles.buttonPermisTextSelected : styles.buttonTextPermis}>{id}</Text>
      </TouchableOpacity>
    </View>
  }

  /********************VERIF*****************/
  systemError = () => {
    if(this.state.chosenDate){
      console.log('Success')
    } else {
    return <Text>Pas de date</Text>}
    if(this.state.choseHour){
      console.log('success')
    } else {
        return <Text>Pas de date</Text>
    }
    if(this.state.chosenData2){
      console.log('Success')
    } else {
      return <Text>Pas de date</Text>
    }
    if(this.state.choseHour2){
      console.log('Success')
    } else {
        return <Text>Pas de date</Text>
    }
  }

renderModal = () => {
  if(this.state.chosenDate && this.state.choseHour && this.state.chosenDate && this.state.choseHour2){
    return <Text>BRAVOOOOO</Text>
  } else {
  return console.log('nope')
  }
}
  render(){

    return(
    <KeyboardAvoidingView
     behavior='position'>
      <ImageBackground source={require('../Images/accueil.jpg')} style={styles.container}>
        <View style={styles.container}>
          <Text style={customs.titleText}>Programmez votre mission en quelques secondes ! </Text>
          <Text style={customs.StateText}>1. Date(s) de mission  </Text>
          <View style={customs.DateMission}>
              <Button
                onPress={this._showDateTimePicker}
                title="Début de mission"
                />
            <Text style={{fontSize: 20 }}>Date : <Text style={{fontWeight: 'bold'}}>{this.state.chosenDate} </Text>  Heure :<Text style={{fontWeight: 'bold'}}> {this.state.choseHour} </Text></Text>
            </View>
          <View style={customs.DateMission}>
            <Button
              onPress={this._showDateTimePicker2}
              title="Fin de mission"
              />
            <Text style={{fontSize: 20}}>Date :<Text style={{fontWeight: 'bold'}}>{this.state.chosenDate2} </Text>  Heure : <Text style={{fontWeight: 'bold'}}>{this.state.choseHour2}</Text> </Text>
          </View>

          <Text style={customs.StateText}>2. Permis exigé(s)</Text>
          <View style={{flex:1, flexWrap: 'wrap', flexDirection:'row', width:300}}>
           {this.renderPermis('A1')}
           {this.renderPermis('AD')}
           {this.renderPermis('AP')}
           {this.renderPermis('B')}
           {this.renderPermis('B1')}
           {this.renderPermis('C')}
           {this.renderPermis('D')}
           {this.renderPermis('E(B)')}
           {this.renderPermis('E(C)')}
           {this.renderPermis('E(D)')}
           {this.renderPermis('Bateau')}
         </View>

         <Button
            onPress={() => {
              this.setState({
                showMe:true
              })
            }}

            title="Valider"
            />
            <Modal visible={this.state.showMe}
            onRequestClose={()=>console.warn('this is a close request')}
            >
              <View style={customs.modalView}>

                <Text style={customs.titleText}>Récapitulatif de ta mission</Text>
                <Text>Début de mission</Text>
                <Text style={{fontSize: 20 }}>Date : <Text style={{fontWeight: 'bold'}}>{this.state.chosenDate} </Text>  Heure :<Text style={{fontWeight: 'bold'}}> {this.state.choseHour} </Text></Text>
                <Text>Fin de mission</Text>
                <Text style={{fontSize: 20}}>Date :<Text style={{fontWeight: 'bold'}}>{this.state.chosenDate2} </Text>  Heure : <Text style={{fontWeight: 'bold'}}>{this.state.choseHour2}</Text> </Text>
                <Text> Permis exigés</Text>
                <Text>{this.state.typePermisSelect}</Text>
                <View style={customs.containerButton}>
                  <View style={customs.buttonContainer}>
                    <Button
                    onPress={this._ajoutMission}
                    title="Je valide !"
                    />
                  </View>
                  <View style={customs.buttonContainer}>
                    <Button
                    onPress={() => {this.setState({showMe:false,})}}
                    title="Je modifie !"
                    />
                  </View>
                </View>
              </View>
            </Modal>
            <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode={'datetime'}
                      is24Hour={true}
                    />

        <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible2}
                      onConfirm={this._handleDatePicked2}
                      onCancel={this._hideDateTimePicker2}
                      mode={'datetime'}
                      is24Hour={true}
                    />

        </View>
      </ImageBackground>
    </KeyboardAvoidingView>

    )
  }


}export default CreateMission

const customs = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    marginVertical:15
  },
  StateText: {
    color: 'blue',
    fontSize: 20,
    marginVertical:10
  },
  DateText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  DateMission:{
    borderColor: 'blue',
    borderWidth: 1,
    marginVertical:10
  },
  modalView:{

    justifyContent:'center',
    alignItems:'center',
    height:400
  },
  closeText:{
    backgroundColor:'#333',
    color:'white',
  },
  containerButton:{
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonContainer:{
    flex:1,
    marginHorizontal:20
  }

})
