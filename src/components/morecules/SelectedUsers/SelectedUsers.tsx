import React, { FC, PropsWithChildren, ReactElement } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import X_Icon from '../../atoms/Icons/X_Icon';

/**
 * File: SelectedUsers.tsx
 * @created 2021-06-29 20:59:03
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SelectedUsersProps>>}
 */
const SelectedUsers: FC<PropsWithChildren<SelectedUsersProps>> = (
  props: PropsWithChildren<SelectedUsersProps>
): ReactElement => {
  const { username, onPress, style } = props;

  return (
    <View
      style={[
        style ? StyleSheet.flatten(style) : styles.textContainer,
        styles.contentContainer,
      ]}
    >
      <Text style={styles.text}>{username}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.icon}>
        <X_Icon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#223263',
    fontSize: 14,
  },
  icon: {
    marginLeft: 8,
  },
  textContainer: {
    backgroundColor: '#D1D9E6',
    paddingHorizontal: 10,
    margin: 6,
    borderRadius: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export interface SelectedUsersProps {
  //
  username: string;

  onPress?: () => void;

  style?: ViewStyle;
}

SelectedUsers.defaultProps = {
  //
};

SelectedUsers.propTypes = {
  //
};

export default React.memo(SelectedUsers);
