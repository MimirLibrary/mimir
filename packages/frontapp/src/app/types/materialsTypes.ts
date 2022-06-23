export interface IStatus {
  __typename?: 'Status';
  id: string;
  created_at: any;
  status: string;
}

export interface IMaterial {
  __typename?: 'Material';
  title: string;
  created_at: any;
  picture?: string | null;
  author: string;
  category: string;
  id: string;
  statuses: Array<IStatus | null>;
}

export interface IMaterialsState {
  searchMaterials: Array<IMaterial | null> | null | undefined;
}
