import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const { width } = Dimensions.get('window');

const Input = ({ label, icon }) => {
  return (
    <View style={styles.containerStyle}>
      <Icon size={24} name={icon} color='#000' style={styles.iconStyle} />
      <TextInput style={styles.inputStyle} placeholder={label} placeholderTextColor='#000' underlineColorAndroid='transparent' />
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#d8d8d8',
    width: 0.9 * width,
    height: 0.1 * width,
    borderRadius: 5,
    margin: 15,
  },
  inputStyle: {
    width: 0.9 * width,
    alignSelf: 'center',
    padding: 10,
  },
  iconStyle: {
    alignSelf: 'center',
    padding: 10,
  },
};

export default Input;
