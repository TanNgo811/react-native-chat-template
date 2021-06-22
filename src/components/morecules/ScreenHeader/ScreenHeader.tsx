import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const ScreenHeader: FC<PropsWithChildren<ScreenHeaderOrganismProps>> = (
  props: PropsWithChildren<ScreenHeaderOrganismProps>
): ReactElement => {
  const { children, style, headerColor } = props;

  const childs: ReactNode[] = React.useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  return (
    <View
      style={[
        styles.header,
        StyleSheet.flatten(style),
        {
          backgroundColor: headerColor ? headerColor : '#BC2C3D',
        },
        {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        },
      ]}
    >
      <View style={[styles.headerContent]}>{childs}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
});

export interface ScreenHeaderOrganismProps {
  style?: StyleProp<ViewStyle>;

  headerColor?: string;
}

ScreenHeader.defaultProps = {
  //
};

ScreenHeader.propTypes = {
  //
};

export default React.memo(ScreenHeader);
