import { Repository } from 'react3l-common';
import { httpConfig } from '../config/repository';
import buildUrl from 'build-url';
import type { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import { API_ACCOUNT_ROUTE, API_BASE_URL } from '../config/api-consts';
import type { AppUser } from 'react-native-chat-bar';
// @ts-ignore
import kebabCase from 'lodash/kebabCase';
import nameof from 'ts-nameof.macro';

export class AccountRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = buildUrl(API_BASE_URL, {
      path: API_ACCOUNT_ROUTE,
    });
  }

  public login = (user: AppUser): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.login)), user)
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  };
}

export const accountRepository: AccountRepository = new AccountRepository();
