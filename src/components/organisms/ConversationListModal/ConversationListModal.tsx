import React, { FC, PropsWithChildren, ReactElement } from 'react';
import type { Conversation } from '../../../models/Conversation';
import {
  ListRenderItem,
  ListRenderItemInfo,
  TouchableOpacity,
  Modal as ModalNative,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import HeaderSearch from '../../morecules/HeaderSearch/HeaderSearch';

const ConversationListModal: FC<PropsWithChildren<EmployeeListChatProps>> = (
  props: PropsWithChildren<EmployeeListChatProps>
): ReactElement => {
  const {
    visible,
    onLeftPress,
    onSearch,
    listConversation,
    loadMore,
    refreshing,
    onRefresh,
    onGoToConversationDetail,
    onSelectConversation,
    END_REACHED_THRESHOLD,
  } = props;

  const renderItem: ListRenderItem<Conversation> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<Conversation>) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={async () => {
            await onSelectConversation();
            await onGoToConversationDetail(item);
          }}
          style={[styles.lineViewEmployee]}
          key={index}
        >
          <Text style={[styles.textItem]}>
            {item.name ? item.name : 'Cuộc hội thoại'}
          </Text>
          <Text style={[styles.textMember]}>
            Thành viên:{' '}
            {item?.conversationParticipants?.map((participant, index) => {
              return (index ? ', ' : '') + participant?.globalUser?.displayName;
            })}
          </Text>
        </TouchableOpacity>
      );
    },
    [onGoToConversationDetail, onSelectConversation]
  );

  return (
    <ModalNative visible={visible}>
      <SafeAreaView style={[styles.safeAreaViewTop]} />
      <View style={[styles.container]}>
        <HeaderSearch
          onChangeText={onSearch}
          onLeftPress={onLeftPress}
          placeholder={'Nhập tên hội thoại để tìm kiếm'}
        />
        <View style={[styles.flatListContainer]}>
          <FlatList
            style={[styles.scrollViewDropDow]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyleDrop}
            data={listConversation}
            keyExtractor={(item, index) =>
              item?.id?.toString() + index.toString()
            }
            renderItem={renderItem}
            onEndReachedThreshold={END_REACHED_THRESHOLD}
            onEndReached={loadMore}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </View>
      <SafeAreaView style={[styles.safeAreaViewBottom]} />
    </ModalNative>
  );
};

const styles = StyleSheet.create({
  safeAreaViewTop: {
    backgroundColor: '#BC2C3D',
  },

  safeAreaViewBottom: {
    backgroundColor: '#FFF',
    flex: 0,
  },

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5FA',
    flex: 1,
  },

  itemContainer: {},

  lineViewEmployee: {
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },

  textItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#223263',
  },

  textMember: {
    fontSize: 12,
    color: '#979797',
  },

  flatListContainer: {
    width: '100%',
    height: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  scrollViewDropDow: {
    backgroundColor: '#F5F5FA',
  },

  contentContainerStyleDrop: {},
});

export interface EmployeeListChatProps {
  //
  visible: boolean;

  onLeftPress: () => void;

  onSearch: (text: string) => void;

  listConversation: Conversation[];

  loadMore: () => void;

  refreshing: boolean;

  onSelectConversation: () => void;

  onRefresh: () => void;

  navigation?: StackScreenProps<any>['navigation'];

  keyExtractor: string;

  END_REACHED_THRESHOLD?: number;

  onGoToConversationDetail: (conversation: Conversation) => {};
}

ConversationListModal.defaultProps = {
  //
};

ConversationListModal.propTypes = {
  //
};

export default React.memo(ConversationListModal);
