import React, { Component } from 'react';
import { View } from 'react-native';

import { Header } from '../header';
import { BatchList } from '.';

class Batches extends Component {
    onPress() {
        const signUpMessage = {
            message: `Hello ${this.props.navigation.state.params.teacherName}, I am a ${this.props.user.grade} Grader who is interested `;

        };
    }

    render() {
        return (
            <View>
                <Header title='Batches' onPress={this.onPress.bind(this)} />
                <BatchList teacherUID={this.props.navigation.state.params.teacherUID} />
            </View>
        );
    }
}

export { Batches };
