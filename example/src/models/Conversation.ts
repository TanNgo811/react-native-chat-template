import type { ConversationParticipant } from './ConversationParticipant';
import type { Moment } from 'moment';
import { Model } from 'react3l-common';
import type { ConversationMessage } from './ConversationMessage';
import type { ConversationType } from './ConversationType';

export class Conversation extends Model {
  public id?: number;

  public name?: string;

  public conversationParticipants?: ConversationParticipant[];

  public lastMessage?: ConversationMessage;

  public conversationType?: ConversationType;

  public createdAt?: Moment;

  public updatedAt?: Moment;
}
