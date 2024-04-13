import * as dotenv from 'dotenv';
import * as fs from 'fs';

class Environment {
  private envPath: string;

  constructor() {
    this.envPath = `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`;
    this.checkNodeEnv();
    dotenv.config({
      path: this.envPath,
    });
  }

  init(): void {}

  private checkNodeEnv(): void {
    if (!fs.existsSync(this.envPath)) {
      throw new Error(`Arquivo de configuração não encontrado ${this.envPath}`);
    }
  }
}

export default new Environment();
