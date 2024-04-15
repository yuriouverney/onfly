import { FindOptions, Model, ModelStatic, Sequelize } from 'sequelize';
import DatabaseManager from '../../db/database-manager';

export abstract class BaseCrudService<T extends ModelStatic<Model<any, any>>> {
  protected db?: string;
  protected sequelizeInstance: Sequelize;
  model: T;

  constructor(model: T) {
    this.model = model;

    this.sequelizeInstance = this.getSequelizeInstance();
    (this.model as any).sequelize = this.sequelizeInstance;
  }

  getSequelizeInstance(): Sequelize {
    return DatabaseManager.getDatabase();
  }

  async findAll(filter?: FindOptions) {
    return this.model.findAll(filter);
  }

  async findOne(filter?: FindOptions) {
    return this.model.findOne(filter);
  }

  async findById(id: number, filter?: FindOptions) {
    return this.model.findByPk(id, filter);
  }

  async updatedById(id: number, values: any) {
    return this.model.update(values, { where: { id: id } });
  }

  async create(values: any) {
    return this.model.create(values);
  }

  async deleteById(id: number) {
    return this.model.destroy({ where: { id } });
  }
}
