import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import moment from 'moment';

import { colors } from '../../config';

import { TouchableDebounce } from '../../lib';

const { width } = Dimensions.get('window');

const ChatDetail = ({ displayName, imageURL, text, timeStamp, unread, onPress, person }) => {
  return (
    <TouchableDebounce onPress={() => onPress}>
      <View style={{ flexDirection: 'row', padding: 20, paddingRight: 10, alignItems: 'center' }}>
        <Image style={styles.profileStyle} source={{ uri: imageURL }} />
        <View style={{ flexDirection: 'column', width: 0.8 * width }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 0.8 * width }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'avenir_heavy', color: unread ? 'black' : '#7f7f7f', fontSize: 18, padding: 10, paddingBottom: 0 }}>
                {displayName}
              </Text>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: unread ? colors.secondary.blue : 'white', top: 18 }} />
            </View>
            <Text style={styles.timeStyle}>
              {moment(timeStamp).format('h:mm A')}
            </Text>
          </View>
          <Text style={styles.messageStyle} numberOfLines={1}>
            {text}
          </Text>
        </View>
      </View>
      <View style={{ paddingLeft: 20 }}>
        <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
      </View>
    </TouchableDebounce>
  );
};

const styles = {
  profileStyle: {
    width: 0.13 * width,
    height: 0.13 * width,
    borderRadius: (0.13 * width) / 2,
  },
  timeStyle: {
    fontFamily: 'avenir_light',
    color: colors.other.darkGray,
    fontSize: 14,
    padding: 10,
    paddingBottom: 0,
  },
  messageStyle: {
    fontFamily: 'avenir_book',
    color: 'black',
    fontSize: 16,
    padding: 10,
    paddingTop: 5,
  },
};

export { ChatDetail };
