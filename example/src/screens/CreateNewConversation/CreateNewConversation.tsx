import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatDefaultLayout,
  ChoosingOption,
  ChoosingUser,
  SearchBar,
} from 'react-native-chat-bar';
import GroupIcon from '../../asserts/GroupIcon';

const CreateNewConversation: FC<PropsWithChildren<CreateNewConversationProps>> =
  (props: PropsWithChildren<CreateNewConversationProps>): ReactElement => {
    const { navigation, route } = props;

    const handleGoToChatList = React.useCallback(() => {
      navigation.navigate('ChatList');
    }, [navigation]);

    const handleGoToChatDetail = React.useCallback(() => {
      navigation.navigate('ChatDetail');
    }, [navigation]);

    const handleGoToCreateGroupConversation = React.useCallback(() => {
      navigation.navigate('CreateNewGroupConversation');
    }, [navigation]);

    return (
      <ChatDefaultLayout
        route={route}
        navigation={navigation}
        title={'New Conversation'}
        left={<View />}
        rightType={'other'}
        right={
          <TouchableOpacity activeOpacity={1} onPress={handleGoToChatList}>
            <Text
              style={{
                color: '#BC2C3D',
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        }
        headerContainerColor={'white'}
        headerTitleColor={'#200E32'}
      >
        <SearchBar isRoundedBorder={false} />
        <View style={styles.container}>
          <ChoosingOption
            isPrimaryTitle={false}
            onPress={handleGoToCreateGroupConversation}
            title={'Create New Group'}
            icon={<GroupIcon />}
          />

          <Text style={{ marginVertical: 8 }}>Suggestion</Text>

          <ChoosingUser
            onSelectUser={handleGoToChatDetail}
            user={{
              avatar: undefined,
              displayName: 'abc',
            }}
            API_BASE_URL={''}
          />

          <ChoosingUser
            onSelectUser={handleGoToChatDetail}
            user={{
              avatar: undefined,
              displayName: 'abc',
            }}
            API_BASE_URL={''}
          />
        </View>
      </ChatDefaultLayout>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: 36,
    height: 36,
  },
});

export interface CreateNewConversationProps extends StackScreenProps<any> {
  //
}

CreateNewConversation.defaultProps = {
  //
};

CreateNewConversation.propTypes = {
  //
};

export default CreateNewConversation;
