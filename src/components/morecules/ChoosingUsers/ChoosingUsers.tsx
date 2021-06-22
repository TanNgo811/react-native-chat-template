import React, { FC, PropsWithChildren, ReactElement } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { View, Text } from 'react-native';

const ChoosingUsers: FC<PropsWithChildren<ChoosingUsersProps>> = (
  props: PropsWithChildren<ChoosingUsersProps>
): ReactElement => {
  return (
    <View>
      <Text>abc</Text>
    </View>
  );
};

export interface ChoosingUsersProps {
  //
  navigation: StackScreenProps<any>['navigation'];
}

ChoosingUsers.defaultProps = {
  //
};

ChoosingUsers.propTypes = {
  //
};

export default React.memo(ChoosingUsers);
