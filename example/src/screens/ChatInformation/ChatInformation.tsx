import React from 'reactn';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import {
  AddNewParticipantModal,
  ChangeNameModal,
  ChatDefaultLayout,
  ChoicesModal,
  ChoosingSection,
  Conversation,
  ConversationParticipant,
  conversationService,
  GlobalUser,
  ImageConversation,
  ShowParticipantModal,
} from 'react-native-chat-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import GroupOutlinedIcon from '../../asserts/GroupOutlinedIcon';
import PictureIcon from '../../asserts/PictureIcon';
import FileIcon from '../../asserts/FileIcon';
import BlockIcon from '../../asserts/BlockIcon';
import OutGroupIcon from '../../asserts/OutGroupIcon';
import AddUserIcon from '../../asserts/AddUserIcon';
import { API_BASE_URL } from '../../config/api-consts';
import { RNToasty } from 'react-native-toasty';
import { conversationRepository } from '../../repository/conversation-repository';
import type { GlobalState } from '../../app/global-state';
import { PLATFORM_IS_IOS } from '../../config/consts';
import { getFileName } from '../../helpers/get-file-name';
import ImagePicker from 'react-native-image-crop-picker';

const ChatInformation: FC<PropsWithChildren<ChatInformationProps>> = (
  props: PropsWithChildren<ChatInformationProps>
): ReactElement => {
  const { navigation, route } = props;

  const { conversation } = route?.params;

  const [currentUser] = React.useGlobal<GlobalState, 'globalUser'>(
    'globalUser'
  );

  const [, , , , handleUpdateConversation] =
    conversationService.useConversation(
      currentUser,
      conversationRepository.create,
      conversationRepository.get,
      conversationRepository.delete,
      conversationRepository.update
    );

  const [, , , , , , handleRefresh, , , ,] =
    conversationService.useListConversation(
      conversationRepository.list,
      conversationRepository.count
    );

  const [handleOutConversation] = conversationService.useGetOutConversation(
    currentUser,
    navigation,
    conversationRepository.update,
    'ChatList'
  );

  const [groupName, setGroupName] = React.useState<string>(
    conversation && conversation.name
      ? conversation.name
      : conversation.conversationParticipants
      ? conversation.conversationParticipants.map(
          (item: ConversationParticipant, index: number) => {
            return (index ? ', ' : '') + item?.globalUser?.displayName;
          }
        )
      : 'Conversation'
  );

  const [groupAvatar, setGroupAvatar] = React.useState<string>(
    conversation.avatar
  );

  const [changeConversation, setChangeConversation] =
    React.useState<Conversation>(conversation);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  const [isChangeNameModalVisible, setChangeNameModalVisible] =
    React.useState<boolean>(false);

  const handleOpenChangeNameModal = React.useCallback(async () => {
    await setModalVisible(false);
    setTimeout(() => setChangeNameModalVisible(!isChangeNameModalVisible), 300);
  }, [isChangeNameModalVisible]);

  const handleCloseChangeNameModal = React.useCallback(() => {
    setChangeNameModalVisible(false);
  }, []);

  const [isShowParticipantsModalVisible, setShowParticipantsModalVisible] =
    React.useState<boolean>(false);

  const handleOpenShowParticipantsModal = React.useCallback(() => {
    setShowParticipantsModalVisible(true);
  }, []);

  const handleCloseShowParticipantsModal = React.useCallback(() => {
    setShowParticipantsModalVisible(false);
  }, []);

  const [isAddParticipantsModalVisible, setAddParticipantsModalVisible] =
    React.useState<boolean>(false);

  const handleOpenAddParticipantsModal = React.useCallback(() => {
    setAddParticipantsModalVisible(true);
  }, []);

  const handleCloseAddParticipantsModal = React.useCallback(() => {
    setAddParticipantsModalVisible(false);
  }, []);

  const [isOutGroupModalVisible, setOutGroupModalVisible] =
    React.useState<boolean>(false);

  const handleOpenOutGroupModalVisible = React.useCallback(() => {
    setOutGroupModalVisible(true);
  }, []);

  const handleCloseOutGroupModalVisible = React.useCallback(() => {
    setOutGroupModalVisible(false);
  }, []);

  const handleDevelop = React.useCallback(() => {
    RNToasty.Info({ title: 'chat.developing' });
  }, []);

  const toggleModal = React.useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const handleChangeName = React.useCallback(async () => {
    await setChangeConversation({
      ...changeConversation,
      name: groupName,
    });
    await handleUpdateConversation({
      ...changeConversation,
      name: groupName,
    });
    await handleRefresh();

    await RNToasty.Info({ title: 'Thay đổi tên nhóm thành công' });

    await handleCloseChangeNameModal();
  }, [
    changeConversation,
    groupName,
    handleRefresh,
    handleCloseChangeNameModal,
    handleUpdateConversation,
  ]);

  const handleAddNewParticipants = React.useCallback(
    async (users: GlobalUser[]) => {
      await setChangeConversation({
        ...changeConversation,
        conversationParticipants: [
          ...changeConversation?.conversationParticipants,
          ...users.map((user, _index) => ({
            conversationId: conversation.id,
            globalUserId: user.id,
            globalUser: user,
          })),
        ],
      });

      await handleUpdateConversation({
        ...changeConversation,
        conversationParticipants: [
          ...changeConversation.conversationParticipants,
          ...users.map((user, _index) => ({
            conversationId: conversation.id,
            globalUserId: user.id,
            globalUser: user,
          })),
        ],
      });

      await handleRefresh();

      await RNToasty.Info({ title: 'Thêm thành viên nhóm thành công' });

      await handleCloseAddParticipantsModal();
    },
    [
      changeConversation,
      conversation.id,
      handleRefresh,
      handleCloseAddParticipantsModal,
      handleUpdateConversation,
    ]
  );

  const handleResetChangeName = React.useCallback(() => {
    setGroupName(
      conversation && conversation.name
        ? conversation.name
        : conversation.conversationParticipants
        ? conversation.conversationParticipants.map(
            (item: ConversationParticipant, index: number) => {
              return (index ? ', ' : '') + item?.globalUser?.displayName;
            }
          )
        : 'chat.conversation'
    );
  }, [conversation]);

  const handleChangeConversationAvatar = React.useCallback(async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 1,
    })
      .then((image) => {
        conversationRepository
          .uploadAvatar(
            {
              fileName: PLATFORM_IS_IOS
                ? image.filename
                : getFileName(image.path, true),
              type: image.mime,
              uri: PLATFORM_IS_IOS ? image.sourceURL : image.path,
              // eslint-disable-next-line radix
              timestamp: parseInt(
                PLATFORM_IS_IOS ? image.creationDate : image.modificationDate
              ),
            },
            conversation.id
          )
          .then(async (updatedConversation: Conversation) => {
            await setGroupAvatar(updatedConversation?.avatar);
            await setChangeConversation({
              ...changeConversation,
              avatar: updatedConversation?.avatar,
            });
            await RNToasty.Info({ title: 'Thay ảnh nhóm thành công' });
          })
          .catch();
      })
      .catch();

    await toggleModal();
  }, [changeConversation, conversation.id, toggleModal]);

  const handleConfirmChange = React.useCallback(async () => {
    await handleUpdateConversation(changeConversation);
    await handleRefresh();

    await navigation.navigate('ChatDetail', {
      conversation: changeConversation,
    });
  }, [changeConversation, handleRefresh, handleUpdateConversation, navigation]);

  return (
    <>
      {/*----------------------_Modal------------------------------*/}

      {/*------------ START MODAL OPTIONS ----------------*/}
      <ChoicesModal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        choices={[
          {
            name: 'chat.changeAvatarGroup',
            onPress: handleChangeConversationAvatar,
          },
          {
            name: 'chat.changeNameGroup',
            onPress: handleOpenChangeNameModal,
          },
        ]}
      />

      {/*---------------START MODAL CHANGE NAME------------------*/}

      <ChangeNameModal
        isVisible={isChangeNameModalVisible}
        onBackdropPress={() => {
          handleResetChangeName();
          handleCloseChangeNameModal();
        }}
        conversation={changeConversation}
        onChangeName={handleChangeName}
        onChangeText={(text: string) => setGroupName(text)}
      />

      {/*---------------START MODAL SHOW PARTICIPANTS------------------*/}
      <ShowParticipantModal
        onBackdropPress={handleCloseShowParticipantsModal}
        isVisible={isShowParticipantsModalVisible}
        users={changeConversation?.conversationParticipants}
        API_BASE_URL={API_BASE_URL}
      />

      {/*---------------START MODAL ADD NEW PARTICIPANTS------------------*/}
      <AddNewParticipantModal
        isVisible={isAddParticipantsModalVisible}
        onBackdropPress={handleCloseAddParticipantsModal}
        onAddNewParticipants={handleAddNewParticipants}
        conversation={changeConversation}
        API_BASE_URL={API_BASE_URL}
        singleListGlobalUserRepository={
          conversationRepository.singleListGlobalUser
        }
      />

      {/*------------ START MODAL OUT GROUP ----------------*/}
      <ChoicesModal
        isVisible={isOutGroupModalVisible}
        onBackdropPress={handleCloseOutGroupModalVisible}
        choices={[
          {
            name: 'chat.confirmOutGroup',
            onPress: () => {
              handleOutConversation(changeConversation);
            },
          },
        ]}
      />

      {/*--------------------------Main-----------------------------------*/}
      <ChatDefaultLayout
        title={''}
        navigation={navigation}
        route={route}
        left={'back-button'}
        rightType={'icon'}
        right={
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleConfirmChange}
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
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          style={[styles.contentContainer]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.groupAvatarContainer]}
            onPress={toggleModal}
          >
            {groupAvatar ? (
              <ImageConversation
                style={styles.mainGroupAvatar}
                imageSource={groupAvatar}
                API_BASE_URL={API_BASE_URL}
              />
            ) : (
              <View style={[styles.groupAvatar]}>
                <ImageConversation
                  imageSource={
                    conversation.conversationParticipants[0].globalUser.avatar
                  }
                  API_BASE_URL={API_BASE_URL}
                  style={[styles.image, styles.t5r10]}
                />
                <ImageConversation
                  imageSource={
                    conversation.conversationParticipants[1].globalUser.avatar
                  }
                  API_BASE_URL={API_BASE_URL}
                  style={[styles.image, styles.t35l10]}
                />
              </View>
            )}

            <View style={[styles.groupNameContainer]}>
              <Text style={[styles.groupName]} numberOfLines={1}>
                {groupName}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.addUserIconContainer]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleOpenAddParticipantsModal}
            >
              <AddUserIcon />
            </TouchableOpacity>
          </View>

          <ChoosingSection
            item={[
              {
                subtitle: 'Group Member',
                onPress: handleOpenShowParticipantsModal,
                icon: <GroupOutlinedIcon />,
              },
            ]}
            title={'Group Information'}
          />

          <ChoosingSection
            title={'Another Action'}
            item={[
              {
                subtitle: 'Media File',
                onPress: handleDevelop,
                icon: <PictureIcon />,
              },
              {
                subtitle: 'Shared File',
                onPress: handleDevelop,
                icon: <FileIcon />,
              },
            ]}
          />

          <ChoosingSection
            title={'Personal Privacy'}
            item={[
              {
                subtitle: 'Block User',
                onPress: handleDevelop,
                icon: <BlockIcon />,
              },
              {
                subtitle: 'Out Group',
                onPress: handleOpenOutGroupModalVisible,
                icon: <OutGroupIcon />,
                isPrimaryTitle: true,
              },
            ]}
          />
        </ScrollView>
      </ChatDefaultLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  scrollView: {
    paddingBottom: 15,
  },

  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: 'white',
  },

  groupAvatarContainer: {
    alignItems: 'center',
  },

  groupAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#fff',
  },

  mainGroupAvatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: -90,
  },

  t5r10: {
    top: 5,
    right: -10,
  },

  t35l10: {
    top: 35,
    left: -10,
  },

  groupNameContainer: {
    marginTop: 100,
    alignItems: 'center',
  },

  groupName: {
    fontSize: 18,
    color: '#848484',
    fontWeight: 'bold',
  },

  addUserIconContainer: {
    marginTop: 16,
    alignItems: 'center',
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
