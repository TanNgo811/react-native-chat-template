import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { GlobalUser } from '../../../models/GlobalUser';
import type { StackScreenProps } from '@react-navigation/stack';
import { conversationService } from '../../../services/chat-service/conversation-service';
import type { Conversation } from '../../../models';
import type { Observable } from 'rxjs';

const ChoosingUser: FC<PropsWithChildren<ChoosingUsersProps>> = (
  props: PropsWithChildren<ChoosingUsersProps>
): ReactElement => {
  const {
    user,
    groupPick,
    navigation,
    onSelectUser,
    API_BASE_URL,
    currentGlobalUser,
    createConversationRepository,
    chatDetailScreen,
  } = props;

  const [isChecked, setCheck] = React.useState(false);

  const [handleCreateNewConversation] =
    conversationService.useCreateNewConversation(
      currentGlobalUser,
      navigation,
      createConversationRepository,
      chatDetailScreen
    );

  const handleToggleCheck = React.useCallback(() => {
    setCheck(!isChecked);
  }, [isChecked, setCheck]);

  const handleGroupPick = React.useCallback(() => {
    handleToggleCheck();
  }, [handleToggleCheck]);

  const handlePressed = React.useCallback(async () => {
    await handleCreateNewConversation(user);
  }, [handleCreateNewConversation, user]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container]}
      onPress={!groupPick ? handlePressed : onSelectUser}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri: user.avatar
              ? `${API_BASE_URL + user.avatar.replace('/', '')}`
              : 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
          }}
          style={styles.image}
        />
        <Text style={[styles.title]}>{user.displayName}</Text>
      </View>
      {/*{groupPick ? (*/}
      {/*  isChecked ? (*/}
      {/*    <IconWrapper component={require('assets/icons/RoundChecked.svg')} />*/}
      {/*  ) : (*/}
      {/*    <IconWrapper component={require('assets/icons/RoundUnchecked.svg')} />*/}
      {/*  )*/}
      {/*) : (*/}
      {/*  <View />*/}
      {/*)}*/}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  image: {
    width: 36,
    height: 36,
  },

  title: { marginLeft: 12, fontSize: 14 },
});

export interface ChoosingUsersProps {
  //
  user: GlobalUser;

  onSelectUser?: () => void;

  groupPick?: boolean;

  navigation?: StackScreenProps<any>['navigation'];

  API_BASE_URL: string;

  currentGlobalUser?: GlobalUser;

  createConversationRepository?: (
    conversation: Conversation
  ) => Observable<Conversation>;

  chatDetailScreen?: string;
}

ChoosingUser.defaultProps = {
  //
};

ChoosingUser.propTypes = {
  //
};

export default React.memo(ChoosingUser);
