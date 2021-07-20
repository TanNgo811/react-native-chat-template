import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import type { Conversation } from '../../../models/Conversation';
import moment from 'moment';

const ConversationItem: FC<PropsWithChildren<ConversationItemProps>> = (
  props: PropsWithChildren<ConversationItemProps>
): ReactElement => {
  const { conversation, onPress, onDeleteConversation } = props;

  const rightSwipe = (_progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],

      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={onDeleteConversation}
        activeOpacity={1}
        style={[styles.buttonDelete]}
      >
        <Animated.Text
          style={[{ transform: [{ scale: scale }] }, styles.textDelete]}
        >
          Xóa
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onPress}
      >
        <View style={[styles.leftView]}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
            }}
            style={styles.image}
          />
          <View style={styles.nameView}>
            <Text numberOfLines={1} style={styles.name}>
              {conversation && conversation.name
                ? conversation.name
                : conversation.conversationParticipants
                ? conversation.conversationParticipants.map((user, index) => {
                    return (index ? ', ' : '') + user?.globalUser?.displayName;
                  })
                : 'Cuộc hội thoại'}
            </Text>
            <View style={styles.content}>
              <Text style={styles.value} numberOfLines={1}>
                {conversation?.lastMessage &&
                  `${conversation?.lastMessage?.globalUser?.displayName}: `}

                {`${
                  conversation?.lastMessage
                    ? JSON.parse(conversation?.lastMessage?.content).message
                      ? JSON.parse(conversation?.lastMessage?.content).message
                      : 'Đã gửi ảnh'
                    : 'Chưa có tin nhắn nào'
                }`}
              </Text>
              <Text style={styles.time}>
                {conversation &&
                moment(conversation.updatedAt).toDate().getDate() ===
                  new Date().getDate()
                  ? moment(conversation.updatedAt).format('hh:mm A')
                  : moment(conversation.updatedAt).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
        {/*<View style={styles.rightView}>{active && <CheckedIcon />}</View>*/}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  //
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: 'white',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  nameView: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
    width: '82.5%',
    paddingVertical: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 13,
  },
  value: {
    fontSize: 12,
    fontWeight: '100',
    width: '70%',
  },
  rightView: {
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
    alignItems: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  time: {
    marginLeft: 10,
    fontSize: 11,
    color: '#898A8D',
    fontWeight: '300',
  },
  buttonDelete: {
    backgroundColor: '#BC2C3D',
    width: 50,
    height: 60,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  textDelete: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export interface ConversationItemProps {
  //
  conversation: Conversation;

  active?: boolean;

  onPress: () => void;

  onDeleteConversation?: () => void;
}

ConversationItem.defaultProps = {
  //
};

ConversationItem.propTypes = {
  //
};

export default React.memo(ConversationItem);
