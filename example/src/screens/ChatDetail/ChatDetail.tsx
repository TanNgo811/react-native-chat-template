import React from 'reactn';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatBar,
  ChatDefaultLayout,
  ConversationDetail,
  ConversationMessage,
  ConversationMessageFilter,
  ConversationParticipant,
  ImagePickerResponse,
  messageConversationServices,
  signalRService,
} from 'react-native-chat-bar';
import InformationIcon from '../../asserts/InformationIcon';
import { messageConversationRepository } from '../../repository/message-conversation-repository';
import type { GlobalState } from '../../app/global-state';
import { ACTION_RESET_FILTER, ListAction } from 'react-native-chat-bar';
import { conversationRepository } from '../../repository/conversation-repository';

const ChatDetail: FC<PropsWithChildren<ChatDetailProps>> = (
  props: PropsWithChildren<ChatDetailProps>
): ReactElement => {
  const { navigation, route } = props;

  const { conversation } = route?.params;

  const handleGoToChatInformation = React.useCallback(() => {
    navigation.navigate('ChatInformation', {
      conversation: conversation,
    });
  }, [conversation, navigation]);

  const [listMessage, , , , , , , , dispatch, ,] =
    messageConversationServices.useListMessages(
      messageConversationRepository.list,
      messageConversationRepository.count
    );

  const [totalMessages, setTotalMessages] = React.useState<
    ConversationMessage[]
  >([]);

  const [comingMessage] = React.useGlobal<GlobalState, 'comingMessage'>(
    'comingMessage'
  );

  const [prepMessage] = messageConversationServices.usePrevious(comingMessage);

  React.useEffect(() => {
    setTotalMessages([...listMessage]);
  }, [listMessage]);

  React.useEffect(() => {
    if (prepMessage?.id !== comingMessage?.id) {
      if (comingMessage?.conversationId === conversation.id) {
        setTotalMessages([comingMessage, ...totalMessages]);
      }
    }
  }, [
    comingMessage,
    conversation,
    conversation.conversationId,
    listMessage,
    prepMessage,
    totalMessages,
  ]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const action: ListAction<
        ConversationMessage,
        ConversationMessageFilter,
        'conversationId'
      > = {
        type: ACTION_RESET_FILTER,
        newFilter: {
          ...new ConversationMessageFilter(),
          conversationId: {
            equal: conversation.id,
          },
        },
      };

      dispatch(action);
    });
    return function cleanup() {
      unsubscribe();
    };
  }, [conversation.id, dispatch, navigation]);

  const [currentGlobalUser] = React.useGlobal<GlobalState, 'globalUser'>(
    'globalUser'
  );

  const [text, setText] = React.useState<string>('');

  const handleChangeText = React.useCallback((text: string) => {
    setText(text);
  }, []);

  const handleSendText = React.useCallback(async () => {
    if (text === '' || text === null) {
    } else {
      await signalRService.send(
        conversation?.id,
        currentGlobalUser?.id,
        JSON.stringify({
          message: text,
          imagePath: null,
          filePath: null,
        })
      );

      await handleChangeText('');
    }
  }, [conversation?.id, currentGlobalUser?.id, handleChangeText, text]);

  const handleChooseImage = React.useCallback(
    async (images: ImagePickerResponse[]) => {
      await conversationRepository
        .multiUploadFile(images)
        .then((results) => {
          //
          signalRService.send(
            conversation?.id,
            currentGlobalUser?.id,
            JSON.stringify({
              message: null,
              imagePath: results.map((result) => result.path),
              filePath: null,
            })
          );
        })
        .catch((e) => console.log(e));
    },
    [conversation, currentGlobalUser]
  );

  const handleDeleteMessageComponent = React.useCallback(
    (message: ConversationMessage) => {
      setTotalMessages(totalMessages.filter((item) => item.id !== message.id));
    },
    [totalMessages]
  );

  return (
    <ChatDefaultLayout
      route={route}
      navigation={navigation}
      title={
        conversation && conversation.name
          ? conversation.name
          : conversation.conversationParticipants
          ? conversation.conversationParticipants.map(
              (item: ConversationParticipant, index: number) => {
                return (index ? ', ' : '') + item?.globalUser?.displayName;
              }
            )
          : 'Conversation'
      }
      left={'back-button'}
      right={
        <TouchableOpacity activeOpacity={1} onPress={handleGoToChatInformation}>
          <InformationIcon />
        </TouchableOpacity>
      }
      rightType={'icon'}
    >
      <View style={styles.container}>
        <ConversationDetail
          listAnswer={totalMessages}
          currentGlobalUser={currentGlobalUser}
          onDeleteMessage={handleDeleteMessageComponent}
        />
      </View>
      <ChatBar
        placeholder={'Lets talk!'}
        onChangeText={handleChangeText}
        onSendMessage={handleSendText}
        handleChooseImage={handleChooseImage}
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
