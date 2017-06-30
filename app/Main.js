import React from 'react';
import { View } from 'react-native';
import { Tabs } from './navigation/Router';
import { Header } from './components/common';

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title='Anchor' />
      <Tabs />
    </View>
  );
};

export default Main;
