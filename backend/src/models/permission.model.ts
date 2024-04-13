import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import Profile from './profile.model';
import ProfilePermission from './profile-permission.model';

@Table({
    tableName: 'Permissao',
    freezeTableName: true,
    modelName: 'Permissao',
    name: {
      singular: 'Permissao',
      plural: 'Permissoes',
    },
})
export default class Permissao extends Model<Permissao> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  action!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Profile, () => ProfilePermission)
  profiles!: Profile[];
}
