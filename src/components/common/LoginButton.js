import React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const LoginButton = (props) => {
  const { containerStyle, textStyle, iconStyle } = styles;

  return (
    <TouchableOpacity style={containerStyle} onPress={props.onPress}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Icon name={props.iconName} style={iconStyle} />
      </View>

      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={textStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#bf3b3b',
    marginBottom: 0.1 * 0.4 * height,
    width: 0.88 * width,
    height: 0.2 * 0.4 * height,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: '#FFF',
    fontSize: 15,
    paddingRight: 40,
  },
  iconStyle: {
    fontSize: 35,
    color: '#fff',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
};

export default LoginButton;
