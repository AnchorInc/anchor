import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Header } from '../header';
import { updateMessages, getMessages } from '../../actions';
import { ChatBubble, Input } from './';
import { userTypes, firebasePaths } from '../../config';

class Chat extends Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, prevState);
  //   return {
  //     messages: nextProps.messages || [],
  //     teacherUID: prevState.teacherUID,
  //     studentUID: prevState.studentUID,
  //   };
  // }

  state = {
    messages: [],
    teacherUID: (this.props.user.type === userTypes.TEACHER) ? this.props.user.uid : this.props.navigation.state.params.chat.uid,
    studentUID: (this.props.user.type === userTypes.STUDENT) ? this.props.user.uid : this.props.navigation.state.params.chat.uid,
  };

  componentDidMount() {
    this.props.getMessages(this.state.teacherUID, this.state.studentUID);
  }

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date().getTime(),
      senderName: this.props.user.displayName,
      senderImageURL: this.props.user.photoURL,
      senderID: this.props.user.uid,
      recipientID: this.props.navigation.state.params.chat.uid,
      recipientType: (this.props.user.type === userTypes.STUDENT) ? firebasePaths.TEACHERS : firebasePaths.STUDENTS,
    };
    console.log(messageData);
    // this.setState({ messages: this.state.messages.concat([messageData]) });
    this.props.updateMessages(messageData, this.state.teacherUID, this.state.studentUID);
  }

  renderMessages = ({ item }) => {
    return <ChatBubble message={item} />;
  }

  render() {
    console.log(this.props.messages);
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title={this.props.navigation.state.params.chat.title} />
        <FlatList
          enableEmptySections
          keyboardShouldPersistTaps='always'
          data={this.props.messages}
          onContentSizeChange={() => this.messages.scrollToEnd({ animated: false })}
          onLayout={() => this.messages.scrollToEnd({ animated: false })}
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
