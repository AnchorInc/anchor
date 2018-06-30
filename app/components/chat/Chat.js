import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';


import { Header } from '../header';
import { updateMessages, getMessages } from '../../actions';
import { ChatBubble, Input, StudentRequest, TeacherApproval } from './';

class Chat extends Component {
  componentWillMount() {
    this.props.getMessages('SDjf09n23rjDSA0FAjs');
  }

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date().getTime(),
      direction: 'right',
      id: (Math.floor((Math.random() * 1000) + 1)).toString(),
      senderName: this.props.user.displayName,
      senderImageURL: this.props.user.photoURL,
      recipientID: this.props.user.uid,
    };
    this.props.updateMessages(messageData, 'SDjf09n23rjDSA0FAjs');
    setTimeout(() => this.list.scrollToEnd({ animated: false }), 200);
  }

  renderMessages = ({ item }) => {
    return <ChatBubble message={item} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title='Kobe Bryant' />
        <FlatList
          keyboardShouldPersistTaps='always'
          data={this.props.messages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'flex-end', flexGrow: 1 }}
          keyExtractor={message => message.id}
          renderItem={this.renderMessages}
          ref={(ref) => { this.list = ref; }}
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
