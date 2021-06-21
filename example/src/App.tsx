import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import ChatBar from 'react-native-chat-bar';

export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();
  //
  // React.useEffect(() => {
  //   ChatBar.multiply(3, 7).then(setResult);
  // }, []);

  return (
    <>
      <SafeAreaView style={styles.zeroFlex} />
      <View style={styles.container}>
        <Text>ABC</Text>
      </View>
      <ChatBar />
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
