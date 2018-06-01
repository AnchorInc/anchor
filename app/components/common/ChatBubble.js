import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '../../config';

const ChatBubble = ({ message, timestamp }) => {
  return (
    <View>
      <Text>
        {message}
      </Text>
    </View>
  );
};

// const styles = {
//   bubbleStyle: {
//     border
//   },
//   messageTextStyle: {
//
//   }
// };

export { ChatBubble };
