import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
} from 'react-native';
import EditorComponent from './components/EditorComponent';
import AnimatedImagePicker from './components/AnimatedImagePicker';
import type { ImagePickerResponse } from './components/ImageType';

const ChatBar: FC<PropsWithChildren<ChatBarProps>> = (
  props: PropsWithChildren<ChatBarProps>
): ReactElement => {
  const { primaryColor, ...restProps } = props;

  const [isVisible, setVisible] = React.useState<boolean>(false);

  const [imageDir, setImageDir] = React.useState<string>();

  const handleChooseImage = React.useCallback(
    async (images: ImagePickerResponse[]) => {
      await setImageDir(images[0].uri);
      console.log(imageDir);
    },
    [imageDir]
  );

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
          onChangeText={() => {}}
          onPhotoIconPress={handlePressPhotoIcon}
          onSend={() => {}}
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
  primaryColor?: string;
}

ChatBar.defaultProps = {
  //
};

ChatBar.propTypes = {
  //
};

export default ChatBar;
