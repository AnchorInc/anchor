import React from 'react';
import { View, TouchableOpacity, Platform, Text, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { MAIN_COLOR, STATUS_BAR_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

const ProfileHeader = ({ title, button1, button2 }) => {
  return (
    <View style={{ width }}>
      <StatusBar
        backgroundColor={STATUS_BAR_COLOR}
      />
      <View style={styles.containerStyle}>
        <TouchableOpacity>
          <Icon name={button1} size={25} color='white' style={styles.logoStyle} />
        </TouchableOpacity>
        <Text style={styles.headerStyle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.textStyle}>{button2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: MAIN_COLOR,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 0.08 * height,
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    flexDirection: 'row',
  },
  headerStyle: {
    fontSize: 20,
    fontFamily: 'avenir_light',
    color: 'white',
    alignSelf: 'center',
  },
  logoStyle: {
    padding: 0.05 * width,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 14,
    fontFaily: 'avenir_light',
    color: 'white',
    padding: 0.05 * width,
    textTransform: 'uppercase',
  },
};

export default ProfileHeader;
