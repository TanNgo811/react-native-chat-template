import { Model } from 'react3l-common';
import type { Moment } from 'moment';

export class AppUser extends Model {
  public id?: number;

  public username?: string;

  public password?: string;

  public displayName?: string;

  public avatar?: string;

  public token?: string;

  public createdAt?: Moment;

  public updatedAt?: Moment;

  public deletedAt?: Moment;

  public rowId?: string;
}
