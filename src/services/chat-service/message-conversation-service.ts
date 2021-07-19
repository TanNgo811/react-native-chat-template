import type { Dispatch } from 'react';
import React from 'react';
import type { Subscription } from 'rxjs';
import type { ConversationMessage } from '../../models/ConversationMessage';
import type { ConversationMessageFilter } from '../../models/ConversationMessageFilter';
import type { ListAction } from '../list-service/use-list';
import { listService } from '../list-service';
import { ConversationFilter } from '../../models/ConversationFilter';
import type { Conversation } from '../../models/Conversation';
import type { GlobalUser } from '../../models/GlobalUser';
import moment from 'moment';
import { showError } from '../../helper/Toast';
import type { Observable } from 'rxjs';

export const messageConversationServices = {
  useListMessages(
    listMessageRepository: (
      filter: ConversationMessageFilter
    ) => Observable<ConversationMessage[]>,
    countMessageRepository: (
      filter: ConversationMessageFilter
    ) => Observable<number>
  ): [
    ConversationMessage[],
    number,
    boolean,
    boolean,
    ConversationMessageFilter,
    // Dispatch function
    () => void,
    () => void,
    (searchValue: string) => void,
    Dispatch<
      ListAction<
        ConversationMessage,
        ConversationMessageFilter,
        'conversationId'
      >
    >,
    boolean
  ] {
    const [
      listMessage,
      total,
      loadingMessage,
      refreshing,
      filter,
      loadMore,
      handRefresh,
      handleSearch,
      dispatch,
      firstLoading,
    ] = listService.useList<
      ConversationMessage,
      ConversationMessageFilter,
      'conversationId'
    >(
      ConversationFilter,
      listMessageRepository,
      countMessageRepository,
      'conversationId',
      'equal'
    );

    return [
      listMessage,
      total,
      loadingMessage,
      refreshing,
      filter,
      loadMore,
      handRefresh,
      handleSearch,
      dispatch,
      firstLoading,
    ];
  },

  useCreateConversationMessage(
    createMessageRepository: (
      message: ConversationMessage
    ) => Observable<ConversationMessage>
  ): [
    (
      conversation: Conversation,
      globalUser: GlobalUser,
      content: string
    ) => void,
    ConversationMessage | undefined
  ] {
    const [currentMessage, setCurrentMessage] =
      React.useState<ConversationMessage>();

    const handleCreateMessage = React.useCallback(
      (conversation: Conversation, globalUser: GlobalUser, content: string) => {
        const subscription: Subscription = createMessageRepository({
          conversation: {
            id: conversation.id,
            name: conversation.name,
          },
          conversationId: conversation.id,
          globalUser: globalUser,
          globalUserId: globalUser.id,
          content: content,
          conversationTypeId: 1,
          conversationType: {
            id: 1,
            code: 'LOCAL',
            name: 'Nội bộ',
          },
          createdAt: moment(new Date()),
        }).subscribe(
          (message) => {
            setCurrentMessage(message);
          },
          () => {
            showError('errors.cannotCreateMessage');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [createMessageRepository]
    );
    return [handleCreateMessage, currentMessage];
  },

  useConversationMessage(
    getMessageRepository: (
      message: ConversationMessage
    ) => Observable<ConversationMessage>,
    deleteMessageRepository: (
      message: ConversationMessage
    ) => Observable<ConversationMessage>,
    updateMessageRepository: (
      message: ConversationMessage
    ) => Observable<ConversationMessage>
  ): [
    ConversationMessage | undefined,
    (message: ConversationMessage) => void,
    (message: ConversationMessage) => void,
    (message: ConversationMessage, content: string) => void
  ] {
    const [currentMessage, setCurrentMessage] =
      React.useState<ConversationMessage>();

    const handleGetMessage = React.useCallback(
      (conversationMessage: ConversationMessage) => {
        const subscription: Subscription = getMessageRepository({
          id: conversationMessage.id,
        }).subscribe(
          (message) => {
            setCurrentMessage(message);
          },
          () => {
            showError('errors.cannotCreateMessage');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [getMessageRepository]
    );

    const handleDeleteMessage = React.useCallback(
      (conversationMessage: ConversationMessage) => {
        const subscription: Subscription = deleteMessageRepository({
          id: conversationMessage.id,
        }).subscribe(
          () => {},
          () => {
            showError('errors.cannotCreateMessage');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [deleteMessageRepository]
    );

    const handleUpdateMessage = React.useCallback(
      (conversationMessage: ConversationMessage, content: string) => {
        const subscription: Subscription = updateMessageRepository({
          id: conversationMessage.id,
          content: content,
        }).subscribe(
          () => {},
          () => {
            showError('errors.cannotCreateMessage');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [updateMessageRepository]
    );

    return [
      currentMessage,
      handleGetMessage,
      handleDeleteMessage,
      handleUpdateMessage,
    ];
  },

  usePrevious(message: ConversationMessage): [ConversationMessage | undefined] {
    const ref = React.useRef<ConversationMessage>();

    React.useEffect(() => {
      ref.current = message;
    }, [message]);

    return [ref.current];
  },
};
