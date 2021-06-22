import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const HeaderIconButton: FC<PropsWithChildren<HeaderIconProps>> = (
  props: PropsWithChildren<HeaderIconProps>
): ReactElement => {
  const { style, children, ...restProps } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.button, StyleSheet.flatten(style)]}
      {...restProps}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
  },
});

export interface HeaderIconProps extends TouchableOpacityProps {
  //
}

HeaderIconButton.defaultProps = {
  //
};

HeaderIconButton.propTypes = {
  //
};

export default React.memo(HeaderIconButton);
