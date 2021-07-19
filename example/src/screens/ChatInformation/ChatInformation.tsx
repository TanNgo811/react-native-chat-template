import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  ChatDefaultLayout,
  ConversationItem,
  SearchBar,
} from 'react-native-chat-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

const ChatInformation: FC<PropsWithChildren<ChatInformationProps>> = (
  props: PropsWithChildren<ChatInformationProps>
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
        title={''}
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
            <Text>Apply</Text>
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

export interface ChatInformationProps extends StackScreenProps<any> {
  //
}

ChatInformation.defaultProps = {
  //
};

ChatInformation.propTypes = {
  //
};

export default ChatInformation;
