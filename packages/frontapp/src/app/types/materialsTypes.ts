export interface IStatus {
  __typename?: 'Status';
  id: string;
  created_at: Date;
  status: string;
  person?: IPerson;
}

export interface IMaterial {
  __typename?: 'Material';
  title: string;
  created_at: Date;
  picture?: string | null;
  author: string;
  category: string;
  id: string;
  statuses: Array<IStatus | null>;
  is_donated?: boolean;
}
interface IPerson {
  __typename?: 'Person' | undefined;
  id: string;
  username: string;
}

export interface IMaterialsState {
  searchMaterials: Array<IMaterial | null> | null | undefined;
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
