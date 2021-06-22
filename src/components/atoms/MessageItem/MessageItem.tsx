import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const MessageViewComponent: FC<PropsWithChildren<MessageViewComponentProps>> = (
  props: PropsWithChildren<MessageViewComponentProps>
): ReactElement => {
  const { consecutive, response, item } = props;

  const [time, setTime] = React.useState<boolean>(false);

  const handleShowTime = React.useCallback(() => {
    setTime(!time);
  }, [time]);

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
              <View style={styles.viewTitleLeft}>
                <Text style={styles.value}>{item.value}</Text>
              </View>
              {time && (
                <View style={[styles.timeContainer]}>
                  <Text style={[styles.time, { textAlign: 'right' }]}>
                    4:20 am
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
            <View style={styles.viewTitleRight}>
              <Text style={styles.value}>{item.value}</Text>
            </View>
            {time && (
              <View style={[styles.timeContainer]}>
                <Text style={styles.time}>4:20 am</Text>
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
});

export interface MessageViewComponentProps {
  //
  consecutive: boolean;

  response: boolean;

  item: any;
}

MessageViewComponent.defaultProps = {
  //
};

MessageViewComponent.propTypes = {
  //
};

export default React.memo(MessageViewComponent);
