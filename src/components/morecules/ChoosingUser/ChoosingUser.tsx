import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CheckedRound from '../../atoms/Icons/CheckedRound';
import NonCheckedRound from '../../atoms/Icons/NonCheckedRound';

const ChoosingUser: FC<PropsWithChildren<ChoosingUsersProps>> = (
  props: PropsWithChildren<ChoosingUsersProps>
): ReactElement => {
  const { userName, userAvatar, groupPick } = props;

  const [isChecked, setCheck] = React.useState(false);

  const handleToggleCheck = React.useCallback(() => {
    setCheck(!isChecked);
  }, [isChecked, setCheck]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container]}
      onPress={handleToggleCheck}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri: userAvatar
              ? userAvatar
              : 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{userName}</Text>
      </View>
      {groupPick && isChecked ? <CheckedRound /> : <NonCheckedRound />}
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

  title: { marginLeft: 12 },
});

export interface ChoosingUsersProps {
  //
  userName: string;

  userAvatar?: string;

  onPress?: () => void;

  groupPick: boolean;
}

ChoosingUser.defaultProps = {
  //
};

ChoosingUser.propTypes = {
  //
};

export default React.memo(ChoosingUser);
