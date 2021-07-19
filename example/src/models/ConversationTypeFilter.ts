import { ModelFilter } from 'react3l-common';
import { IdFilter, StringFilter } from 'react3l-advanced-filters';

export class ConversationTypeFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();
}
