import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button
  } from 'react-native'


class Distance extends React.Component {
  constructor(props) {
                super(props);
                this.state = {
                    lat1:47.190616,
                    lng1:-1.569382,
                    lat2:47.671461,
                    lng2:-2.779596,
                    unit:"K"
                }
            }

  componentDidMount() {
              this.distance(this.state.lat1,this.state.lng1,this.state.lat2,this.state.lng2,this.state.unit);
            }

     distance(lat1, lon1, lat2, lon2, unit) {
      	if ((lat1 == lat2) && (lon1 == lon2)) {
      		return 0;
      	}
      	else {
      		var radlat1 = Math.PI * lat1/180;
      		var radlat2 = Math.PI * lat2/180;
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
      		return dist;
      	}
      }

       hello = () => {
        console.log('yipikaeyyy')
      }

  render(){
    return(
      <View  style={{ flex: 1 }}>
      </View>

    )

  }

}

export default Distance
