import React, { Component } from 'react';
import { View, Modal, Text, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../config';

const { width, height } = Dimensions.get('window');

class ErrorMessage extends Component {
  render() {
    const { containerStyle, textContainerStyle, textStyle, buttonStyle, buttonTextStyle } = styles;

    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType='fade'
        onRequestClose={() => { console.log('modal close'); }}
      >
        <View style={containerStyle}>
          <View style={textContainerStyle}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text style={textStyle}>{this.props.message}</Text>
            </View>
            <TouchableOpacity style={buttonStyle} onPress={this.props.onPress}>
              <Text style={buttonTextStyle}>{this.props.button1Text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  containerStyle: {
    width,
    height,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerStyle: {
    backgroundColor: colors.primary.normal,
    width: 0.8 * width,
    height: 0.3 * width,
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'avenir_roman',
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: colors.secondary.normal,
    width: 0.8 * width,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
  },
};

export { ErrorMessage };
