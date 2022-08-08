export interface IOverdueMaterial {
  __typename?: 'Material' | undefined;
  id: string;
  title: string;
}

export interface IOverduePerson {
  __typename?: 'Person' | undefined;
  id: string;
  username: string;
  avatar: string;
}

export interface IOverdueItem {
  __typename?: 'Status' | undefined;
  id: string;
  created_at: any;
  material: IOverdueMaterial;
  person: IOverduePerson;
}

// Array<{ __typename?: "Status" | undefined; id: string; created_at: any; material: { __typename?: "Material" | undefined; id: string; title: string; }; person: { __typename?: "Person" | undefined; id: string; username: string; }; } | null>.filter<S>(     predicate: (value: ({__typename?: "Status" | undefined, id: string, created_at: any, material: {__typename?: "Material" | undefined, id: string, title: string}, person: {__typename?: "Person" | undefined, id: string, username: string}} | null), index: number, array: ({__typename?: "Status" | undefined, id: string, created_at: any, material: {__typename?: "Material" | undefined, id: string, title: string}, person: {__typename?: "Person" | undefined, id: string, username: string}} | null)[]) => boolean,     thisArg?: any): S[]
