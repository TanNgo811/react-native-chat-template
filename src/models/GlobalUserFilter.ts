import { ModelFilter } from 'react3l-common';
import { GuidFilter, IdFilter, StringFilter } from 'react3l-advanced-filters';

export class GlobalUserFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public username?: StringFilter = new StringFilter();

  public displayName?: StringFilter = new StringFilter();

  public rowId?: GuidFilter = new GuidFilter();
}
