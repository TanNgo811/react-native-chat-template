import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ConversationParticipant } from '../../../models/ConversationParticipant';
import Modal from 'react-native-modal';
import ImageConversation from '../../atoms/ImageConversation/ImageConversation';

const ShowParticipantModal: FC<PropsWithChildren<ShowParticipantModalProps>> = (
  props: PropsWithChildren<ShowParticipantModalProps>
): ReactElement => {
  const { isVisible, onBackdropPress, users, API_BASE_URL } = props;

  const renderItem: ListRenderItem<ConversationParticipant> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<ConversationParticipant>) => (
      <View style={styles.userContainer} key={index}>
        <ImageConversation
          imageSource={item?.globalUser?.avatar}
          style={styles.image}
          API_BASE_URL={API_BASE_URL}
        />
        <Text style={[styles.displayName]}>
          {item?.globalUser?.displayName}
        </Text>
      </View>
    ),
    [API_BASE_URL]
  );

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={onBackdropPress}
    >
      <SafeAreaView style={[styles.modalContainerSafeAreaView]}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.header]}>Thành viên nhóm</Text>
          <FlatList
            renderItem={renderItem}
            data={users}
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.button}
            onPress={onBackdropPress}
          >
            <Text style={[styles.cancelText]}>Thoát</Text>
          </TouchableOpacity>
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

  flatListStyle: {
    height: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BC2C3D',
    paddingVertical: 3,
    marginVertical: 3,
    marginHorizontal: 50,
  },

  cancelText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#BC2C3D',
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },

  displayName: {
    color: '#223263',
    fontSize: 16,
    marginLeft: 16,
  },
});

export interface ShowParticipantModalProps {
  //
  isVisible: boolean;

  onBackdropPress?: () => void;

  users: ConversationParticipant[];

  API_BASE_URL: string;
}

ShowParticipantModal.defaultProps = {
  //
};

ShowParticipantModal.propTypes = {
  //
};

export default React.memo(ShowParticipantModal);
