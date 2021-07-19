import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatBar,
  ChatDefaultLayout,
  ConversationDetail,
} from 'react-native-chat-bar';
import ListAnswer from '../../sample/ListAnswer.json';
import InformationIcon from '../../asserts/InformationIcon';

const ChatDetail: FC<PropsWithChildren<ChatDetailProps>> = (
  props: PropsWithChildren<ChatDetailProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoToChatInformtion = React.useCallback(() => {
    navigation.navigate('ChatInformation');
  }, [navigation]);

  return (
    <ChatDefaultLayout
      route={route}
      navigation={navigation}
      title={'Username'}
      left={'back-button'}
      right={
        <TouchableOpacity activeOpacity={1} onPress={handleGoToChatInformtion}>
          <InformationIcon />
        </TouchableOpacity>
      }
      rightType={'icon'}
    >
      <View style={styles.container}>
        <ConversationDetail listAnswer={ListAnswer} />
      </View>
      <ChatBar
        setPickedImages={() => {}}
        placeholder={'Lets talk!'}
        onSendImages={() => {}}
        testString={'test string yaa'}
      />
    </ChatDefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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

export interface ChatDetailProps extends StackScreenProps<any> {
  //
}

ChatDetail.defaultProps = {
  //
};

ChatDetail.propTypes = {
  //
};

export default ChatDetail;
