import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, Validate, AfterCreate, BelongsTo} from 'sequelize-typescript';
import User from './user.model';
import { sendEmail } from '../services/email.service';

@Table({
  tableName: 'Expense',
  freezeTableName: true,
  modelName: 'Expense',
  name: {
    singular: 'Expense',
    plural: 'Expenses',
  },
})

export default class Expense extends Model<Expense> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(191),
    allowNull: false,
  })
  description!: string;

  @Validate({
    isDate: true,
    isNotFuture(value: string) {
      if (new Date(value) > new Date()) {
        throw new Error("Date cannot be in the future.");
      }
    }
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Validate({
    min: {
      args: [0],
      msg: "Value cannot be negative."
    }
  })
  @Column({
    type: DataType.DECIMAL(10,2),
    allowNull: false,
  })
  value!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare updatedBy: number;

  @BelongsTo(() => User)
  user!: User;
  
  @AfterCreate
  static async sendEmailAfterCreate(expense: Expense): Promise<void> {
    if (expense.userId) {
      const user = await expense.$get('user');
      if (user && user.email) {
        await sendEmail(user.email, 'Expense Registered', `A new expense was registered: ${expense.description}`);
      }
    }
  }
}
