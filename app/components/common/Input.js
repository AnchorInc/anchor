import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import { LIGHT_GRAY } from '../../config';

const { width } = Dimensions.get('window');

const Input = ({ placeholder, defaultVal }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        defaultValue={defaultVal}
        style={styles.textInputStyle}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  textInputStyle: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 4,
    width: 0.9 * width,
    height: 45,
  },
};

export { Input };
