interface IPerson {
  __typename?: 'Person' | undefined;
  id: string;
  username: string;
  avatar: string;
}

interface IStatus {
  __typename?: 'Status' | undefined;
  id: string;
  status: string;
  person: IPerson;
}

export interface IMaterialDonate {
  __typename?: 'Material' | undefined;
  id: string;
  title: string;
  statuses: Array<IStatus | null>;
}
