import { Model } from 'react3l-common';

export class GlobalUser extends Model {
  public id?: number;

  public username?: string;

  public displayName?: string;

  public avatar?: string;

  public rowId?: string;
}
