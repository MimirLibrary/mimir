interface IPerson {
  __typename?: 'Person' | undefined;
  id: string;
  username: string;
  avatar: string;
}

export interface IField {
  __typename?: 'Message' | undefined;
  id: string;
  created_at: Date;
  title: string;
  message: string;
  description?: string;
  person_id: number;
  person: IPerson;
}
