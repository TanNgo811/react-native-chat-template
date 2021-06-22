import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const HeaderTitle: FC<PropsWithChildren<HeaderTitleProps & TextProps>> = (
  props: PropsWithChildren<HeaderTitleProps>
): ReactElement => {
  const { titleColor } = props;

  return (
    <Text
      style={[styles.headerTitle, { color: titleColor ? titleColor : 'white' }]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
});

export interface HeaderTitleProps {
  //

  titleColor?: string;
}

HeaderTitle.defaultProps = {
  //
};

HeaderTitle.propTypes = {
  //
};

export default React.memo(HeaderTitle);
