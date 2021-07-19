import type { ConversationParticipant } from './ConversationParticipant';
import type { Moment } from 'moment';
import { Model } from 'react3l-common';

export class Conversation extends Model {
  public id?: number;

  public name?: string;

  public conversationParticipants?: ConversationParticipant[];

  public createdAt?: Moment;

  public updatedAt?: Moment;
}
