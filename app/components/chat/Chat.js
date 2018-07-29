import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { Header } from '../header';
import { updateMessages, getMessages } from '../../actions';
import { ChatBubble, Input } from './';
import { userTypes, firebasePaths } from '../../config';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      myLatestMessage: {},
      teacherUID: (this.props.user.type === userTypes.TEACHER) ? this.props.user.uid : this.props.navigation.state.params.chat.uid,
      studentUID: (this.props.user.type === userTypes.STUDENT) ? this.props.user.uid : this.props.navigation.state.params.chat.uid,
    };
    this.props.getMessages(this.state.teacherUID, this.state.studentUID);
  }

  componentWillMount() {
    AndroidKeyboardAdjust.setAdjustResize();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.messages.length === 0) {
      const messages = nextProps.messages.reverse();
      this.setState({ messages });
    } else {
      nextProps.messages.forEach((message) => {
        if (this.state.myLatestMessage) {
          if (new Date(message.timeStamp).getTime() !== new Date(this.state.myLatestMessage.timeStamp).getTime()) {
            this.setState({ messages: nextProps.messages.concat(this.state.messages) });
          }
        }
      });
    }
  }

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date(),
      senderName: this.props.user.displayName,
      senderImageURL: this.props.user.photoURL,
      senderID: this.props.user.uid,
      recipientID: this.props.navigation.state.params.chat.uid,
      recipientType: (this.props.user.type === userTypes.STUDENT) ? firebasePaths.TEACHERS : firebasePaths.STUDENTS,
    };
    const messages = [messageData, ...this.state.messages];
    this.setState({ messages, myLatestMessage: messageData });
    this.props.updateMessages(messageData, this.state.teacherUID, this.state.studentUID);
  }

  renderMessages = ({ item }) => {
    return <ChatBubble message={item} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title={this.props.navigation.state.params.chat.title} />
        <FlatList
          keyboardShouldPersistTaps='always'
          data={this.state.messages}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'flex-end', flexGrow: 1 }}
          keyExtractor={() => (Math.floor((Math.random() * 100000000) + 1)).toString()}
          renderItem={this.renderMessages}
          ref={(ref) => { this.messages = ref; }}
        />
        <Input onPress={this.onSend} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let user;
  let messages;
  if (state.user.user) {
    user = state.user.user;
  }
  if (state.chat.messages) {
    messages = state.chat.messages;
  }
  return { user, messages };
};

export default connect(mapStateToProps, { updateMessages, getMessages })(Chat);
