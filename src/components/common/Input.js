import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const width = Dimensions.get('window'); 

const Input = ({ label, icon }) => {
  return (
    <View style={styles.containerStyle}>
      <Icon size={24} name={icon} color='#000' style={styles.iconStyle} />
      <TextInput returnKeyLabel="Search" style={styles.inputStyle} placeholder={label} placeholderTextColor='#000' underlineColorAndroid='transparent' />
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#d8d8d8',
    width: 0.7 * width,
    height: 0.05 * width,
  },
  inputStyle: {
    width: 0.7 * width,
    height: 0.05 * width,
    alignSelf: 'center',
    padding: 10,
  },
  iconStyle: {
    alignSelf: 'center',
    padding: 10,
  },
};

export default Input;