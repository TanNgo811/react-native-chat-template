import { httpConfig } from '../config/repository';
import buildUrl from 'build-url';
import { API_BASE_URL, API_CONVERSATION } from '../config/api-consts';
import { Repository } from 'react3l-common';
import nameof from 'ts-nameof.macro';
import type { AxiosError, AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

import type { Observable } from 'rxjs';

import { fileURICleaner } from '../helpers/file';
import { PLATFORM_IS_IOS } from '../config/consts';
import { getFileName } from '../helpers/get-file-name';
// @ts-ignore
import kebabCase from 'lodash/kebabCase';
import type {
  Conversation,
  ConversationFile,
  ConversationFilter,
  ConversationMessageFilter,
  ConversationType,
  ConversationTypeFilter,
  GlobalUser,
  GlobalUserFilter,
  ImagePickerResponse,
} from 'react-native-chat-bar';

export class ConversationRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = buildUrl(API_BASE_URL, {
      path: API_CONVERSATION,
    });
  }

  public count = (
    countConversationFilter: ConversationFilter
  ): Observable<number> => {
    return this.http
      .post(kebabCase(nameof(this.count)), countConversationFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (
    countConversationFilter: ConversationFilter
  ): Observable<Conversation[]> => {
    return this.http
      .post(kebabCase(nameof(this.list)), countConversationFilter)
      .pipe(map((response: AxiosResponse<Conversation[]>) => response.data));
  };

  public get = (conversation: Conversation): Observable<Conversation> => {
    return this.http
      .post(kebabCase(nameof(this.get)), conversation)
      .pipe(map((response: AxiosResponse<Conversation>) => response.data));
  };

  public getGlobalUser = (globalUser: GlobalUser): Observable<GlobalUser> => {
    return this.http
      .post(kebabCase(nameof(this.getGlobalUser)), globalUser)
      .pipe(map((response: AxiosResponse<GlobalUser>) => response.data));
  };

  public create = (conversation: Conversation): Observable<Conversation> => {
    return this.http
      .post(kebabCase(nameof(this.create)), conversation)
      .pipe(map((response: AxiosResponse<Conversation>) => response.data));
  };

  public update = (conversation: Conversation): Observable<Conversation> => {
    return this.http
      .post(kebabCase(nameof(this.update)), conversation)
      .pipe(map((response: AxiosResponse<Conversation>) => response.data));
  };

  public delete = (conversation: Conversation): Observable<Conversation> => {
    return this.http
      .post(kebabCase(nameof(this.delete)), conversation)
      .pipe(map((response: AxiosResponse<Conversation>) => response.data));
  };

  public singleListConversationMessage = (
    conversationMessageFilter: ConversationMessageFilter
  ): Observable<Conversation[]> => {
    return this.http
      .post(
        kebabCase(nameof(this.singleListConversationMessage)),
        conversationMessageFilter
      )
      .pipe(map((response: AxiosResponse<Conversation[]>) => response.data));
  };

  public singleListConversationType = (
    conversationTypeFilter: ConversationTypeFilter
  ): Observable<ConversationType[]> => {
    return this.http
      .post(
        kebabCase(nameof(this.singleListConversationType)),
        conversationTypeFilter
      )
      .pipe(
        map((response: AxiosResponse<ConversationType[]>) => response.data)
      );
  };

  public singleListGlobalUser = (
    globalUserFilter: GlobalUserFilter
  ): Observable<GlobalUser[]> => {
    return this.http
      .post(kebabCase(nameof(this.singleListGlobalUser)), globalUserFilter)
      .pipe(map((response: AxiosResponse<GlobalUser[]>) => response.data));
  };

  public uploadFile = (
    image: ImagePickerResponse
  ): Promise<ConversationFile> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      formData.append('file', {
        name: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
        filename: PLATFORM_IS_IOS
          ? image.fileName
          : getFileName(image.uri, true),
        type: image.type,
        uri: fileURICleaner(image.uri),
        timestamp: image.timestamp,
      });

      return this.http
        .post(kebabCase(nameof(this.uploadFile)), formData)
        .pipe(map((response: AxiosResponse<ConversationFile>) => response.data))
        .toPromise()
        .then((response: AxiosResponse<ConversationFile>) => {
          resolve(response);
        })
        .catch((error: AxiosError<ConversationFile>) => {
          reject(error);
        });
    });
  };

  public multiUploadFile = (
    images: ImagePickerResponse[]
  ): Promise<ConversationFile[]> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      images.map((image) => {
        formData.append('files', {
          name: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
          filename: PLATFORM_IS_IOS
            ? image.fileName
            : getFileName(image.uri, true),
          type: image.type,
          uri: fileURICleaner(image.uri),
          timestamp: image.timestamp,
        });
      });

      return this.http
        .post(kebabCase(nameof(this.multiUploadFile)), formData)
        .pipe(
          map((response: AxiosResponse<ConversationFile[]>) => response.data)
        )
        .toPromise()
        .then((response: ConversationFile[]) => {
          resolve(response);
        })
        .catch((error: AxiosError<ConversationFile>) => {
          reject(error);
        });
    });
  };

  public uploadAvatar = (
    image: ImagePickerResponse,
    conversationId: number
  ): Promise<Conversation> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      formData.append('file', {
        name: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
        filename: PLATFORM_IS_IOS
          ? image.fileName
          : getFileName(image.uri, true),
        type: image.type,
        uri: fileURICleaner(image.uri),
        timestamp: image.timestamp,
      });

      formData.append('ConversationId', conversationId);

      return this.http
        .post(kebabCase(nameof(this.uploadAvatar)), formData)
        .pipe(map((response: AxiosResponse<Conversation>) => response.data))
        .toPromise()
        .then((response: AxiosResponse<Conversation>) => {
          resolve(response);
        })
        .catch((error: AxiosError<Conversation>) => {
          reject(error);
        });
    });
  };
}

export const conversationRepository: ConversationRepository =
  new ConversationRepository();
