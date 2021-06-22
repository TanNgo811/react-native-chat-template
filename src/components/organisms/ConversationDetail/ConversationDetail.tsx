import React, { FC, PropsWithChildren, ReactElement } from 'react';
import {
  Dimensions,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import MessageItem from '../../atoms/MessageItem/MessageItem';
import ArrowDown from '../../atoms/Icons/ArrowDown';

const ConversationDetail: FC<PropsWithChildren<ConversationDetailProps>> = (
  props: PropsWithChildren<ConversationDetailProps>
): ReactElement => {
  const { listAnswer } = props;

  const [ref, setRef] = React.useState<any>();

  const { width } = Dimensions.get('window');

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
      <AutoScrollFlatList
        ref={(ref) => {
          setRef(ref);
        }}
        contentContainerStyle={styles.contentView}
        data={listAnswer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={true}
        threshold={100}
        onScrollToIndexFailed={() => {
          ref.scrollToEnd();
        }}
        indicatorComponent={
          <View
            style={[
              {
                left: width * 0.45,
              },
              styles.scrollToEndContainer,
            ]}
          >
            <View style={[styles.scrollToEnd]}>
              <ArrowDown />
            </View>
          </View>
        }
      />
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
