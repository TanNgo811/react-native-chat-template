import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatBar,
  ChatDefaultLayout,
  ConversationDetail,
} from 'react-native-chat-bar';
import ListAnswer from '../../sample/ListAnswer.json';

const GroupChatDetail: FC<PropsWithChildren<GroupChatDetailProps>> = (
  props: PropsWithChildren<GroupChatDetailProps>
): ReactElement => {
  const { navigation, route } = props;

  return (
    <ChatDefaultLayout
      route={route}
      navigation={navigation}
      title={'Group Chat'}
      left={'back-button'}
      right={<View />}
      rightType={'icon'}
    >
      <View style={styles.container}>
        <ConversationDetail listAnswer={ListAnswer} />
      </View>
      <ChatBar
        setPickedImages={() => {}}
        placeholder={'Lets talk!'}
        onSendImages={() => {}}
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

export interface GroupChatDetailProps extends StackScreenProps<any> {
  //
}

GroupChatDetail.defaultProps = {
  //
};

GroupChatDetail.propTypes = {
  //
};

export default GroupChatDetail;
