import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { mapStyle } from "../constants/mapStyle";

export default class Map extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          customMapStyle={mapStyle}
          style={{flex: 1}}
          showsUserLocation={true}  
          defaultZoom ={1500}
          zoomEnabled={true}  
          zoomControlEnabled={true}
           >  </MapView>
      </View>
    );
  }
}