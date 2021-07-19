import type { Dispatch } from 'react';
import React from 'react';
import type { Conversation } from '../../models/Conversation';
import { ConversationFilter } from '../../models/ConversationFilter';
import type { ListAction } from '../list-service/use-list';
import { listService } from '../list-service';
import type { GlobalUser } from '../../models/GlobalUser';
import type { Observable, Subscription } from 'rxjs';
import type { GlobalUserFilter } from '../../models/GlobalUserFilter';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ConversationParticipant } from '../../models/ConversationParticipant';
import type { AppUser } from '../../types/AppUser';

const DEFAULT_TAKE = 10;

export const conversationService = {
  useListConversation(
    listConversationRepository: (
      filter: ConversationFilter
    ) => Observable<Conversation[]>,
    countConversationRepository: (
      filter: ConversationFilter
    ) => Observable<number>
  ): [
    Conversation[],
    number,
    boolean,
    boolean,
    ConversationFilter,
    // Dispatch function
    () => void,
    () => void,
    (searchValue: string) => void,
    Dispatch<ListAction<Conversation, ConversationFilter, 'name'>>,
    boolean
  ] {
    const [
      listUser,
      total,
      loadingUser,
      refreshing,
      filter,
      loadMore,
      handRefresh,
      handleSearch,
      dispatch,
      firstLoading,
    ] = listService.useList<Conversation, ConversationFilter, 'name'>(
      ConversationFilter,
      listConversationRepository,
      countConversationRepository,
      'name',
      'contain'
    );

    return [
      listUser,
      total,
      loadingUser,
      refreshing,
      filter,
      loadMore,
      handRefresh,
      handleSearch,
      dispatch,
      firstLoading,
    ];
  },

  useListGlobalUser(
    singleListGlobalUserConversationRepository: (
      filter: GlobalUserFilter
    ) => Observable<GlobalUser[]>
  ): [
    GlobalUser[],
    () => void,
    () => void,
    boolean,
    (searchValue: string) => {}
  ] {
    const [globalUsers, setGlobalUsers] = React.useState<GlobalUser[]>([]);

    const [currentSkip, setSkip] = React.useState<number>(0);

    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
      const subscription: Subscription =
        singleListGlobalUserConversationRepository({
          skip: 0,
          take: DEFAULT_TAKE,
        }).subscribe(
          (users: GlobalUser[]) => {
            setGlobalUsers(users);
            setLoading(false);
          },
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
      return function cleanup() {
        subscription.unsubscribe();
      };
    }, [singleListGlobalUserConversationRepository]);

    const handleLoadMore = React.useCallback(() => {
      setSkip(currentSkip + DEFAULT_TAKE);
      setLoading(true);

      const subscription: Subscription =
        singleListGlobalUserConversationRepository({
          skip: currentSkip,
          take: DEFAULT_TAKE,
        }).subscribe(
          (users: GlobalUser[]) => {
            setGlobalUsers([...globalUsers, users]);
            setLoading(false);
          },
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
      return function cleanup() {
        subscription.unsubscribe();
      };
    }, [currentSkip, globalUsers, singleListGlobalUserConversationRepository]);

    const handleRefresh = React.useCallback(() => {
      const subscription: Subscription =
        singleListGlobalUserConversationRepository({
          skip: 0,
          take: DEFAULT_TAKE,
        }).subscribe(
          (users) => {
            setGlobalUsers(users);
            setLoading(false);
          },
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
      return function cleanup() {
        subscription.unsubscribe();
      };
    }, [singleListGlobalUserConversationRepository]);

    const handleSearch = React.useCallback(
      (searchValue: string) => {
        const subscription: Subscription =
          singleListGlobalUserConversationRepository({
            skip: 0,
            take: DEFAULT_TAKE,
            displayName: {
              contain: searchValue && searchValue,
            },
          }).subscribe(
            (users) => {
              setGlobalUsers(users);
              setLoading(false);
            },
            () => {
              console.log('errors.cannotGetListGlobalUser');
            }
          );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [singleListGlobalUserConversationRepository]
    );

    return [
      globalUsers,
      handleRefresh,
      handleLoadMore,
      isLoading,
      handleSearch,
    ];
  },

  useGetCurrentGlobalUser(
    currentUser: AppUser,
    getGlobalUserConversationRepository: (
      user: GlobalUser
    ) => Observable<GlobalUser>,
    saveGlobalUser: (user: GlobalUser) => void
  ): [] {
    const handleGetGlobalUser = React.useCallback(() => {
      const subscription: Subscription = getGlobalUserConversationRepository({
        rowId: currentUser.rowId,
      }).subscribe(
        async (user: GlobalUser) => {
          await saveGlobalUser(user);
        },
        () => {
          console.log('errors.cannotGetListGlobalUser');
        }
      );
      return function cleanup() {
        subscription.unsubscribe();
      };
    }, [
      currentUser.rowId,
      getGlobalUserConversationRepository,
      saveGlobalUser,
    ]);

    React.useEffect(() => {
      handleGetGlobalUser();
    }, [handleGetGlobalUser]);

    return [];
  },

  useConversation(
    currentGlobalUser: GlobalUser,
    createConversationRepository: (
      conversation: Conversation
    ) => Observable<Conversation>,
    getConversationRepository: (
      conversation: Conversation
    ) => Observable<Conversation>,
    deleteConversationRepository: (
      conversation: Conversation
    ) => Observable<Conversation>,
    updateConversationRepository: (
      conversation: Conversation
    ) => Observable<Conversation>
  ): [
    Conversation,
    (user: GlobalUser) => void,
    (conversationId: number) => void,
    (conversation: Conversation) => void,
    (conversation: Conversation) => void
  ] {
    const [newConversation, setNewConversation] = React.useState<Conversation>(
      {}
    );

    const handleCreateNewConversation = React.useCallback(
      (user: GlobalUser) => {
        const subscription: Subscription = createConversationRepository({
          name: `${currentGlobalUser.displayName}, ${user.displayName}`,
          conversationParticipants: [
            {
              globalUserId: currentGlobalUser.id,
              globalUser: currentGlobalUser,
            },
            {
              globalUserId: user.id,
              globalUser: user,
            },
          ],
        }).subscribe(
          (conversation: Conversation) => {
            setNewConversation(conversation);
          },
          () => {
            console.log('errors.cannotCreateNewConversation');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [createConversationRepository, currentGlobalUser]
    );

    const handleGetConversation = React.useCallback(
      (conversationId: number) => {
        const subscription: Subscription = getConversationRepository({
          id: conversationId,
        }).subscribe(
          async (conversation) => {
            await setNewConversation(conversation);
          },
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [getConversationRepository]
    );

    const handleDeleteConversation = React.useCallback(
      (conversation: Conversation) => {
        const subscription: Subscription = deleteConversationRepository({
          id: conversation.id,
        }).subscribe(
          () => {},
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [deleteConversationRepository]
    );

    const handleUpdateConversation = React.useCallback(
      (conversation: Conversation) => {
        const subscription: Subscription = updateConversationRepository(
          conversation
        ).subscribe(
          () => {},
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [updateConversationRepository]
    );

    return [
      newConversation,
      handleCreateNewConversation,
      handleGetConversation,
      handleDeleteConversation,
      handleUpdateConversation,
    ];
  },

  useGetOutConversation(
    currentGlobalUser: GlobalUser,
    navigation: StackScreenProps<any>['navigation'],
    updateConversationRepository: (
      conversation: Conversation
    ) => Observable<Conversation>,
    conversationListScreen: string
  ): [(conversation: Conversation) => void] {
    const handleOutConversation = React.useCallback(
      (conversation: Conversation) => {
        const subscription: Subscription = updateConversationRepository({
          ...conversation,
          conversationParticipants:
            conversation.conversationParticipants &&
            conversation.conversationParticipants.filter(
              (member: ConversationParticipant) =>
                member.globalUser &&
                member.globalUser.rowId !== currentGlobalUser.rowId
            ),
        }).subscribe(
          () => {
            navigation.navigate(conversationListScreen);
          },
          () => {
            console.log('errors.cannotGetListGlobalUser');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [
        conversationListScreen,
        currentGlobalUser.rowId,
        navigation,
        updateConversationRepository,
      ]
    );
    return [handleOutConversation];
  },

  useCreateNewConversation(
    currentGlobalUser: GlobalUser,
    navigation: StackScreenProps<any>['navigation'],
    createConversationRepository: (
      conversation: Conversation
    ) => Observable<Conversation>,
    chatDetailScreen: string
  ): [(user: GlobalUser) => void, (users: GlobalUser[]) => void] {
    const handleCreateNewConversation = React.useCallback(
      (user: GlobalUser) => {
        const subscription: Subscription = createConversationRepository({
          name: `${currentGlobalUser.displayName}, ${user.displayName}`,
          conversationParticipants: [
            {
              globalUserId: currentGlobalUser.id,
              globalUser: currentGlobalUser,
            },
            {
              globalUserId: user.id,
              globalUser: user,
            },
          ],
        }).subscribe(
          (conversation: Conversation) => {
            navigation.navigate(chatDetailScreen, {
              conversation: conversation,
            });
          },
          () => {
            console.log('errors.cannotCreateNewConversation');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [
        chatDetailScreen,
        createConversationRepository,
        currentGlobalUser,
        navigation,
      ]
    );

    const handleCreateGroupConversation = React.useCallback(
      (users: GlobalUser[]) => {
        const listUsers = [currentGlobalUser, ...users];

        const subscription: Subscription = createConversationRepository({
          name: `${listUsers.map(
            (item, index) => (index ? ' ' : '') + item.displayName
          )}`,
          conversationParticipants: listUsers.map((user: GlobalUser) => ({
            globalUserId: user.id,
            globalUser: user,
          })),
        }).subscribe(
          (conversation: Conversation) => {
            navigation.navigate(chatDetailScreen, {
              conversation: conversation,
            });
          },
          () => {
            console.log('errors.cannotCreateNewConversation');
          }
        );
        return function cleanup() {
          subscription.unsubscribe();
        };
      },
      [
        chatDetailScreen,
        createConversationRepository,
        currentGlobalUser,
        navigation,
      ]
    );

    return [handleCreateNewConversation, handleCreateGroupConversation];
  },
};
