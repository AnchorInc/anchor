import React from 'react';
import { TouchableOpacity, Dimensions, Image, View } from 'react-native';
import * as colors from '../../config/data';

const { width } = Dimensions.get('window');

const HeaderProfileButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles1.containerStyle}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/anchorapp-feed3.appspot.com/o/businessman.png?alt=media&token=07b61f18-1ca9-4bc2-be84-9e48b1ea9fd8' }}
          style={styles1.profileStyle}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles1 = {
  profileStyle: {
    width: 0.05 * width,
    height: 0.05 * width,
    resizeMode: 'cover',
  },
  containerStyle: {
    width: 0.07 * width,
    height: 0.07 * width,
    borderRadius: (0.08 * width) / 2,
    backgroundColor: colors.LIGHT_GRAY,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default HeaderProfileButton;
