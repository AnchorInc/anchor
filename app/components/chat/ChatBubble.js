import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';

import { colors } from '../../config';

const ChatBubble = ({ message, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles[message.direction].container}>
        <View style={styles.topContainerStyle}>
          <Text style={styles[message.direction].infoStyle}>
            {message.user.displayName}
          </Text>
          <Text style={styles[message.direction].infoStyle}>
            {moment(message.timeStamp).format('LT')}
          </Text>
        </View>
        <Text style={styles[message.direction].message}>
          {message.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  left: {
    container: {
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      marginTop: 8,
      marginRight: 130,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'flex-start',
      backgroundColor: colors.other.chatBubble,
    },
    message: {
      color: 'black',
      padding: 10,
      paddingTop: 5,
      fontFamily: 'avenir_roman',
      fontSize: 16,
    },
    infoStyle: {
      color: 'black',
      padding: 10,
      paddingBottom: 0,
      fontSize: 12,
      fontFamily: 'avenir_light',
    },
  },
  right: {
    container: {
      borderRadius: 20,
      borderBottomRightRadius: 0,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 130,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'flex-end',
      backgroundColor: colors.secondary.blue,
    },
    message: {
      color: 'white',
      padding: 10,
      paddingTop: 5,
      fontFamily: 'avenir_roman',
      fontSize: 16,
    },
    infoStyle: {
      color: 'white',
      padding: 10,
      paddingBottom: 0,
      fontSize: 12,
      fontFamily: 'avenir_light',
    },
  },
  topContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export { ChatBubble };
