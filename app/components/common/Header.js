import React from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import HeaderProfileButton from './HeaderProfileButton';

const { width, height } = Dimensions.get('window');

const Header = ({ title }) => {
return (
    <View style={styles.containerStyle}>
        <Text style={styles.headerStyle}>
            {title}
        </Text>
        <View style={styles.buttonContainerStyle}>
            <HeaderProfileButton />
        </View>
    </View>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: '#01152d',
        justifyContent: 'space-between',
        alignContent: 'center',
        height: 0.08 * height,
        paddingTop: (Platform.OS === 'ios') ? 15 : 0,
        flexDirection: 'row',
    },
    headerStyle: {
        fontSize: 20,
        fontFamily: 'avenir_heavy',
        color: '#fff',
        paddingLeft: 0.05 * width,
        alignSelf: 'center',
    },
    buttonContainerStyle: {
        paddingTop: 0.25 * 0.07 * height,
        paddingRight: 0.05 * width,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
};

export default Header;
