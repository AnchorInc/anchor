import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';


import { Header } from '../header';
import { updateMessages, getMessages } from '../../actions';
import { ChatBubble, Input } from './';
import { colors } from '../../config';

const { width, height } = Dimensions.get('window');


class Chat extends Component {

  constructor(props) {
    super(props);
    this.state={
      messages: [],
    };
  }

  // componentWillMount() {
  //   this.props.getMessages('test');
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ messages: this.state.messages.concat(nextProps.messages) });
  //   console.log(this.state.messages);
  // }

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date().getTime(),
      direction: 'right',
      id: (Math.floor((Math.random() * 1000) + 1)).toString(),
      user: {
        displayName: this.props.user.displayName,
      },
    };
    this.setState({
      messages: this.state.messages.concat([messageData]),
    });
    setTimeout(() => this.list.scrollToEnd({ animated: false }), 200);
    // this.props.updateMessages(messageData, 'test');
  }

  renderMessages = ({ item }) => {
    console.log('Item', item);
    return <ChatBubble message={item} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title='Kobe Bryant' />
        <FlatList
          keyboardShouldPersistTaps='always'
          data={this.state.messages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'flex-end', flexGrow: 1 }}
          keyExtractor={message => message.id}
          renderItem={this.renderMessages}
          ref={(ref) => { this.list = ref; }}
        />
        <Modal
          animationType='slide'
          transarent={false}
          visible={this.state.firstTime}
          onRequestClose={() => {}}
          style={{ width: 0.8 * width, height: 0.6 * height, margin: 10 }}
        >
          <View style={{ margin: 10 }}>
            <Text>Comments</Text>
            <TextInput
              placeholder='Type Here...'
              returnKeyType='done'
              multiline={true}
              error={this.state.errors}
              style={{ backgroundColor: 'green', borderRadius: 4 }}
            />
          </View>
        </Modal>
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
