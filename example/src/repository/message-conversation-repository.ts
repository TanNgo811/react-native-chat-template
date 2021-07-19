import { Repository } from 'react3l-common';
import { httpConfig } from '../config/repository';
import buildUrl from 'build-url';
import { API_BASE_URL, API_CONVERSATION_MESSAGE } from '../config/api-consts';
import nameof from 'ts-nameof.macro';
import type { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import type { ConversationMessageFilter } from '../models/ConversationMessageFilter';
import type { Observable } from 'rxjs';
import type { ConversationMessage } from '../models/ConversationMessage';
// @ts-ignore
import kebabCase from 'lodash/kebabCase';

export class MessageConversationRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = buildUrl(API_BASE_URL, {
      path: API_CONVERSATION_MESSAGE,
    });
  }

  public count = (
    conversationMessageFilter: ConversationMessageFilter
  ): Observable<number> => {
    return this.http
      .post(kebabCase(nameof(this.count)), conversationMessageFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (
    conversationMessageFilter: ConversationMessageFilter
  ): Observable<ConversationMessage[]> => {
    return this.http
      .post(kebabCase(nameof(this.list)), conversationMessageFilter)
      .pipe(
        map((response: AxiosResponse<ConversationMessage[]>) => response.data)
      );
  };

  public get = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post(kebabCase(nameof(this.get)), conversationMessage)
      .pipe(
        map((response: AxiosResponse<ConversationMessage>) => response.data)
      );
  };

  public create = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post(kebabCase(nameof(this.create)), conversationMessage)
      .pipe(
        map((response: AxiosResponse<ConversationMessage>) => response.data)
      );
  };

  public update = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post(kebabCase(nameof(this.update)), conversationMessage)
      .pipe(
        map((response: AxiosResponse<ConversationMessage>) => response.data)
      );
  };

  public delete = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post(kebabCase(nameof(this.delete)), conversationMessage)
      .pipe(
        map((response: AxiosResponse<ConversationMessage>) => response.data)
      );
  };
}

export const messageConversationRepository: MessageConversationRepository =
  new MessageConversationRepository();
