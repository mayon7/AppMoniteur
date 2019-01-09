import { createStackNavigator,createAppContainer } from 'react-navigation'

import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import SignupAE from '../Components/Auth/SignupAE';
import SignupMI from '../Components/Auth/SignupMI';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import Logo from '../Components/Logo';
import Home from '../Components/Home';
import ProfileMI from '../Components/ProfileMI';


  const MenuNavigation = createStackNavigator ({
  	Login: {
  		screen: Login
  	},
    Signup:{
      screen: Signup
    },
    SignupAE:{
      screen: SignupAE
    },
    SignupMI:{
      screen: SignupMI
    },
    Home:{
      screen: Home
    },
    ForgotPassword:{
      screen: ForgotPassword
    },
    ProfileMI:{
      screen: ProfileMI
    }
  })

const App = createAppContainer(MenuNavigation);

export default App
