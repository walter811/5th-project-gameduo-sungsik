import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { History } from 'src/entities/history.entity';
import { User } from 'src/entities/user.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, History],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
});

export default dataSource;
