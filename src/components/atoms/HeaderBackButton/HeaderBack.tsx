import React, { FC, PropsWithChildren, ReactElement } from 'react';
import HeaderIconButton from '../HeaderIconButton/HeaderIconButton';
import type { StackScreenProps } from '@react-navigation/stack';
import LeftBack from '../Icons/LeftBack';

const HeaderBackButton: FC<PropsWithChildren<HeaderBackButtonProps>> = (
  props: PropsWithChildren<HeaderBackButtonProps>
): ReactElement => {
  const { navigation, color } = props;

  return (
    <HeaderIconButton onPress={navigation.goBack}>
      <LeftBack color={color} />
    </HeaderIconButton>
  );
};

export interface HeaderBackButtonProps {
  //
  color?: string;

  navigation: StackScreenProps<any>['navigation'];
}

HeaderBackButton.defaultProps = {
  //
};

HeaderBackButton.propTypes = {
  //
};

export default React.memo(HeaderBackButton);
