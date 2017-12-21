import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import { LIGHT_GRAY } from '../../config';

const { width } = Dimensions.get('window');

const Input = ({ placeholder, cb, defaultVal }) => {
  return (
    <View style={{ padding: 10, paddingBottom: 20 }}>
      <TextInput placeholder={placeholder} defaultValue={defaultVal} style={styles.textInputStyle} onSubmitEditing={cb} underlineColorAndroid='transparent' />
    </View>
  );
};

const styles = {
  textInputStyle: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 4,
    width: 0.95 * width,
    height: 45,
  },
};

export { Input };
