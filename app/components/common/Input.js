import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LIGHT_GRAY } from '../../config';

const { width } = Dimensions.get('window');

const Input = ({ label, icon, cb, rkt }) => {
  return (
    <View style={styles.containerStyle}>
      <Icon size={20} name={icon} color='#555' style={styles.iconStyle} />
      <TextInput style={styles.inputStyle} placeholder={label} placeholderTextColor='#555' underlineColorAndroid='transparent' autoCapitalize='words' onChangeText={cb} returnKeyType={rkt} />
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,
    width: 0.85 * width,
    height: 0.1 * width,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    margin: 5,
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

export { Input };
