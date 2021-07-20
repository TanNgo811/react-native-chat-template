import React from 'reactn';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatDefaultLayout,
  Conversation,
  ConversationItem,
  conversationService,
  SearchBar,
  signalRService,
} from 'react-native-chat-bar';
import PlusIcon from '../../asserts/PlusIcon';
import { conversationRepository } from '../../repository/conversation-repository';
import type { GlobalState } from '../../app/global-state';
import { globalStateRepository } from '../../repository/global-state-repository';
import { API_BASE_URL, API_SIGNALR_ROUTE } from '../../config/api-consts';

const ChatList: FC<PropsWithChildren<ChatListProps>> = (
  props: PropsWithChildren<ChatListProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoToCreateNewConversation = React.useCallback(() => {
    navigation.navigate('CreateNewConversation');
  }, [navigation]);

  const [listConversation, , , refreshing, , loadMore, handRefresh, , , ,] =
    conversationService.useListConversation(
      conversationRepository.list,
      conversationRepository.count
    );

  const [currentUser] = React.useGlobal<GlobalState, 'user'>('user');

  const [token] = React.useGlobal<GlobalState, 'token'>('token');

  conversationService.useGetCurrentGlobalUser(
    currentUser,
    conversationRepository.getGlobalUser,
    globalStateRepository.saveGlobalUser
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      signalRService
        .hubConnectionSignalr(
          token,
          API_BASE_URL,
          API_SIGNALR_ROUTE,
          globalStateRepository.addTotalMessage
        )
        .then(() => {});
    });
    return function cleanup() {
      unsubscribe();
    };
  }, [navigation, token]);

  const handleGoToChatDetail = React.useCallback(
    (item: Conversation) => {
      navigation.navigate('ChatDetail', {
        conversation: item,
      });
    },
    [navigation]
  );

  const [currentGlobalUser] = React.useGlobal<GlobalState, 'globalUser'>(
    'globalUser'
  );

  const [, , , handleDeleteConversation, ,] =
    conversationService.useConversation(
      currentGlobalUser,
      conversationRepository.create,
      conversationRepository.get,
      conversationRepository.delete,
      conversationRepository.update
    );

  const [totalConversation, setTotalConversation] = React.useState<
    Conversation[]
  >([]);

  React.useEffect(() => {
    setTotalConversation(listConversation);
  }, [listConversation]);

  const handleDeleteConversationComponent = React.useCallback(
    (conversation: Conversation) => {
      setTotalConversation(
        totalConversation.filter((item) => item.id !== conversation.id)
      );
    },
    [totalConversation]
  );

  const handleDelete = React.useCallback(
    async (conversation: Conversation) => {
      await handleDeleteConversationComponent(conversation);
      await handleDeleteConversation(conversation);
    },
    [handleDeleteConversation, handleDeleteConversationComponent]
  );

  const renderItem: ListRenderItem<Conversation> = React.useCallback(
    ({ item }: ListRenderItemInfo<Conversation>) => (
      <ConversationItem
        conversation={item}
        key={item.id}
        onPress={() => {
          handleGoToChatDetail(item);
        }}
        onDeleteConversation={async () => {
          await handleDelete(item);
        }}
      />
    ),
    [handleDelete, handleGoToChatDetail]
  );

  return (
    <>
      <ChatDefaultLayout
        title={'Messages'}
        navigation={navigation}
        route={route}
        left={'back-button'}
        rightType={'icon'}
        right={
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleGoToCreateNewConversation}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 5,
            }}
          >
            <PlusIcon />
          </TouchableOpacity>
        }
      >
        <SafeAreaView style={styles.container}>
          <SearchBar isRoundedBorder={true} />

          <FlatList
            renderItem={renderItem}
            data={totalConversation}
            onRefresh={handRefresh}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: Conversation, index) =>
              item?.id?.toString() + index.toString()
            }
            onEndReached={loadMore}
          />
        </SafeAreaView>
      </ChatDefaultLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export interface ChatListProps extends StackScreenProps<any> {
  //
}

ChatList.defaultProps = {
  //
};

ChatList.propTypes = {
  //
};

export default ChatList;
