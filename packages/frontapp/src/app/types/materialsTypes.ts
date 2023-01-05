import { Status } from '@mimir/apollo-client';

export interface IStatus {
  __typename?: 'Status';
  id: string;
  created_at: any;
  status: string;
  person_id?: number;
  person?: IPerson;
}

export interface IMaterial {
  __typename?: 'Material';
  title: string;
  created_at: any;
  picture?: string | null;
  author: string;
  category: string;
  id: string;
  currentStatus?: IStatus | null;
  claimCount: number;
  identifier: string;
  description: string;
}
interface IPerson {
  __typename?: 'Person' | undefined;
  id: string;
  username: string;
}

export interface IMaterialsState {
  searchMaterials: Array<Partial<IMaterial> | null> | null | undefined;
}
export interface IReader {
  __typename?: 'Person';
  avatar?: string | null;
  id: string;
  statuses?: Array<IStatus | null | undefined> | null;
  username: string;
}
export interface IReadersState {
  searchReaders: Array<IReader | null> | null | undefined;
}
