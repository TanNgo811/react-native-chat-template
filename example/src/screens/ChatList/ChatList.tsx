import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatDefaultLayout,
  ConversationItem,
  SearchBar,
} from 'react-native-chat-bar';
import PlusIcon from '../../asserts/PlusIcon';

const ChatList: FC<PropsWithChildren<ChatListProps>> = (
  props: PropsWithChildren<ChatListProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoToChatDetail = React.useCallback(() => {
    navigation.navigate('ChatDetail');
  }, [navigation]);

  const handleGoToCreateNewConversation = React.useCallback(() => {
    navigation.navigate('CreateNewConversation');
  }, [navigation]);

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

          <ConversationItem onPress={handleGoToChatDetail} active={true} />

          <ConversationItem onPress={handleGoToChatDetail} active={true} />

          <ConversationItem onPress={handleGoToChatDetail} active={true} />
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
