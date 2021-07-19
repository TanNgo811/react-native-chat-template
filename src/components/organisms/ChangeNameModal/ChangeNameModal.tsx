import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { FC, PropsWithChildren, ReactElement } from 'react';
import Modal from 'react-native-modal';
import type { Conversation } from '../../../models/Conversation';

const ChangeNameModal: FC<PropsWithChildren<ChangeNameModalProps>> = (
  props: PropsWithChildren<ChangeNameModalProps>
): ReactElement => {
  const {
    isVisible,
    onBackdropPress,
    conversation,
    onChangeName,
    onChangeText,
  } = props;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <SafeAreaView style={[styles.changeNameModalContainer]}>
        <View style={[styles.contentNameModalContainer]}>
          <View>
            <Text style={[styles.header]}>Đổi tên đoạn chat</Text>
            <TextInput
              onChangeText={onChangeText}
              placeholder={conversation.name}
              style={[styles.textInput]}
            />
          </View>

          <View style={styles.choicesContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onChangeName}
              style={styles.choiceFull}
            >
              <Text style={[styles.textFull]}>Xong</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onBackdropPress}
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
  changeNameModalContainer: {
    width: '100%',
    borderRadius: 10,
    height: 200,
    backgroundColor: 'white',
  },

  contentNameModalContainer: {
    width: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },

  header: {
    marginTop: 16,
    fontSize: 18,
    color: '#223263',
    textAlign: 'center',
  },

  textInput: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#F5F5FA',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
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

export interface ChangeNameModalProps {
  //
  isVisible: boolean;

  onBackdropPress: () => void;

  conversation: Conversation;

  onChangeName?: () => void;

  onChangeText?: any;
}

ChangeNameModal.defaultProps = {
  //
};

ChangeNameModal.propTypes = {
  //
};

export default React.memo(ChangeNameModal);
