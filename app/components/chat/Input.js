import React, { Component } from 'react';
import { TextInput, View, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';

const { width } = Dimensions.get('window');

class Input extends Component {
  state={
    message: '',
    blank: true,
    textBarHeight: 54,
    position: 'absolute',
    marginBottom: 0,
  };

  componentWillMount() {
   this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
   this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillReceiveProps() {
   this.input.focus();
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
   if (this.state !== 'relative') {
     this.setState({
       position: 'relative',
       marginBottom: 10,
     });
   }
  }

  keyboardWillHide() {
   if (this.state !== 'absolute') {
     this.setState({
       position: 'absolute',
       marginBottom: 0,
     });
   }
  }

  render() {
    return (
      <View style={{ bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', position: this.state.position }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderWidth: 0.25,
            borderColor: '#eeeeee',
            elevation: 3,
            width: 0.8 * width,
            margin: 10,
            borderRadius: (0.8 * width) / 2,
            minHeight: 44,
            maxHeight: 100,
          }}
        >
          <TextInput
            style={styles.inputStyle}
            placeholder="Type a message"
            placeholderTextColor='gray'
            underlineColorAndroid='transparent'
            autoCapitalize='words'
            multiline
            value={this.state.message}
            onChangeText={(message) => {
              if (message !== '') {
                this.setState({ message, blank: false });
              } else {
                this.setState({ message, blank: true });
              }
            }}
            returnKeyType='send'
            ref={(ref) => { this.input = ref; }}
            selectionColor='black'
            autoFocus
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.input.clear();
            this.setState({ message: '', blank: true });
            this.props.onPress(this.state.message);
          }}
          disabled={this.state.blank}
          style={{
            height: 44,
            width: 44,
            borderRadius: 22,
            backgroundColor: (this.state.blank) ? colors.other.darkGray : colors.secondary.blue,
            elevation: 3,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <Icon name='send' size={24} color='white' />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    width: 0.75 * width,
    alignSelf: 'center',
    padding: 10,
    fontFamily: 'avenir_bold',
    fontSize: 16,
    color: 'black',
    paddingLeft: 20,
  },
};

export { Input };
