import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LeftBack from '../../atoms/Icons/LeftBack';

const ratio = 86 / 375;
const HeaderSearch: FC<PropsWithChildren<HeaderSearchProps>> = (
  props: PropsWithChildren<HeaderSearchProps>
): ReactElement => {
  const {
    onLeftPress,
    onChangeText,
    placeholder,
    iconLeft,
    rightIcon,
    onRightPress,
    value,
  } = props;

  const { width: SCREEN_WIDTH } = Dimensions.get('screen');

  return (
    <View
      style={[
        { width: SCREEN_WIDTH, height: SCREEN_WIDTH * ratio },
        styles.container,
      ]}
    >
      <View style={[styles.subContainer]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onLeftPress}
          style={[styles.leftIcon]}
        >
          {iconLeft}
        </TouchableOpacity>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={[
            styles.inputView,
            Platform.OS === 'android' && styles.inputViewAndroid,
          ]}
          placeholder={placeholder}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightPress}
          style={[styles.rightIcon]}
        >
          {rightIcon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BC2C3D',
    justifyContent: 'flex-end',
    padding: 16,
  },

  subContainer: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  leftIcon: {
    marginRight: 8,
    paddingRight: 8,
    justifyContent: 'center',
  },

  rightIcon: {
    marginLeft: 8,
    paddingLeft: 8,
    justifyContent: 'center',
  },

  inputView: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },

  inputViewAndroid: {},
});

export interface HeaderSearchProps {
  onLeftPress?: () => void;

  onRightPress?: () => void;

  onChangeText?: (text: string) => void;

  value?: string;

  placeholder?: string;

  iconLeft?: any;

  rightIcon?: any;
}

HeaderSearch.defaultProps = {
  placeholder: 'Nhập tên nhân viên tên để tìm kiếm',

  iconLeft: <LeftBack />,
};

HeaderSearch.propTypes = {
  //
};

export default React.memo(HeaderSearch);
