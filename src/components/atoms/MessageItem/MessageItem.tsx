import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import type { ConversationMessage } from '../../../models/ConversationMessage';
import moment from 'moment';
import ImageChat from '../ImageConversation/ImageConversation';

const MessageViewComponent: FC<PropsWithChildren<MessageViewComponentProps>> = (
  props: PropsWithChildren<MessageViewComponentProps>
): ReactElement => {
  const { consecutive, response, item } = props;

  const [time, setTime] = React.useState<boolean>(false);

  const handleShowTime = React.useCallback(() => {
    setTime(!time);
  }, [time]);

  const [messageContainer, setMessageContainer] = React.useState<any>(null);

  React.useEffect(() => {
    try {
      setMessageContainer(JSON.parse(item?.content));
    } catch (e) {
      setMessageContainer(item.content);
    }
  }, [item.content]);

  const renderImage = (images: string[]) => (
    <View>
      <View style={[{ flexDirection: 'row' }]}>
        {images[0] && (
          <ImageChat imageSource={images[0]} style={styles.imageComponent} />
        )}
        {images[1] && (
          <ImageChat imageSource={images[1]} style={styles.imageComponent} />
        )}
      </View>
      <View style={[{ flexDirection: 'row' }]}>
        {images[2] && (
          <ImageChat imageSource={images[2]} style={styles.imageComponent} />
        )}
        {images.length > 3 ? (
          <View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <View style={styles.moreThan4} />
            <View style={styles.countContainer}>
              <Text style={[styles.textMore]}>+{images.length - 4}</Text>
            </View>
            <ImageChat
              imageSource={images[3]}
              style={[styles.imageComponent]}
            />
          </View>
        ) : (
          images[3] && (
            <ImageChat imageSource={images[3]} style={styles.image} />
          )
        )}
      </View>
    </View>
  );

  const renderMessageComponent =
    messageContainer && typeof messageContainer === 'object' ? (
      <>
        {messageContainer.message && (
          <Text style={styles.value}>{messageContainer.message}</Text>
        )}
        {messageContainer.imagePath &&
        Array.isArray(messageContainer.imagePath) ? (
          messageContainer.imagePath.length > 1 ? (
            renderImage(messageContainer.imagePath)
          ) : (
            <ImageChat
              imageSource={messageContainer.imagePath[0]}
              style={styles.image}
            />
          )
        ) : (
          messageContainer.imagePath && (
            <ImageChat
              imageSource={messageContainer.imagePath}
              style={styles.image}
            />
          )
        )}
      </>
    ) : (
      <Text style={styles.value}>{messageContainer}</Text>
    );

  return (
    <>
      {response ? (
        <TouchableOpacity activeOpacity={1} onPress={handleShowTime}>
          <View style={styles.containerViewLeft}>
            {!consecutive ? (
              <Image
                source={{
                  uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
                }}
                style={styles.thumbSize}
              />
            ) : (
              <View style={styles.thumbSize} />
            )}
            <View style={styles.timeAndMessageLeft}>
              <View style={styles.viewTitleLeft}>{renderMessageComponent}</View>
              {time && (
                <View style={[styles.timeContainer]}>
                  <Text style={[styles.time, { textAlign: 'right' }]}>
                    {moment(item.createdAt).format('hh:mm A')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleShowTime}
          style={[styles.containerViewRight]}
        >
          <View style={styles.timeAndMessageRight}>
            <View style={styles.viewTitleRight}>{renderMessageComponent}</View>
            {time && (
              <View style={[styles.timeContainer]}>
                <Text style={styles.time}>
                  {moment(item.createdAt).format('hh:mm A')}
                </Text>
              </View>
            )}
          </View>

          {!consecutive ? (
            <Image
              source={{
                uri: 'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
              }}
              style={styles.thumbSize}
            />
          ) : (
            <View style={styles.thumbSize} />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerViewLeft: {
    flexDirection: 'row',
    paddingVertical: 8,
  },

  timeAndMessageLeft: {
    marginRight: '10%',
  },

  viewTitleLeft: {
    justifyContent: 'center',
    borderRadius: 13,
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F6F7FA',
  },

  containerViewRight: {
    flexDirection: 'row',
    paddingVertical: 8,
    justifyContent: 'flex-end',
  },

  timeAndMessageRight: {
    marginLeft: '10%',
  },

  viewTitleRight: {
    justifyContent: 'center',
    borderRadius: 13,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F6F7FA',
  },

  thumbSize: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },

  value: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 17,
    letterSpacing: -0.02,
    color: '#50555C',
  },

  timeContainer: {
    marginBottom: 4,
  },

  time: {
    marginTop: 5,
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.02,
    color: '#50555C',
  },

  imageComponent: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 3,
    zIndex: 0,
  },

  textMore: {
    color: 'white',
    fontSize: 16,
  },

  image: {
    height: 150,
    width: 150,
    borderRadius: 5,
  },

  moreThan4: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 3,
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    zIndex: 10,
  },

  countContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 3,
    zIndex: 11,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export interface MessageViewComponentProps {
  //
  consecutive: boolean;

  response: boolean;

  item: ConversationMessage;
}

MessageViewComponent.defaultProps = {
  //
};

MessageViewComponent.propTypes = {
  //
};

export default React.memo(MessageViewComponent);
