import type { GlobalUser } from '../models/GlobalUser';
import type { ConversationMessage } from '../models/ConversationMessage';
import type { AppUser } from '../models/AppUser';

export class GlobalState {
  /**
   * Current user profile
   *
   * @type {AppUser}
   */
  user?: AppUser;

  /**
   * Current global user profile
   *
   * @type {GlobalUser}
   */
  globalUser?: GlobalUser;

  /**
   *
   * Chat Messages
   * @type {ConversationMessage}
   *
   */
  comingMessage?: ConversationMessage;

  /**
   * Access token of current user
   */
  token?: string;
}
export const globalState: GlobalState = new GlobalState();
