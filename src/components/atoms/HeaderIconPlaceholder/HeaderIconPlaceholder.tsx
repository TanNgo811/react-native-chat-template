import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const HeaderIconPlaceholder: FC<PropsWithChildren<HeaderIconPlaceholderProps>> =
  (props: PropsWithChildren<HeaderIconPlaceholderProps>): ReactElement => {
    const { style, ...restProps } = props;
    return (
      <View
        style={[styles.headerIconButton, StyleSheet.flatten(style)]}
        {...restProps}
      />
    );
  };

const styles = StyleSheet.create({
  headerIconButton: {
    width: 40,
    height: 40,
    padding: 8,
  },
});

export interface HeaderIconPlaceholderProps extends ViewProps {
  //
}

HeaderIconPlaceholder.defaultProps = {
  //
};

HeaderIconPlaceholder.propTypes = {
  //
};

export default React.memo(HeaderIconPlaceholder);
