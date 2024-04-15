import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import Permission from './permission.model';
import ProfilePermission from './profile-permission.model';

@Table({
  tableName: 'Profile',
  freezeTableName: true,
  modelName: 'Profile',
  name: {
    singular: 'Profile',
    plural: 'Profiles',
  },
})
export default class Profile extends Model<Profile> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  description!: string;

  @BelongsToMany(() => Permission, () => ProfilePermission)
  Permissions!: Permission[];
}
