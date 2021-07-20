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
  ChoosingUser,
  conversationService,
  GlobalUser,
  SearchBar,
  SelectedUsers,
} from 'react-native-chat-bar';
import LeftArrow from '../../asserts/LeftArrow';
import { RNToasty } from 'react-native-toasty';
import { conversationRepository } from '../../repository/conversation-repository';
import type { GlobalState } from '../../app/global-state';
import { API_BASE_URL } from '../../config/api-consts';

const CreateNewGroupConversation: FC<
  PropsWithChildren<CreateNewGroupConversationProps>
> = (
  props: PropsWithChildren<CreateNewGroupConversationProps>
): ReactElement => {
  const { navigation, route } = props;

  const [currentUser] = React.useGlobal<GlobalState, 'globalUser'>(
    'globalUser'
  );

  const [listUser, refreshListUser, , loadingListUser, searchUser] =
    conversationService.useListGlobalUser(
      conversationRepository.singleListGlobalUser
    );

  const [, handleCreateNewGroupConversation] =
    conversationService.useCreateNewConversation(
      currentUser,
      navigation,
      conversationRepository.create,
      'ChatDetail'
    );

  const handleGoBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [selectedUsers, setSelectedUsers] = React.useState<GlobalUser[]>([]);

  const handleSelectUser = React.useCallback(
    (user: GlobalUser) => {
      let i;
      for (i = 0; i < selectedUsers.length; i++) {
        if (selectedUsers[i].rowId === user.rowId) {
          RNToasty.Show({
            title: 'Bạn đã chọn người dùng này',
          });
          return;
        }
      }
      setSelectedUsers([user, ...selectedUsers]);
    },
    [selectedUsers]
  );

  const handleRemoveSelectedUser = React.useCallback(
    (user: GlobalUser) => {
      setSelectedUsers(
        selectedUsers.filter((item) => item.rowId !== user.rowId)
      );
    },
    [selectedUsers]
  );

  const renderItem: ListRenderItem<GlobalUser> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<GlobalUser>) => {
      return (
        <ChoosingUser
          API_BASE_URL={API_BASE_URL}
          key={index}
          onSelectUser={() => handleSelectUser(item)}
          user={item}
          groupPick={true}
        />
      );
    },
    [handleSelectUser]
  );

  const renderSelectedUsers: ListRenderItem<GlobalUser> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<GlobalUser>) => {
      return (
        <SelectedUsers
          key={index}
          onPress={() => {
            handleRemoveSelectedUser(item);
          }}
          username={item.displayName}
        />
      );
    },
    [handleRemoveSelectedUser]
  );

  return (
    <ChatDefaultLayout
      route={route}
      navigation={navigation}
      title={'New Group Conversation'}
      left={
        <>
          <View />
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleGoBack}
            style={{
              marginLeft: 16,
              position: 'absolute',
              zIndex: 10,
              left: 0,
            }}
          >
            <LeftArrow />
          </TouchableOpacity>
        </>
      }
      rightType={'other'}
      right={
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            handleCreateNewGroupConversation(selectedUsers);
          }}
        >
          <Text
            style={{
              color: '#415EB6',
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      }
      headerContainerColor={'white'}
      headerTitleColor={'#200E32'}
    >
      <SearchBar isRoundedBorder={false} onChangeText={searchUser} />
      <View style={styles.container}>
        {selectedUsers.length > 0 && (
          <>
            <Text style={{ marginVertical: 16 }}>Đã chọn</Text>
            <FlatList
              data={selectedUsers}
              renderItem={renderSelectedUsers}
              style={styles.flatListSelectedUsers}
              keyExtractor={(item: GlobalUser, index: number) => {
                return item.displayName + index.toString();
              }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
        <Text style={{ marginVertical: 16 }}>Suggestion</Text>

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
  flatListSelectedUsers: {
    paddingBottom: 20,
    // marginBottom: -50,
  },
});

export interface CreateNewGroupConversationProps extends StackScreenProps<any> {
  //
}

CreateNewGroupConversation.defaultProps = {
  //
};

CreateNewGroupConversation.propTypes = {
  //
};

export default CreateNewGroupConversation;
