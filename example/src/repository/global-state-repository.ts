import React from 'reactn';

import type { GlobalUser } from 'src/models/GlobalUser';
import type { ConversationMessage } from 'src/models/ConversationMessage';

import type { AppUser } from '../models/AppUser';
import { GlobalState } from '../app/global-state';

export class GlobalStateRepository {
  public async initialize() {
    await React.setGlobal<GlobalState>({
      user: {},
      globalUser: {},
      token: '',
      comingMessage: {},
    });
  }

  public async setState(globalState: Partial<GlobalState>) {
    await React.setGlobal<GlobalState>(globalState);
  }

  public async removeCredentials() {
    await Promise.all([
      React.setGlobal<GlobalState>({
        user: {},
        token: '',
      }),
    ]);
  }

  public async saveCredentials(user: AppUser) {
    await Promise.all([
      React.setGlobal<GlobalState>({
        user,
        token: user?.token,
      }),
    ]);
    if (user?.token) {
      //
    }
  }

  public async saveGlobalUser(globalUser: GlobalUser) {
    await React.setGlobal<GlobalState>({
      globalUser,
    });
  }

  public async removeGlobalUser() {
    await React.setGlobal<GlobalState>({
      ...new GlobalState(),
      globalUser: {},
    });
  }

  public async addTotalMessage(message: ConversationMessage) {
    await React.setGlobal<GlobalState>({
      comingMessage: message,
    });
  }
}

export const globalStateRepository: GlobalStateRepository =
  new GlobalStateRepository();
