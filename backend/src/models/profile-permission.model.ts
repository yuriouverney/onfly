import { Model, Table, Column, ForeignKey, DataType } from 'sequelize-typescript';
import Profile from './profile.model';
import Permission from './permission.model';

@Table({
  tableName: 'ProfilePermission',
  freezeTableName: true,
  modelName: 'ProfilePermission',
  timestamps: false,
  name: {
    singular: 'ProfilePermission',
    plural: 'ProfilePermissions',
  },
})
export default class ProfilePermission extends Model<ProfilePermission> {
  @ForeignKey(() => Profile)
  @Column(DataType.INTEGER)
  declare profileId: number;

  @ForeignKey(() => Permission)
  @Column(DataType.INTEGER)
  declare permissionId: number;
}
