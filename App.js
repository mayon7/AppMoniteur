/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';

import Navigation from './Navigation/Navigation'


export default class App extends React.Component {
  render() {
    return (
        <Navigation/>
    );
  }
}
