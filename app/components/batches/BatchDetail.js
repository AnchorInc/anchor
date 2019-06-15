import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../config/styles';

const { width } = Dimensions.get('window');

class BatchDetail extends Component {
    renderJoinButton() {
        if (this.props.batch.status === 'OPEN') {
            return (
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon name='plus' size={20} color={colors.primary.normal} style={{ padding: 5}} />
                    <Text style={{ paddingTop: 5, paddingLeft: 5, paddingBottom: 10, color: colors.primary.normal, fontFamily: 'AvenirLTStd-Heavy', fontSize: 18 }}>
                        Join
                    </Text>
                </TouchableOpacity>
            );
        } return null;
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
                <Text style={{ alignSelf: 'flex-start', paddingLeft: 0.075 * width, color: 'black', fontFamily: 'AvenirLTStd-Heavy', fontSize: 15 }}>
                    {this.props.batch.subject}
                </Text>
                <View style={{ paddingBottom: 3, width: 0.85 * width, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ color: 'black', fontFamily: 'AvenirLTStd-Heavy', fontSize: 15 }}>
                        {this.props.batch.place}
                    </Text>
                    <LinearGradient
                      colors={(this.props.batch.status === 'OPEN') ? ['#07D067', '#2AF598'] : ['#e53935', '#e35d5b']}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        height: 25,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'white', fontFamily: 'AvenirLTStd-Heavy', fontSize: 12, padding: 5 }}>{this.props.batch.status}</Text>
                    </LinearGradient>
                </View>
                <Text style={{ alignSelf: 'flex-start', paddingLeft: 0.075 * width, paddingBottom: 10, color: 'black', fontFamily: 'AvenirLTStd-Heavy', fontSize: 15 }}>
                    {this.props.batch.time}
                </Text>
                <MapView
                  liteMode
                  initialRegion={{
                    latitude: this.props.batch.geolocation.latitude,
                    longitude: this.props.batch.geolocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  style={{ width: 0.85 * width, height: 200, marginBottom: 10 }}
                />
                {this.renderJoinButton()}
                <View style={{ alignSelf: 'flex-end', width: 0.925 * width, height: StyleSheet.hairlineWidth, backgroundColor: '#b5b5b5' }} />
            </View>
        );
    }
}

export { BatchDetail };
