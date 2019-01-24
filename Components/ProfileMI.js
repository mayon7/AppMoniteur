import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView
  } from 'react-native';
import {
  FormLabel,
  FormInput
} from 'react-native-elements';
import {
  ImagePicker,
  Permissions
} from 'expo';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {auth, db, fb } from '../Firebase/Firebase';
import GetLocalisation from '../Components/GetLocalisation';

class ProfileMI extends React.Component {
  constructor() {
    super();
    this.moniteur = db.ref('users/'+auth.currentUser.uid).child('moniteurOuAutoEcole')
    this.state = {
      moniteurOuAutoEcole: '',
      image: null,
      uploading: false,
      address:null,
      lat:null,
      lng:null
    }
  }

  _getAdd(data){
     console.log("add",data);
     this.setState(
         {
           lat: data.geometry.location.lat,//  selected coordinates latitude
           lng:data.geometry.location.lng, //  selected coordinates longitute

         }
       );
    console.log("this.state.coordinates",this.state.lat,this.state.lng); ///
  }

  // Recuperation value in Storage
  componentWillMount() {
    this.moniteur.on('value',  snap => {
      this.setState({
         moniteurOuAutoEcole: snap.val()
      });
    });
  }

  // Read value in Auth
  _readName() {
    auth.onAuthStateChanged(function(user) {
      if(user) {
        return auth.currentUser.displayName;
      }
    });
  }

  // Check if Profile is complete
  _completeProfile(){
    if(this.state.validatedAccount === '1'){
      return 'Votre profil est complet';
    }
    else if (this.state.validatedAccount === '0'){
      return 'Votre profil est en cours de validation par notre équipe';
    }
    else {
      return 'Votre profil est incomplet';
    }
  }

  // Access to camera roll and select a picture
  _onChooseImagePress = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(status);
    if(status === 'granted'){
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      console.log(result);
      this._handleImagePicked(result);
    }
  }

  // Access to camera and take a picture
  _takeAPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
          exif: true,
          allowsEditing: false,
          quality: 0.7,
          base64: true
        });
      this._handleImagePicked(result);
    }
  }

  // Recuperation picture
  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        uploadUrl = await this.uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry 😞');
    } finally {
      this.setState({ uploading: false });
    }
  }

  // Storage picture
  uploadImageAsync = async (uri) => {
    console.log("ok");
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = fb.storage().ref().child(auth.currentUser.uid + "/cartegrise");
    const snapshot = await ref.put(blob);
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  render(){
    let { image } = this.state;
    return(
      <KeyboardAvoidingView
       behavior='position'>
      <View>
        <Image/>
        <Text>{this._completeProfile()}</Text>
        <Text>Nom et Prénom : {this._readName()}</Text>
        <Text>Localisation :</Text>
        <Text>Années d'expérience dans les auto-écoles : {this._readName()}</Text>
        <Text>Tarifs : </Text>
        <Text>Siret :</Text>

          <Button title="Autorisation d'enseignement" onPress={this._onChooseImagePress}/>

        <Text>Carte grise du véhicule :</Text>
        <Text>Attestation d'assurance du véhicule :</Text>
        <Text>Attestation RC Pro :</Text>
        <GooglePlacesAutocomplete
          placeholder="La ville de votre auto école"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data,details = null) => {
            var data = details;
            this._getAdd(data);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyBfHihQQAB9G8TTbnSYCvB9lDzOuqGg1qA',
            language: 'fr', // language of the results
            types: '(cities)', // default: 'geocode'
          }}

          debounce={200}
        />
      </View>
      </KeyboardAvoidingView>
    )
  }
}

export default ProfileMI;
