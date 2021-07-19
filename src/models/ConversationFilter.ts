import { ModelFilter } from 'react3l-common';
import { DateFilter, IdFilter, StringFilter } from 'react3l-advanced-filters';

export class ConversationFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public name?: StringFilter = new StringFilter();

  public createdAt?: DateFilter = new DateFilter();

  public updatedAt?: DateFilter = new DateFilter();
}
