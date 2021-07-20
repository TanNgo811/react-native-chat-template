import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
} from 'react-native';
import EditorComponent from './EditorComponent';
import AnimatedImagePicker from './AnimatedImagePicker';
import type { ImagePickerResponse } from '../../../models/ImageType';

const ChatBar: FC<PropsWithChildren<ChatBarProps>> = (
  props: PropsWithChildren<ChatBarProps>
): ReactElement => {
  const { primaryColor, onSendMessage, handleChooseImage, ...restProps } =
    props;

  const [isVisible, setVisible] = React.useState<boolean>(false);

  const handleCloseModal = React.useCallback(() => {
    setVisible(false);
  }, []);

  const handlePressPhotoIcon = React.useCallback(() => {
    setVisible(!isVisible);
    Keyboard.dismiss();
  }, [isVisible]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <EditorComponent
          onFocus={handleCloseModal}
          onPhotoIconPress={handlePressPhotoIcon}
          onSend={onSendMessage}
          primaryColor={primaryColor}
          {...restProps}
        />
        <AnimatedImagePicker
          primaryColor={primaryColor}
          isVisible={isVisible}
          onCancel={handleCloseModal}
          endingPickImageHandle={handleChooseImage}
          setVisible={setVisible}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export interface ChatBarProps extends TextInputProps {
  //
  imagesChose?: ImagePickerResponse[];

  handleChooseImage: (images: ImagePickerResponse[]) => void;

  primaryColor?: string;

  onSendMessage?: () => void;
}

ChatBar.defaultProps = {
  //
};

ChatBar.propTypes = {
  //
};

export default ChatBar;
