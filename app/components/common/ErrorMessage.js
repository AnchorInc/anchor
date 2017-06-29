import React from 'react';
import { View, Modal, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as colors from '../../config/data';

const { width, height } = Dimensions.get('window');

const ErrorMessage = (props) => {
  return (
    <Modal
      visible={props.visible}
      transparent
      animationType='fade'
    >
      <View style={styles.modalStyle}>
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>{props.error}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity>
              <Text style={styles.buttonTextStyle}>{props.button1Text}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonTextStyle}>{props.button2Text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalStyle: {
    width,
    height,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: colors.MAIN,
    width: 0.8 * width,
    height: 0.3 * width,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 2,
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'avenir_roman',
    textAlign: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'avenir_book',
    padding: 10,
  },
};

export default ErrorMessage;
