import React, { Component } from 'react';
import { View, Text, Button, Dimensions, TextInput, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';


import { Header } from '../header';
import { updateMessages, getMessages } from '../../actions';
import { ChatBubble, Input } from './';

const { width, height } = Dimensions.get('window');


class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      firstTime: true,
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
          transparent
          visible={this.state.firstTime}
          onRequestClose={() => this.setState({ firstTime: false })}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 0.9 * width, height: 0.8 * height, backgroundColor: 'white' }}>
              <View style={{ margin: 10 }}>
                <Text>Comments</Text>
                <TextInput
                  placeholder='Type Here...'
                  returnKeyType='done'
                  multiline
                  underlineColorAndroid='transparent'
                  error={this.state.errors}
                  style={{ backgroundColor: '#d5d5d5', borderRadius: 4 }}
                />
                <Button title='close' onPress={() => this.setState({ firstTime: false })} />
              </View>
            </View>
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
