import React from 'reactn';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ChatDefaultLayout,
  ChoosingOption,
  ChoosingUser,
  conversationService,
  GlobalUser,
  SearchBar,
} from 'react-native-chat-bar';
import GroupIcon from '../../asserts/GroupIcon';
import { API_BASE_URL } from '../../config/api-consts';
import { conversationRepository } from '../../repository/conversation-repository';
import type { GlobalState } from '../../app/global-state';

const CreateNewConversation: FC<PropsWithChildren<CreateNewConversationProps>> =
  (props: PropsWithChildren<CreateNewConversationProps>): ReactElement => {
    const { navigation, route } = props;

    const [listUser, refreshListUser, , loadingListUser, searchUser] =
      conversationService.useListGlobalUser(
        conversationRepository.singleListGlobalUser
      );

    const [currentUser] = React.useGlobal<GlobalState, 'globalUser'>(
      'globalUser'
    );

    const renderItem: ListRenderItem<GlobalUser> = React.useCallback(
      ({ item, index }: ListRenderItemInfo<GlobalUser>) => {
        return (
          <ChoosingUser
            key={index}
            user={item}
            navigation={navigation}
            API_BASE_URL={API_BASE_URL}
            currentGlobalUser={currentUser}
            chatDetailScreen={'ChatDetail'}
            createConversationRepository={conversationRepository.create}
          />
        );
      },
      [currentUser, navigation]
    );

    const handleGoToChatList = React.useCallback(() => {
      navigation.navigate('ChatList');
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
        <SearchBar isRoundedBorder={false} onChangeText={searchUser} />
        <View style={styles.container}>
          <ChoosingOption
            isPrimaryTitle={false}
            onPress={handleGoToCreateGroupConversation}
            title={'Create New Group'}
            icon={<GroupIcon />}
          />

          <Text style={{ marginVertical: 8 }}>Suggestion</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={listUser}
            keyExtractor={(item, index) =>
              item?.id?.toString() + index.toString()
            }
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={() => {}}
            refreshing={loadingListUser}
            onRefresh={refreshListUser}
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
