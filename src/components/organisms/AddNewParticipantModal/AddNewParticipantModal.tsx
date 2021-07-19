import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  SafeAreaView,
  ToastAndroid,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SelectedUsers from '../../morecules/SelectedUsers/SelectedUsers';
import type { GlobalUser } from '../../../models/GlobalUser';
import ChoosingUser from '../../morecules/ChoosingUser/ChoosingUser';
import Modal from 'react-native-modal';
import SearchBar from '../../morecules/SearchBar/SearchBar';
import type { Conversation } from '../../../models/Conversation';
import GraySearchIcon from '../../atoms/Icons/GraySearchIcon';

const AddNewParticipantsModal: FC<
  PropsWithChildren<AddNewParticipantsModalProps>
> = (props: PropsWithChildren<AddNewParticipantsModalProps>): ReactElement => {
  const {
    conversation,
    isVisible,
    onBackdropPress,
    onAddNewParticipants,
    keyExtractor,
    END_REACHED_THRESHOLD,
  } = props;

  const [listUser, refreshListUser, , loadingListUser, searchUser] =
    chatService.useListGlobalUser();

  const [selectedUsers, setSelectedUsers] = React.useState<GlobalUser[]>([]);

  const handleSelectUser = React.useCallback(
    (user: GlobalUser) => {
      let i, j;
      for (i = 0; i < selectedUsers.length; i++) {
        if (selectedUsers[i].rowId === user.rowId) {
          ToastAndroid.show('Bạn đã chọn người dùng này', 250);
          return;
        }
      }
      for (j = 0; j < conversation.conversationParticipants.length; j++) {
        if (
          conversation.conversationParticipants[j].globalUser.rowId ===
          user.rowId
        ) {
          ToastAndroid.show('Đã có trong nhóm', 250);
          return;
        }
      }
      setSelectedUsers([user, ...selectedUsers]);
    },
    [conversation.conversationParticipants, selectedUsers]
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
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <SafeAreaView style={[styles.modalContainerSafeAreaView]}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.header]}>Thêm mới thành viên</Text>
          <SearchBar
            onChangeText={searchUser}
            icon={<GraySearchIcon />}
            placeholder={'Tìm kiếm'}
            isRoundedBorder={false}
          />
          <View style={[styles.content]}>
            {selectedUsers.length > 0 && (
              <>
                <Text style={[styles.subtitleText]}>Đã chọn</Text>
                <FlatList
                  data={selectedUsers}
                  renderItem={renderSelectedUsers}
                  style={styles.flatListSelectedUsers}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}

            <Text style={[styles.subtitleText]}>Gợi ý</Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatListUsers}
              data={listUser}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              onEndReachedThreshold={END_REACHED_THRESHOLD}
              refreshing={loadingListUser}
              onRefresh={refreshListUser}
            />
          </View>

          <View style={styles.choicesContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(_event) => onAddNewParticipants(selectedUsers)}
              style={styles.choiceFull}
            >
              <Text style={[styles.textFull]}>Xong</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                onBackdropPress();
                setSelectedUsers([]);
              }}
              style={styles.choiceOutline}
            >
              <Text style={[styles.textOutline]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 10,
  },

  modalContainerSafeAreaView: {
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  header: {
    textAlign: 'center',
    color: '#223263',
    fontSize: 16,
    marginBottom: 8,
  },

  content: {
    paddingHorizontal: 16,
  },

  subtitleText: {
    fontSize: 14,
    marginTop: 16,
    color: '#979797',
  },

  flatListSelectedUsers: {},

  flatListUsers: {
    height: 200,
    marginBottom: 20,
  },

  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  choiceFull: {
    width: 150,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#BC2C3D',
  },

  textFull: {
    fontSize: 14,
    color: '#fff',
  },

  choiceOutline: {
    width: 150,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#BC2C3D',
  },

  textOutline: {
    fontSize: 14,
    color: '#BC2C3D',
  },
});

export interface AddNewParticipantsModalProps {
  //
  conversation: Conversation;

  isVisible: boolean;

  onBackdropPress: () => void;

  onAddNewParticipants: (users: GlobalUser[]) => void;

  keyExtractor: (item: GlobalUser, index: number) => string;

  END_REACHED_THRESHOLD: any;
}

AddNewParticipantsModal.defaultProps = {
  //
};

AddNewParticipantsModal.propTypes = {
  //
};

export default React.memo(AddNewParticipantsModal);
