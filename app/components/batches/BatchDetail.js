import React from 'react';
import { Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const BatchDetail = ({ batch }) => {
    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
            <Text style={{ color: 'black', fontFamily: 'AvenirLTStd-Heavy', fontSize: 15 }}>
                {batch.place}
            </Text>
            <MapView
              liteMode
              initialRegion={{
                latitude: batch.geolocation.latitude,
                longitude: batch.geolocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{ width: 0.95 * width, height: 250 }}
            />
        </ScrollView>
    );
};

export { BatchDetail };
