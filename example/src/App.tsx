import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import ChatBar from 'react-native-chat-bar';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.zeroFlex} />
      <View style={styles.container}>
        <Text>CHAT BAR UI</Text>
      </View>
      <ChatBar primaryColor={'blue'} placeholder={'Lets talk!'} />
      <SafeAreaView style={styles.zeroFlex} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  zeroFlex: {
    flex: 0,
  },
});
