import sqlite3 from 'sqlite3';

import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import type FioInterface from '@/types/FioInterface';

sqlite3.verbose();

const DB_PATH = process.env.DB ?? './db/vki-web.db';

/** Получение студентов */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(DB_PATH);

  const students = await new Promise<StudentInterface[]>((resolve, reject) => {
    db.all(
      `SELECT id, firstName, lastName, middleName, 0 as isDeleted FROM student ORDER BY id DESC`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        resolve(rows as StudentInterface[]);
        db.close();
      }
    );
  });

  return students;
};

/** Добавление одного студента */
export const addStudentDb = async (payload: {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
}): Promise<{ id: number } & typeof payload> => {
  const db = new sqlite3.Database(DB_PATH);

  const created = await new Promise<{ id: number } & typeof payload>((resolve, reject) => {
    db.run(
      `INSERT INTO student (firstName, lastName, middleName, groupId) VALUES (?, ?, ?, ?)`,
      [payload.firstName, payload.lastName, payload.middleName, payload.groupId],
      function (this: sqlite3.RunResult, err: Error | null) {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        resolve({ id: Number(this.lastID), ...payload });
        db.close();
      }
    );
  });

  return created;
};

/** Удаление студента по id */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const db = new sqlite3.Database(DB_PATH);

  await new Promise<void>((resolve, reject) => {
    db.run(
      `DELETE FROM student WHERE id = ?`,
      [studentId],
      (err) => {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        resolve();
        db.close();
      }
    );
  });

  return studentId;
};

/** Тестовый массовый insert — уже был у тебя, оставляю */
export const addRandomStudentsDb = async (): Promise<FioInterface[]> => {
  const db = new sqlite3.Database(DB_PATH);
  const fios: FioInterface[] = Array.from({ length: 10 }, () => getRandomFio());

  const fiosInsert = fios
    .map((f) => `('${f.firstName}', '${f.lastName}', '${f.middleName}', 1)`)
    .join(', ');

  await new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO student (firstName, lastName, middleName, groupId) VALUES ${fiosInsert}`,
      [],
      (err) => {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        resolve();
        db.close();
      }
    );
  });

  return fios;
};
