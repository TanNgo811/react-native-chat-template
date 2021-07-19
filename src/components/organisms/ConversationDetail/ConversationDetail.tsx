import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MessageItem from '../../atoms/MessageItem/MessageItem';
import ArrowDown from '../../atoms/Icons/ArrowDown';

const ConversationDetail: FC<PropsWithChildren<ConversationDetailProps>> = (
  props: PropsWithChildren<ConversationDetailProps>
): ReactElement => {
  const { listAnswer } = props;

  const [ref, setRef] = React.useState<any>();

  const { width } = Dimensions.get('window');

  const [isScrollEndIconVisible, setScrollEndIconVisible] =
    React.useState<boolean>(false);

  const handleScrollToEnd = React.useCallback(() => {
    ref.scrollToIndex({ animate: true, index: 0, viewOffset: 50 });
  }, [ref]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => {
      return (
        <MessageItem
          item={item}
          key={index}
          response={item.userId === 1}
          consecutive={
            index !== 0 && listAnswer[index - 1].userId === item.userId
          }
        />
      );
    },
    [listAnswer]
  );

  return (
    <>
      <FlatList
        ref={(ref) => {
          setRef(ref);
        }}
        contentContainerStyle={styles.contentView}
        data={listAnswer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={true}
        inverted={true}
        scrollEventThrottle={10}
        onScroll={(event) => {
          if (event.nativeEvent.contentOffset.y > 150) {
            setScrollEndIconVisible(true);
          } else {
            setScrollEndIconVisible(false);
          }
        }}
      />
      {isScrollEndIconVisible && (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            {
              position: 'absolute',
              left: width * 0.45,
              bottom: '3%',
              alignItems: 'center',
            },
          ]}
          onPress={handleScrollToEnd}
        >
          <View style={[styles.scrollToEnd]}>
            <ArrowDown />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  //
  contentView: {
    paddingBottom: 16,
  },

  scrollToEndContainer: {
    position: 'absolute',
    bottom: '1%',
    alignItems: 'center',
  },

  scrollToEnd: {
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#BC2C3D',
  },
});

export interface ConversationDetailProps {
  //
  listAnswer: any;
}

ConversationDetail.defaultProps = {
  //
};

ConversationDetail.propTypes = {
  //
};

export default React.memo(ConversationDetail);
