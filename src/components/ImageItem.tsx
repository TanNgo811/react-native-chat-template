import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { ImagePickerResponse } from './ImageType';

/**
 * File: ImageItem.tsx
 * @created 2021-05-15 01:20:55
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ImageItemProps>>}
 */
const ImageItem: FC<PropsWithChildren<ImageItemProps>> = (
  props: PropsWithChildren<ImageItemProps>
): ReactElement => {
  const { image, onSelect, selected, order, primaryColor } = props;

  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onSelect(image)}>
      <Image
        source={{ uri: image.uri }}
        style={{ height: width / 3, width: width / 3 }}
      />
      {selected && (
        <View style={styles.overLay}>
          <View
            style={[
              styles.numberIndicator,
              {
                backgroundColor: primaryColor ? primaryColor : '#BC2C3D',
              },
            ]}
          >
            <Text style={[styles.text]}>{order}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberIndicator: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export interface ImageItemProps {
  //
  primaryColor?: string;

  image: ImagePickerResponse;

  onSelect: (image: ImagePickerResponse) => void;

  selected: boolean;

  order: null | number;
}

ImageItem.defaultProps = {
  //
};

ImageItem.propTypes = {
  //
};

export default React.memo(ImageItem);
