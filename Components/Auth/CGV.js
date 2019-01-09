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
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Modal
  } from 'react-native'
import {
  FormLabel, 
  FormInput,
  CheckBox
} from 'react-native-elements'

import {auth} from '../../Firebase/Firebase'
import {db} from '../../Firebase/Firebase'

import styles from '../../Styles/Style'

class CGV extends React.Component {
  constructor(props){
    super(props)
    this.state = {modalVisible: false, switchCheck: false}
    this._stateSwitch = this._stateSwitch.bind(this)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

   _stateSwitch(){
      this.props.checkedFunction();   
      this.setState({
        switchCheck: !this.state.switchCheck
     });
   }

  render(){
    return(    
    <View>   
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.button}>
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View  style={customs.containerForm}> 
          <Text style={customs.terms} onPress={() => {this.setModalVisible(true)}}>J'accepte les CGV</Text>
            <Switch
              style={customs.switchTerms}
              onValueChange={() => this._stateSwitch()}
              value={this.state.switchCheck}
            />
        </View>
    </View>
    )
  }

}

export default CGV


const customs = StyleSheet.create({
  containerForm: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent : 'center'
  },
  terms: {
    width: 150,
    fontWeight: 'bold',
    color: 'blue'
  },
  termsMoniteur: {
    width: 150
  },
  switchTerms : {
    width: 120
  }
})