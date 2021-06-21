import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import EditorComponent from './components/EditorComponent';
import AnimatedImagePicker from './components/AnimatedImagePicker';
import type { ImagePickerResponse } from './components/ImageType';

function ChatBar() {
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
          placeholder={'abc'}
          onPhotoIconPress={handlePressPhotoIcon}
          onSend={() => {}}
        />
        <AnimatedImagePicker
          isVisible={isVisible}
          onCancel={handleCloseModal}
          endingPickImageHandle={handleChooseImage}
          setVisible={setVisible}
        />
      </KeyboardAvoidingView>
    </>
  );
}

export default ChatBar;
