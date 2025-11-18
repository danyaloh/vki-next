// db/AppDataSource.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db',
  entities: [Group, Student],
  synchronize: true,
  logging: false,
});

let isInitialized = false;

export const initializeDataSource = async (): Promise<DataSource> => {
  if (!isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
    console.log('Data Source has been initialized!');

    const groupRepo = AppDataSource.getRepository(Group);
    const count = await groupRepo.count();

    if (count === 0) {
      const defaultGroup = groupRepo.create({
        name: 'Группа 1',
        contacts: '',
      });

      const saved = await groupRepo.save(defaultGroup);
      console.log('Created default group with id', saved.id);
    }
  }

  return AppDataSource;
};

export default AppDataSource;
