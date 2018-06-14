import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';


import { Header } from '../header';
import { updateMessages, getMessages } from '../../actions';
import { ChatBubble, Input } from './';


class Chat extends Component {
  state={
    messages: [],
  };

  componentWillMount() {
    this.props.getMessages('test');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ messages: this.state.messages.concat(nextProps.chats) });
    console.log(this.state.messages);
  }

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date().getTime(),
      direction: 'right',
      id: Math.random(1000).toString(),
      user: {
        displayName: this.props.user.displayName,
      },
    };
    if (message !== '') {
      this.setState({
        messages: this.state.messages.concat([messageData]),
      });
    }
    setTimeout(() => this.list.scrollToEnd({ animated: false }), 200);
    this.props.updateMessages(messageData, 'test');
  }

  renderMessages = ({ item }) => {
    return <ChatBubble message={item} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title={this.props.navigation.state.params.chat.displayName} />
        <FlatList
          keyboardShouldPersistTaps='always'
          data={this.state.messages}
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
  let chats;
  if (state.user.user) {
    user = state.user.user;
  }
  if (state.chat.chats) {
    chats = state.chat.chats;
  }
  return { user, chats };
};

export default connect(mapStateToProps, { updateMessages, getMessages })(Chat);
