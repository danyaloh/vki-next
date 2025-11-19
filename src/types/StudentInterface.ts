import type GroupInterface from './GroupInterface';

export default interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  isDeleted?: boolean;

  groupId?: number;
  group?: GroupInterface;
}
