import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RightArrow from '../../atoms/Icons/RightArrow';

const ChoosingOption: FC<PropsWithChildren<ChoosingOptionProps>> = (
  props: PropsWithChildren<ChoosingOptionProps>
): ReactElement => {
  const { onPress, title, icon, isPrimaryTitle } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        {icon}
        <Text style={[styles.title, isPrimaryTitle && styles.textPrimary]}>
          {title}
        </Text>
      </View>
      <RightArrow />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },

  image: {
    width: 36,
    height: 36,
  },

  title: { marginLeft: 12, fontSize: 16 },

  textPrimary: {
    color: '#BC2C3D',
  },
});

export interface ChoosingOptionProps {
  //
  title: string;

  onPress?: () => void;

  icon: ReactElement | ReactElement[];

  isPrimaryTitle: boolean;
}

ChoosingOption.defaultProps = {
  //
};

ChoosingOption.propTypes = {
  //
};

export default React.memo(ChoosingOption);
