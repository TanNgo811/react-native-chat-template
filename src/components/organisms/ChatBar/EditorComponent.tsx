import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import PhotoSquareOutline from '../../Icons/PhotoSquareOutline';
import ArrowForward from '../../Icons/ArrowForward';

const EditorComponent: FC<PropsWithChildren<EditorComponentProps>> = (
  props: PropsWithChildren<EditorComponentProps>
): ReactElement => {
  const { primaryColor, onPhotoIconPress, onSend, ...restProps } = props;

  return (
    <View style={styles.containerView}>
      <View style={styles.inputView}>
        <View style={styles.inputContent}>
          <TextInput {...restProps} style={styles.textInput} />
          <TouchableOpacity activeOpacity={1} onPress={onPhotoIconPress}>
            <PhotoSquareOutline color={primaryColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={onSend}>
          <ArrowForward color={primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: 56,
    bottom: 0,
    paddingVertical: 20,
  },
  inputView: {
    flexDirection: 'row',
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  inputContent: {
    paddingHorizontal: 16,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
    height: 45,
    flex: 1,
    borderRadius: 25,
  },
  textInput: {
    height: 40,
    flex: 1,
  },
});

export interface EditorComponentProps extends TextInputProps {
  //
  primaryColor?: string;

  onPhotoIconPress?: () => void;

  onSend?: () => void;
}

EditorComponent.defaultProps = {
  //
};

EditorComponent.propTypes = {
  //
};

export default EditorComponent;
