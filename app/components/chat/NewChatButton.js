import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';

const NewChatButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Icon color='white' name={icon} size={25} />
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: colors.secondary.normal,
    width: 58,
    height: 58,
    borderRadius: 29,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 50,
    right: 20,
    flexDirection: 'row',
  },
};

export { NewChatButton };
