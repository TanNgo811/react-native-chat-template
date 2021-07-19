import { ModelFilter } from 'react3l-common';
import { DateFilter, IdFilter, StringFilter } from 'react3l-advanced-filters';

export class ConversationMessageFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public conversationId?: IdFilter = new IdFilter();

  public conversationTypeId?: IdFilter = new IdFilter();

  public globalUserId?: IdFilter = new IdFilter();

  public content?: StringFilter = new StringFilter();

  public createdAt?: DateFilter = new DateFilter();

  public updatedAt?: DateFilter = new DateFilter();
}
