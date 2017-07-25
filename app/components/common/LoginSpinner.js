import React from 'react';
import { View, Modal, Text, ActivityIndicator, Dimensions } from 'react-native';
import { MAIN_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

const LoginSpinner = (props) => {
  return (
    <Modal visible={props.visible} transparent animationType='fade' onRequestClose={() => {}}>
      <View style={styles.modalStyle}>
        <View style={styles.containerStyle}>
          <ActivityIndicator color='white' size={35} />
          <Text style={styles.textStyle}>{props.title}</Text>
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
    backgroundColor: MAIN_COLOR,
    width: 0.8 * width,
    height: 0.3 * width,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'avenir_heavy',
  },
};

export { LoginSpinner };
