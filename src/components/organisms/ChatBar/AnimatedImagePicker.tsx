import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  PanResponder,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import CloseIcon from '../../Icons/CloseIcon';
import type { ImagePickerResponse } from '../../../models/ImageType';
import SendImageButton from './SendImageButton';
import ImageItem from './ImageItem';

/**
 * File: AnimatedImagePicker.tsx
 * @created 2021-05-14 14:38:23
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<AnimatedImagePickerProps>>}
 */

const { height } = Dimensions.get('window');

const PAGINATION = 15;
const ANIMATION_DURATION = 200;
const ANIMATION_THRESHOLD = 120;

const AnimatedImagePicker: FC<PropsWithChildren<AnimatedImagePickerProps>> = (
  props: PropsWithChildren<AnimatedImagePickerProps>
): ReactElement => {
  const {
    isVisible,
    onCancel,
    limitImageNumber,
    overLimitedImageNumberHandle,
    endingPickImageHandle,
    setVisible,
    primaryColor,
    textSendImage,
    headerImagePicker,
  } = props;

  const [images, setImages] = React.useState<ImagePickerResponse[]>([]);

  const [selectItemsObject, setSelectItemsObject] = React.useState<{
    [key: string]: {
      image: ImagePickerResponse;
      order: number;
    };
  }>({});

  const [pageInfo, setPageInfo] = React.useState({
    has_next_page: true,
    end_cursor: null,
  });

  const loadMoreImages = React.useCallback(async () => {
    let res: any = null;
    if (pageInfo.has_next_page && pageInfo.end_cursor === null) {
      res = await CameraRoll.getPhotos({
        first: 30,
        assetType: 'Photos',
        groupTypes: 'All',
      });
    } else if (pageInfo.has_next_page) {
      res = await CameraRoll.getPhotos({
        first: PAGINATION,
        after: pageInfo.end_cursor,
      });
    }
    if (res) {
      await setPageInfo(res.page_info);

      const resImages: ImagePickerResponse[] = res.edges.map((e: any) => {
        return {
          groupName: e.node.group_name,
          uri: e.node.image.uri,
          height: e.node.image.height,
          width: e.node.image.width,
          fileName: e.node.image.filename,
          timestamp: e.node.timestamp,
        };
      });

      let listData = images;
      let data = listData.concat(resImages);

      setImages(data);
    }
  }, [images, pageInfo.end_cursor, pageInfo.has_next_page]);

  const [mode, setMode] = React.useState<'small' | 'big'>('small');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const position = new Animated.Value(1);

  const requestPermission = React.useCallback(async () => {
    try {
      const androidGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Photos Permissions',
          message: 'We need to access your photos !',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (androidGranted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        ToastAndroid.show('Folder permission denied', 500);
      }
    } catch (err) {
      ToastAndroid.show(err.toString(), 500);
    }
  }, []);

  useEffectOnce(() => {
    (async () => {
      if (Platform.OS === 'android') {
        requestPermission();
      }
      await loadMoreImages();
      await loadMoreImages();
    })();
  });

  const reset = React.useCallback(() => {
    setSelectItemsObject({});
  }, []);

  const onSelectHandle = React.useCallback(
    (image: ImagePickerResponse) => {
      const length = Object.keys(selectItemsObject).length;

      let data = { ...selectItemsObject };
      if (data[image.uri]) {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          if (data[keys[i]].order > data[image.uri].order) {
            data[keys[i]].order -= 1;
          }
        }

        delete data[image.uri];
      } else {
        if (limitImageNumber && length >= limitImageNumber) {
          overLimitedImageNumberHandle && overLimitedImageNumberHandle();
          return;
        }

        data[image.uri] = {
          order: length + 1,
          image: image,
        };
      }
      setSelectItemsObject(data);
    },
    [limitImageNumber, overLimitedImageNumberHandle, selectItemsObject]
  );

  const numberSelectedItem = Object.keys(selectItemsObject).length;

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      position.setValue(gestureState.dy);
    },

    onPanResponderRelease: (_evt, gestureState) => {
      if (-gestureState.dy > ANIMATION_THRESHOLD && mode === 'small') {
        Animated.timing(position, {
          toValue: -height / 2,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }).start(() => {
          setMode('big');
        });
      } else if (gestureState.dy > ANIMATION_THRESHOLD && mode === 'big') {
        Animated.timing(position, {
          toValue: height / 2,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }).start(() => {
          setMode('small');
        });
      } else {
        Animated.timing(position, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  let heightView: any = 250;
  let headerOpacity: any = 0;
  let headerHeight: any = 40;
  let bottomButton: any = 40;
  if (mode === 'small') {
    heightView = position.interpolate({
      inputRange: [-height / 2, 0],
      outputRange: [height, 250],
    });

    headerOpacity = position.interpolate({
      inputRange: [-height / 2, 0],
      outputRange: [1, 0],
    });

    headerHeight = position.interpolate({
      inputRange: [-height / 2, 0],
      outputRange: [40, 15],
    });

    bottomButton = position.interpolate({
      inputRange: [-height / 15, 0],
      outputRange: [20, 5],
    });
  } else {
    heightView = position.interpolate({
      inputRange: [0, height / 2],
      outputRange: [height, 250],
    });

    headerOpacity = position.interpolate({
      inputRange: [0, height / 2],
      outputRange: [1, 0],
    });

    headerHeight = position.interpolate({
      inputRange: [0, height / 2],
      outputRange: [40, 15],
    });

    bottomButton = position.interpolate({
      inputRange: [0, height / 8],
      outputRange: [
        Platform.OS === 'android' ? height * 0.1 : height * 0.2,
        15,
      ],
    });
  }

  const decreaseHeightView = React.useCallback(() => {
    Animated.timing(position, {
      toValue: height / 2,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMode('small');
    });
  }, [position]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => {
      return (
        <ImageItem
          image={item}
          key={index}
          selected={!!selectItemsObject[item.uri]}
          onSelect={onSelectHandle}
          order={
            selectItemsObject[item.uri]
              ? selectItemsObject[item.uri].order
              : null
          }
          primaryColor={primaryColor}
        />
      );
    },
    [onSelectHandle, primaryColor, selectItemsObject]
  );

  const handlePressSendImage = React.useCallback(() => {
    endingPickImageHandle(
      Object.keys(selectItemsObject).map(
        (item) => selectItemsObject[item].image
      )
    );
    decreaseHeightView();
    reset();
    setVisible(!isVisible);
  }, [
    decreaseHeightView,
    endingPickImageHandle,
    isVisible,
    reset,
    selectItemsObject,
    setVisible,
  ]);

  return (
    <>
      {isVisible && (
        <SafeAreaView>
          <Animated.View
            style={[styles.contentContainer, { height: heightView }]}
          >
            <View style={styles.topLineContainer}>
              <View style={styles.topLine} />
            </View>
            <Animated.View
              style={[
                {
                  width: '100%',
                  height: headerHeight,
                },
              ]}
              {...panResponder.panHandlers}
            >
              {/**  Header Start */}
              <Animated.View
                style={[
                  styles.headerContainer,
                  {
                    opacity: headerOpacity,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    onCancel();
                    decreaseHeightView();
                    reset();
                  }}
                  style={styles.hideIcon}
                >
                  <View>
                    <CloseIcon color={primaryColor} />
                  </View>
                </TouchableOpacity>

                <View style={styles.textContainer}>
                  <Text style={[styles.textHeader]}>
                    {headerImagePicker ? headerImagePicker : 'Images'}
                  </Text>
                </View>
              </Animated.View>
            </Animated.View>
            {/**  Header End */}

            {images.length > 0 && (
              <FlatList
                data={images}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.fileName + index.toString()}
                numColumns={3}
                onEndReachedThreshold={0.5}
                onEndReached={loadMoreImages}
              />
            )}
            <Animated.View style={{ bottom: bottomButton }}>
              {numberSelectedItem > 0 && (
                <SendImageButton
                  primaryColor={primaryColor}
                  textSendImage={textSendImage}
                  onPress={handlePressSendImage}
                  numberSelectedItem={numberSelectedItem}
                  buttonBottom={0}
                />
              )}
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  topLineContainer: {
    alignItems: 'center',
  },
  topLine: {
    height: 5,
    width: '20%',
    backgroundColor: '#979797',
    borderRadius: 50,
  },
  hideIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    padding: 15,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export interface AnimatedImagePickerProps {
  //

  headerImagePicker?: string;

  textSendImage?: string;

  primaryColor?: string;

  isVisible?: boolean;

  onCancel: () => void;

  limitImageNumber?: number;

  overLimitedImageNumberHandle?: () => void;

  endingPickImageHandle: (images: ImagePickerResponse[]) => void;

  setVisible?: any;
}

AnimatedImagePicker.defaultProps = {
  //
};

AnimatedImagePicker.propTypes = {
  //
};

export default AnimatedImagePicker;
