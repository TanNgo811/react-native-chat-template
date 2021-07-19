import type { Model, ModelFilter } from 'react3l-common';
import type { Dispatch, Reducer } from 'react';
import React from 'react';
import { forkJoin, Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { showError } from '../../helper/Toast';

const DEFAULT_TAKE: number = 10;

export interface ListData<T extends Model, TFilter extends ModelFilter> {
  refreshing: boolean;

  loading: boolean;

  filter: TFilter;

  list: Record<number, T[]>;

  total: number;
}

export interface ListAction<
  T extends Model,
  TFilter extends ModelFilter,
  P extends keyof TFilter
> {
  type: string;

  list?: T[];

  searchField?: P;

  searchType?: keyof TFilter[P];

  searchValue?: string;

  total?: number;

  newFilter?: TFilter;

  item?: T;
}

export const ACTION_SET_LIST: string = 'ACTION_SET_LIST';

export const ACTION_SEARCH_LIST: string = 'ACTION_SEARCH_LIST';

export const ACTION_REFRESH_LIST: string = 'ACTION_REFRESH_LIST';

export const ACTION_RESET_FILTER: string = 'ACTION_RESET_FILTER';

export const ACTION_LOAD_MORE_ITEMS: string = 'ACTION_LOAD_MORE_ITEMS';

export const ACTION_TURN_OFF_LOADING: string = 'ACTION_TURN_OFF_LOADING';

export const ACTION_TURN_ON_LOADING: string = 'ACTION_TURN_ON_LOADING';

export const ACTION_TURN_ON_REFRESHING: string = 'ACTION_TURN_ON_REFRESHING';

export const ACTION_REPLACE_ITEM: string = 'ACTION_REPLACE_ITEM';

export function listReducer<
  T extends Model,
  TFilter extends ModelFilter,
  P extends keyof TFilter
>(state: ListData<any, any>, action: ListAction<T, TFilter, P>) {
  switch (action.type) {
    case ACTION_REFRESH_LIST:
      return {
        ...state,
        list: {},
        filter: {
          ...state.filter,
          skip: 0,
          take: DEFAULT_TAKE,
        },
      };

    case ACTION_RESET_FILTER:
      return {
        ...state,
        filter: action.newFilter,
        list: {},
        total: 0,
        loading: true,
      };

    case ACTION_REPLACE_ITEM:
      state.list = Object.fromEntries(
        Object.entries(state.list).map(([startSkip, list]) => {
          return [
            startSkip,
            list.map((item) => {
              if (item.id === action.item.id) {
                return action.item;
              }
              return item;
            }),
          ];
        })
      );
      return { ...state };

    case ACTION_SEARCH_LIST:
      const isStringField: boolean = typeof action.searchType === 'undefined';
      const isEmptyString: boolean = action.searchValue === '';
      return {
        ...state,
        list: {},
        filter: {
          ...state.filter,
          [action.searchField]: !isEmptyString
            ? isStringField
              ? action.searchValue
              : {
                  [action.searchType]: action.searchValue,
                }
            : isStringField
            ? null
            : {},
          skip: 0,
          take: DEFAULT_TAKE,
        },
        nextAction: ACTION_SET_LIST,
      };

    case ACTION_LOAD_MORE_ITEMS:
      return {
        ...state,
        filter: {
          ...state.filter,
          skip: state.filter.skip + DEFAULT_TAKE,
          take: DEFAULT_TAKE,
        },
      };

    case ACTION_SET_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [state.filter.skip]: action.list,
        },
        total: action.total,
      };

    case ACTION_TURN_OFF_LOADING:
      return {
        ...state,
        loading: false,
        refreshing: false,
      };

    case ACTION_TURN_ON_LOADING:
      return {
        ...state,
        loading: true,
        refreshing: false,
      };

    case ACTION_TURN_ON_REFRESHING:
      return {
        ...state,
        loading: false,
        refreshing: true,
      };

    default:
      return state;
  }
}

export function useList<
  T extends Model,
  TFilter extends ModelFilter,
  P extends keyof TFilter = any
>(
  FilterClass: new () => TFilter,
  getList: (filter: TFilter) => Observable<T[]>,
  getCount: (filter: TFilter) => Observable<number>,
  searchField: P,
  searchType?: keyof TFilter[P]
): [
  // List Data
  T[],
  number,
  boolean,
  boolean,
  TFilter,
  // Dispatch function
  () => void,
  () => void,
  (searchValue: string) => void,
  Dispatch<ListAction<T, TFilter, P>>,
  boolean
] {
  const [
    {
      // Loaded items
      list,
      // Loading state
      loading,
      // Refreshing state
      refreshing,
      // Filter object
      filter,
      // Total filtered items
      total,
    },
    dispatch,
  ] = React.useReducer<
    Reducer<ListData<T, TFilter>, ListAction<T, TFilter, P>>
  >(listReducer, {
    list: {},
    filter: new FilterClass(),
    loading: false,
    refreshing: false,
    total: 0,
  });

  const arrayList: T[] = React.useMemo(() => {
    // @ts-ignore
    return [].concat(...Object.values(list));
  }, [list]);

  const [isFirstLoading, setIsFirstLoading] = React.useState<boolean>(false);

  const handleLoadList = React.useCallback(() => {
    return (
      forkJoin([getList(filter), getCount(filter)])
        // Pipe loading
        .pipe(
          finalize(() => {
            // @ts-ignore
            dispatch({
              type: ACTION_TURN_OFF_LOADING,
            });
          })
        )
    );
  }, [filter, getCount, getList]);

  React.useEffect(() => {
    const subscription: Subscription = handleLoadList().subscribe(
      ([list, total]) => {
        setIsFirstLoading(true);
        // @ts-ignore
        dispatch({
          type: ACTION_SET_LIST,
          list,
          total,
        });
      },
      () => {
        setIsFirstLoading(true);
        showError('Server Error');
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [handleLoadList]);

  const handleRefresh = React.useCallback(() => {
    // @ts-ignore
    dispatch({
      type: ACTION_TURN_ON_REFRESHING,
    });
    // @ts-ignore
    dispatch({
      type: ACTION_REFRESH_LIST,
    });
  }, []);

  const handleLoadMore = React.useCallback(() => {
    if (
      arrayList.length < total &&
      arrayList.length >= DEFAULT_TAKE &&
      total > 0 &&
      !loading
    ) {
      // @ts-ignore
      dispatch({
        type: ACTION_TURN_ON_LOADING,
      });
      // @ts-ignore
      dispatch({
        type: ACTION_LOAD_MORE_ITEMS,
      });
    }
  }, [arrayList.length, loading, total]);

  const handleSearch = React.useCallback(
    (searchValue: string) => {
      // @ts-ignore
      dispatch({
        type: ACTION_TURN_ON_LOADING,
      });
      // @ts-ignore
      dispatch({
        type: ACTION_SEARCH_LIST,
        searchValue,
        searchType,
        searchField,
      });
    },
    [searchField, searchType]
  );

  return [
    arrayList,
    total,
    loading,
    refreshing,
    filter,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    dispatch,
    isFirstLoading,
  ];
}
