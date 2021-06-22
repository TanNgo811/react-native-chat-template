import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import CheckedIcon from '../../atoms/Icons/CheckedIcon';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ConversationItem: FC<PropsWithChildren<ConversationItemProps>> = (
  props: PropsWithChildren<ConversationItemProps>
): ReactElement => {
  const { active, onPress } = props;

  const rightSwipe = (_progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],

      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={1}
        style={[styles.buttonDelete]}
      >
        <Animated.Text
          style={[{ transform: [{ scale: scale }] }, styles.textDelete]}
        >
          Delete
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
              Username
            </Text>
            <View style={styles.content}>
              <Text style={styles.value}>You: Messages</Text>
              <Text style={styles.time}>{'12:00PM'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightView}>{active && <CheckedIcon />}</View>
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
    width: 60,
    height: 60,
  },
  nameView: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
    width: '65%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 13,
  },
  value: {
    fontSize: 14,
    fontWeight: '100',
  },
  rightView: {
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
    alignItems: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  active?: boolean;

  onPress: () => void;
}

ConversationItem.defaultProps = {
  //
};

ConversationItem.propTypes = {
  //
};

export default React.memo(ConversationItem);
