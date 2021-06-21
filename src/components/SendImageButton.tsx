import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * File: SendImageButton.tsx
 * @created 2021-05-15 02:01:25
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SendImageButtonProps>>}
 */
const SendImageButton: FC<PropsWithChildren<SendImageButtonProps>> = (
  props: PropsWithChildren<SendImageButtonProps>
): ReactElement => {
  const { onPress, numberSelectedItem, buttonBottom } = props;

  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.sentButton,
        {
          width: (width * 80) / 100,
          left: (width * 10) / 100,
          bottom: buttonBottom ? buttonBottom : 10,
        },
      ]}
    >
      <Text style={[styles.text]}>
        {`Send`.toUpperCase() +
          ` ${numberSelectedItem > 1 ? numberSelectedItem : ''}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sentButton: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 20,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  text: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 14,
  },
});

export interface SendImageButtonProps {
  //
  onPress?: () => void;

  numberSelectedItem: number;

  buttonBottom?: number;
}

SendImageButton.defaultProps = {
  //
};

SendImageButton.propTypes = {
  //
};

export default React.memo(SendImageButton);
