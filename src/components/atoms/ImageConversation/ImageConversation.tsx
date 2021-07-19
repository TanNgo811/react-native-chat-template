/**
 * File: ImageChat.tsx
 * @created 2021-07-10 22:30:04
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ImageChatProps>>}
 */
import React, { FC, PropsWithChildren, ReactElement } from 'react';
import type { ImageStyle } from 'react-native';
import { Image, StyleProp } from 'react-native';

const ImageChat: FC<PropsWithChildren<ImageChatProps>> = (
  props: PropsWithChildren<ImageChatProps>
): ReactElement => {
  const { imageSource, style, isAvatar, secondSource, API_BASE_URL } = props;

  return (
    <Image
      source={
        imageSource
          ? {
              uri: API_BASE_URL + imageSource.replace('/', ''),
            }
          : isAvatar
          ? secondSource
            ? {
                uri: API_BASE_URL + secondSource.replace('/', ''),
              }
            : require('../../images/defaultAvatar.png')
          : require('../../images/default_image.png')
      }
      style={style}
    />
  );
};

export interface ImageChatProps {
  //
  imageSource: string | undefined;

  style: StyleProp<ImageStyle> | StyleProp<ImageStyle>[];

  isAvatar?: boolean;

  secondSource?: string;

  API_BASE_URL?: string;
}

ImageChat.defaultProps = {
  //
  isAvatar: true,

  secondSource: undefined,
};

ImageChat.propTypes = {
  //
};

export default React.memo(ImageChat);
