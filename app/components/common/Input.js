import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

import { LIGHT_GRAY, DARK_GRAY } from '../../config';

const { width } = Dimensions.get('window');

const Input = ({ placeholder, defaultVal, getValue, onEnd }) => {
  const {
    containerStyle,
    textStyle,
    textInputStyle,
  } = styles;
  return (
    <View>
      <View style={containerStyle}>
        <Text style={textStyle}>
          {placeholder.toUpperCase()}
        </Text>
        <TextInput
          defaultValue={defaultVal}
          style={textInputStyle}
          onChangeText={getValue}
          onEndEditing={onEnd}
          underlineColorAndroid='transparent'
        />
      </View>
      <View style={{ width: width * 0.8, height: StyleSheet.hairlineWidth, backgroundColor: LIGHT_GRAY }} />
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    color: DARK_GRAY,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  textInputStyle: {
    paddingBottom: 10,
  },
};

export { Input };
