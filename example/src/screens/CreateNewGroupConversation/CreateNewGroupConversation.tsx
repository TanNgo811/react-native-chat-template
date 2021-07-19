import React, { FC, PropsWithChildren, ReactElement } from 'react';
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
  SearchBar,
  SelectedUsers,
} from 'react-native-chat-bar';
import LeftArrow from '../../asserts/LeftArrow';
import type { GlobalUser } from '../../../../lib/typescript/models/GlobalUser';
import { RNToasty } from 'react-native-toasty';

const CreateNewGroupConversation: FC<
  PropsWithChildren<CreateNewGroupConversationProps>
> = (
  props: PropsWithChildren<CreateNewGroupConversationProps>
): ReactElement => {
  const { navigation, route } = props;

  const handleGoBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGoToGroupChatDetail = React.useCallback(() => {
    navigation.navigate('GroupChatDetail');
  }, [navigation]);

  const users = [
    {
      avatar: undefined,
      displayName: 'abcd1',
      rowId: 1,
    },
    {
      avatar: undefined,
      displayName: 'abcd2',
      rowId: 2,
    },
    {
      avatar: undefined,
      displayName: 'abcd3',
      rowId: 3,
    },
    {
      avatar: undefined,
      displayName: 'abcd4',
      rowId: 4,
    },
    {
      avatar: undefined,
      displayName: 'abcd5',
      rowId: 5,
    },
  ];

  const [selectedUsers, setSelectedUsers] = React.useState<GlobalUser[]>([]);

  const handleSelectUser = React.useCallback(
    (user: GlobalUser) => {
      let i;
      for (i = 0; i < selectedUsers.length; i++) {
        if (selectedUsers[i].rowId === user.rowId) {
          RNToasty.Show({
            title: 'This is a toast',
            fontFamily: 'Arial',
            position: 'center',
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
          API_BASE_URL={''}
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
        <TouchableOpacity activeOpacity={1} onPress={handleGoToGroupChatDetail}>
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
      <SearchBar isRoundedBorder={false} />
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
          data={users}
          keyExtractor={(item: GlobalUser, index: number) => {
            return item.displayName + index.toString();
          }}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {}}
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
    // paddingBottom: 20,
    marginBottom: -50,
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
