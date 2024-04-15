import {
  Model,
  Table,
  Scopes,
  Column,
  DataType,
  BeforeCreate,
  BeforeSave,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import Profile from './profile.model';
import Expense from './expense.model';

@Scopes(() => ({
  withPass: {
    attributes: { include: ['password'] },
  },
}))
@Table({
  tableName: 'User',
  freezeTableName: true,
  modelName: 'User',
  name: {
    singular: 'User',
    plural: 'Users',
  },
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  user!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  active!: number;

  @ForeignKey(() => Profile)
  @Column(DataType.INTEGER)
  declare profileId: number;

  @BelongsTo(() => Profile)
  Profile!: Profile;

  @HasMany(() => Expense)
  Expenses!: Expense[];
  declare getExpenses: () => Promise<Expense[]>;

  @BeforeCreate
  @BeforeSave
  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
