import type { Conversation } from 'src/models/Conversation';
import type { ConversationType } from 'src/models/ConversationType';
import type { GlobalUser } from 'src/models/GlobalUser';
import type { Moment } from 'moment';
import { Model } from 'react3l-common';

export class ConversationMessage extends Model {
  public id?: number;

  public conversationId?: number;

  public conversationTypeId?: number;

  public globalUserId?: number;

  public content?: string;

  public conversation?: Conversation;

  public conversationType?: ConversationType;

  public globalUser?: GlobalUser;

  public createdAt?: Moment;

  public updatedAt?: Moment;
}
