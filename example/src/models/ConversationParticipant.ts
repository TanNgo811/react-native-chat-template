import type { GlobalUser } from './GlobalUser';
import { Model } from 'react3l-common';

export class ConversationParticipant extends Model {
  public id?: number;

  public conversationId?: number;

  public globalUserId?: number;

  public globalUser?: GlobalUser;
}
