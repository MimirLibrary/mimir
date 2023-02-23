import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Author = {
  __typename?: 'Author';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type BlockedUsers = {
  __typename?: 'BlockedUsers';
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  person: Person;
  state: Scalars['Boolean'];
};

export type BookInput = {
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
};

export type BookUnionResult = Error | Status;

export type CreateAnswerNotification = {
  id: Scalars['Int'];
  message: Scalars['String'];
  person_id: Scalars['Int'];
};

export type CreateLocationInput = {
  location: Scalars['String'];
};

export type CreateMaterialInput = {
  author: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  id_type: Scalars['String'];
  identifier: Scalars['String'];
  location_id: Scalars['Int'];
  picture?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type CreateMessageInput = {
  location_id: Scalars['Int'];
  material_id?: InputMaybe<Scalars['Int']>;
  message: Scalars['String'];
  person_id: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateNotificationInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type CreatePersonInput = {
  location_id: Scalars['Int'];
  smg_id: Scalars['String'];
  type: Scalars['String'];
};

export type CreateSimpleNotification = {
  message: Scalars['String'];
  person_id: Scalars['Int'];
};

export type CreateStateInput = {
  description?: InputMaybe<Scalars['String']>;
  person_id: Scalars['Int'];
  state: Scalars['Boolean'];
};

export type CreateStatusInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
  status: Scalars['String'];
};

export type DonateBookInput = {
  author: Scalars['String'];
  category: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id_type: Scalars['String'];
  identifier: Scalars['String'];
  is_donated: Scalars['Boolean'];
  location_id: Scalars['Int'];
  person_id: Scalars['Int'];
  picture?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type IMaterialMeta = {
  __typename?: 'IMaterialMeta';
  authors?: Maybe<Array<Maybe<Author>>>;
  cover?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  meta?: Maybe<Meta>;
  publisher?: Maybe<Publisher>;
  title?: Maybe<Scalars['String']>;
  yearPublishedAt?: Maybe<Scalars['Int']>;
};

export type IMetaOfMaterial = {
  __typename?: 'IMetaOfMaterial';
  idType?: Maybe<Scalars['String']>;
  material?: Maybe<IMaterialMeta>;
  value?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  location: Scalars['String'];
  materials?: Maybe<Array<Maybe<Material>>>;
};

export type Material = {
  __typename?: 'Material';
  author: Scalars['String'];
  category: Scalars['String'];
  claimCount: Scalars['Int'];
  claimDuration: Scalars['Int'];
  created_at: Scalars['DateTime'];
  currentStatus?: Maybe<Status>;
  description: Scalars['String'];
  id: Scalars['ID'];
  id_type: Scalars['String'];
  identifier: Scalars['String'];
  is_donated: Scalars['Boolean'];
  location: Location;
  location_id: Scalars['Int'];
  messages: Array<Maybe<Message>>;
  notifications: Array<Maybe<Notification>>;
  picture?: Maybe<Scalars['String']>;
  statuses: Array<Maybe<Status>>;
  title: Scalars['String'];
  type: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Message = {
  __typename?: 'Message';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  location_id: Scalars['Int'];
  material: Material;
  material_id?: Maybe<Scalars['Int']>;
  message: Scalars['String'];
  person: Person;
  person_id: Scalars['Int'];
  title: Scalars['String'];
};

export type Meta = {
  __typename?: 'Meta';
  ageRestriction?: Maybe<Scalars['String']>;
  coverType?: Maybe<Scalars['String']>;
  dimensions?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  mass?: Maybe<Scalars['String']>;
  numberOfPages?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  series?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptItem: BookUnionResult;
  addPersonLocation: Person;
  changePersonRole: Person;
  claimBook: BookUnionResult;
  createAnswerNotification: Notification;
  createLocation?: Maybe<Location>;
  createMaterial: Material;
  createMessageForManager: Message;
  createNotification?: Maybe<Notification>;
  createPerson: Person;
  createSimpleNotification: Notification;
  createState?: Maybe<BlockedUsers>;
  createStatus: Status;
  donateBook: Material;
  prolongClaimPeriod: BookUnionResult;
  rejectItem: BookUnionResult;
  removeLocation?: Maybe<Location>;
  removeMaterial: Material;
  removeNotification?: Maybe<Notification>;
  removePersonLocation: Person;
  returnItem: BookUnionResult;
  updateMaterial: Material;
  updatePerson: Person;
};


export type MutationAcceptItemArgs = {
  input?: InputMaybe<BookInput>;
};


export type MutationAddPersonLocationArgs = {
  input: UpdatePersonLocationInput;
};


export type MutationChangePersonRoleArgs = {
  person_id: Scalars['Int'];
  type: Scalars['String'];
};


export type MutationClaimBookArgs = {
  input?: InputMaybe<BookInput>;
};


export type MutationCreateAnswerNotificationArgs = {
  input: CreateAnswerNotification;
};


export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


export type MutationCreateMaterialArgs = {
  input: CreateMaterialInput;
};


export type MutationCreateMessageForManagerArgs = {
  input: CreateMessageInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationCreateSimpleNotificationArgs = {
  input?: InputMaybe<CreateSimpleNotification>;
};


export type MutationCreateStateArgs = {
  input: CreateStateInput;
};


export type MutationCreateStatusArgs = {
  input: CreateStatusInput;
};


export type MutationDonateBookArgs = {
  input: DonateBookInput;
};


export type MutationProlongClaimPeriodArgs = {
  input?: InputMaybe<ProlongTimeInput>;
};


export type MutationRejectItemArgs = {
  input?: InputMaybe<BookInput>;
};


export type MutationRemoveLocationArgs = {
  input: RemoveLocationInput;
};


export type MutationRemoveMaterialArgs = {
  input: RemoveMaterialInput;
};


export type MutationRemoveNotificationArgs = {
  input: RemoveNotificationInput;
};


export type MutationRemovePersonLocationArgs = {
  input: UpdatePersonLocationInput;
};


export type MutationReturnItemArgs = {
  input?: InputMaybe<BookInput>;
};


export type MutationUpdateMaterialArgs = {
  input: UpdateMaterialInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
  personId: Scalars['Int'];
};

export type Notification = {
  __typename?: 'Notification';
  checked: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  material?: Maybe<Material>;
  material_id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  person: Person;
  person_id: Scalars['Int'];
};

export enum Permissions {
  GrantRevokeManager = 'GRANT_REVOKE_MANAGER'
}

export type Person = {
  __typename?: 'Person';
  avatar: Scalars['String'];
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  lastSeenNotificationDate?: Maybe<Scalars['DateTime']>;
  location?: Maybe<Array<Location>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  permissions?: Maybe<Array<Maybe<Permissions>>>;
  position: Scalars['String'];
  smg_id: Scalars['String'];
  states?: Maybe<Array<Maybe<BlockedUsers>>>;
  statuses?: Maybe<Array<Maybe<Status>>>;
  type: Scalars['String'];
  username: Scalars['String'];
};

export type ProlongTimeInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type Publisher = {
  __typename?: 'Publisher';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAllDonatedMaterialsByPerson?: Maybe<Array<Maybe<Material>>>;
  getAllLocations: Array<Maybe<Location>>;
  getAllMaterials: Array<Maybe<Material>>;
  getAllMessages?: Maybe<Array<Message>>;
  getAllPersons: Array<Person>;
  getAllStatusesIsOverdue: Array<Maybe<Status>>;
  getAllTakenItems: Array<Maybe<Status>>;
  getBlocksByPerson?: Maybe<Array<Maybe<BlockedUsers>>>;
  getItemsForClaimHistory: Array<Maybe<Status>>;
  getMaterialById: Material;
  getMaterialByIdentifier: Material;
  getMaterialByIdentifierFromMetadata?: Maybe<IMetaOfMaterial>;
  getMessagesByPerson?: Maybe<Array<Maybe<Message>>>;
  getNotificationsByMaterial: Array<Maybe<Notification>>;
  getNotificationsByPerson: Array<Maybe<Notification>>;
  getOnePerson: Person;
  getReasonOfBlock?: Maybe<BlockedUsers>;
  getStatusesByMaterial: Array<Maybe<Status>>;
  getStatusesByPerson: Array<Maybe<Status>>;
  welcome: Scalars['String'];
};


export type QueryGetAllDonatedMaterialsByPersonArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllMaterialsArgs = {
  input?: InputMaybe<SearchInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDir?: InputMaybe<SortDir>;
};


export type QueryGetAllMessagesArgs = {
  location_id?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryGetAllPersonsArgs = {
  locations?: InputMaybe<Array<Scalars['Int']>>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllStatusesIsOverdueArgs = {
  locations?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryGetAllTakenItemsArgs = {
  person_id: Scalars['Int'];
};


export type QueryGetBlocksByPersonArgs = {
  person_id: Scalars['ID'];
};


export type QueryGetItemsForClaimHistoryArgs = {
  person_id: Scalars['Int'];
};


export type QueryGetMaterialByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetMaterialByIdentifierArgs = {
  input: SearchOneMaterial;
};


export type QueryGetMaterialByIdentifierFromMetadataArgs = {
  identifier: Scalars['String'];
};


export type QueryGetMessagesByPersonArgs = {
  person_id: Scalars['ID'];
};


export type QueryGetNotificationsByMaterialArgs = {
  material_id: Scalars['Int'];
};


export type QueryGetNotificationsByPersonArgs = {
  person_id: Scalars['Int'];
};


export type QueryGetOnePersonArgs = {
  id: Scalars['ID'];
};


export type QueryGetReasonOfBlockArgs = {
  person_id: Scalars['ID'];
};


export type QueryGetStatusesByMaterialArgs = {
  material_id: Scalars['ID'];
};


export type QueryGetStatusesByPersonArgs = {
  person_id: Scalars['ID'];
};

export type RemoveLocationInput = {
  location_id: Scalars['Int'];
};

export type RemoveMaterialInput = {
  identifier: Scalars['String'];
  location_id: Scalars['Int'];
  type: Scalars['String'];
};

export type RemoveNotificationInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type ResponseMetadata = {
  __typename?: 'ResponseMetadata';
  idType: Scalars['String'];
  value: Scalars['String'];
};

export type SearchInput = {
  accepted?: InputMaybe<Scalars['Boolean']>;
  authors?: InputMaybe<Array<Scalars['String']>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  excludeAuthors?: InputMaybe<Array<Scalars['String']>>;
  excludeCategories?: InputMaybe<Array<Scalars['String']>>;
  excludeLocations?: InputMaybe<Array<Scalars['Int']>>;
  excludeStatuses?: InputMaybe<Array<Scalars['String']>>;
  excludeTypes?: InputMaybe<Array<Scalars['String']>>;
  locations?: InputMaybe<Array<Scalars['Int']>>;
  overdue?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type SearchOneMaterial = {
  identifier: Scalars['String'];
  locations?: InputMaybe<Array<Scalars['Int']>>;
};

export enum SortDir {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Status = {
  __typename?: 'Status';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  material: Material;
  material_id: Scalars['Int'];
  person: Person;
  person_id: Scalars['Int'];
  returnDate?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
};

export type UpdateMaterialInput = {
  author?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  claimDuration: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  id_type?: InputMaybe<Scalars['String']>;
  identifier?: InputMaybe<Scalars['String']>;
  location_id?: InputMaybe<Scalars['Int']>;
  picture?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type UpdatePersonInput = {
  lastSeenNotificationDate?: InputMaybe<Scalars['DateTime']>;
};

export type UpdatePersonLocationInput = {
  location_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type AcceptBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type AcceptBookMutation = { __typename?: 'Mutation', acceptItem: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type AddPersonLocationMutationVariables = Exact<{
  location_id: Scalars['Int'];
  person_id: Scalars['Int'];
}>;


export type AddPersonLocationMutation = { __typename?: 'Mutation', addPersonLocation: { __typename?: 'Person', id: string } };

export type ChangePersonRoleMutationVariables = Exact<{
  person_id: Scalars['Int'];
  type: Scalars['String'];
}>;


export type ChangePersonRoleMutation = { __typename?: 'Mutation', changePersonRole: { __typename?: 'Person', id: string, type: string } };

export type ClaimBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ClaimBookMutation = { __typename?: 'Mutation', claimBook: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string, returnDate?: any | null } };

export type CreateMessageForManagerMutationVariables = Exact<{
  person_id: Scalars['Int'];
  material_id?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  message: Scalars['String'];
  location_id: Scalars['Int'];
}>;


export type CreateMessageForManagerMutation = { __typename?: 'Mutation', createMessageForManager: { __typename?: 'Message', message: string, title: string } };

export type CreateNotificationMutationVariables = Exact<{
  input: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: { __typename?: 'Notification', id: string } | null };

export type CreateSimpleNotificationMutationVariables = Exact<{
  input: CreateSimpleNotification;
}>;


export type CreateSimpleNotificationMutation = { __typename?: 'Mutation', createSimpleNotification: { __typename?: 'Notification', id: string, message?: string | null } };

export type CreateStateMutationVariables = Exact<{
  state: Scalars['Boolean'];
  person_id: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateStateMutation = { __typename?: 'Mutation', createState?: { __typename?: 'BlockedUsers', state: boolean } | null };

export type DonateBookMutationVariables = Exact<{
  person_id: Scalars['Int'];
  location_id: Scalars['Int'];
  identifier: Scalars['String'];
  id_type: Scalars['String'];
  type: Scalars['String'];
  title: Scalars['String'];
  author: Scalars['String'];
  category: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
  is_donated: Scalars['Boolean'];
}>;


export type DonateBookMutation = { __typename?: 'Mutation', donateBook: { __typename?: 'Material', title: string, picture?: string | null, identifier: string } };

export type ProlongTimeMutationVariables = Exact<{
  person_id: Scalars['Int'];
  material_id: Scalars['Int'];
}>;


export type ProlongTimeMutation = { __typename?: 'Mutation', prolongClaimPeriod: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string, returnDate?: any | null } };

export type RejectItemMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type RejectItemMutation = { __typename?: 'Mutation', rejectItem: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type RemoveMaterialMutationVariables = Exact<{
  identifier: Scalars['String'];
  type: Scalars['String'];
  location_id: Scalars['Int'];
}>;


export type RemoveMaterialMutation = { __typename?: 'Mutation', removeMaterial: { __typename?: 'Material', identifier: string, id_type: string, type: string, location_id: number, title: string, author: string, category: string } };

export type RemoveNotificationMutationVariables = Exact<{
  input: RemoveNotificationInput;
}>;


export type RemoveNotificationMutation = { __typename?: 'Mutation', removeNotification?: { __typename?: 'Notification', id: string } | null };

export type RemovePersonLocationMutationVariables = Exact<{
  location_id: Scalars['Int'];
  person_id: Scalars['Int'];
}>;


export type RemovePersonLocationMutation = { __typename?: 'Mutation', removePersonLocation: { __typename?: 'Person', id: string, smg_id: string } };

export type ReturnBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ReturnBookMutation = { __typename?: 'Mutation', returnItem: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type UpdateMaterialMutationVariables = Exact<{
  identifier: Scalars['String'];
  id_type?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  location_id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  claimDuration: Scalars['Int'];
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Material', identifier: string, id_type: string, type: string, location_id: number, title: string, author: string, category: string, updated_at: any, description: string, claimDuration: number } };

export type UpdatePersonMutationVariables = Exact<{
  personId: Scalars['Int'];
  input: UpdatePersonInput;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson: { __typename?: 'Person', id: string, lastSeenNotificationDate?: any | null } };

export type CreateAnswerNotificationMutationVariables = Exact<{
  input: CreateAnswerNotification;
}>;


export type CreateAnswerNotificationMutation = { __typename?: 'Mutation', createAnswerNotification: { __typename?: 'Notification', id: string, message?: string | null } };

export type GetAllDonatedMaterialsByPersonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAllDonatedMaterialsByPersonQuery = { __typename?: 'Query', getAllDonatedMaterialsByPerson?: Array<{ __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string, claimCount: number, currentStatus?: { __typename?: 'Status', id: string, created_at: any, person_id: number, status: string, returnDate?: any | null } | null } | null> | null };

export type GetAllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocationsQuery = { __typename?: 'Query', getAllLocations: Array<{ __typename?: 'Location', id: string, location: string } | null> };

export type GetAllMaterialsQueryVariables = Exact<{
  input?: InputMaybe<SearchInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDir?: InputMaybe<SortDir>;
}>;


export type GetAllMaterialsQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', author: string, category: string, created_at: any, id: string, id_type: string, identifier: string, description: string, is_donated: boolean, picture?: string | null, title: string, type: string, updated_at: any, claimCount: number, notifications: Array<{ __typename?: 'Notification', material_id?: number | null, person_id: number } | null>, currentStatus?: { __typename?: 'Status', status: string, person_id: number, returnDate?: any | null } | null } | null> };

export type GetAllMaterialsForDonateQueryVariables = Exact<{
  input?: InputMaybe<SearchInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDir?: InputMaybe<SortDir>;
}>;


export type GetAllMaterialsForDonateQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', id: string, title: string, claimCount: number, currentStatus?: { __typename?: 'Status', id: string, status: string, returnDate?: any | null, person: { __typename?: 'Person', id: string, username: string, avatar: string } } | null } | null> };

export type GetAllMaterialsForManagerQueryVariables = Exact<{
  input?: InputMaybe<SearchInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDir?: InputMaybe<SortDir>;
}>;


export type GetAllMaterialsForManagerQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', id: string, title: string, category: string, picture?: string | null, claimCount: number, currentStatus?: { __typename?: 'Status', id: string, created_at: any, status: string, returnDate?: any | null, person: { __typename?: 'Person', id: string, username: string } } | null } | null> };

export type GetAllMessagesQueryVariables = Exact<{
  location_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetAllMessagesQuery = { __typename?: 'Query', getAllMessages?: Array<{ __typename?: 'Message', id: string, created_at: any, title: string, message: string, person_id: number, person: { __typename?: 'Person', id: string, username: string, avatar: string } }> | null };

export type GetAllPersonsQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  locations?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetAllPersonsQuery = { __typename?: 'Query', getAllPersons: Array<{ __typename?: 'Person', id: string, username: string, avatar: string, statuses?: Array<{ __typename?: 'Status', id: string, material_id: number, created_at: any, status: string, returnDate?: any | null } | null> | null }> };

export type GetAllStatusesIsOverdueQueryVariables = Exact<{
  locations?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetAllStatusesIsOverdueQuery = { __typename?: 'Query', getAllStatusesIsOverdue: Array<{ __typename?: 'Status', id: string, created_at: any, returnDate?: any | null, material: { __typename?: 'Material', id: string, title: string }, person: { __typename?: 'Person', id: string, username: string, avatar: string } } | null> };

export type GetAllTakenItemsQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetAllTakenItemsQuery = { __typename?: 'Query', getAllTakenItems: Array<{ __typename?: 'Status', id: string, created_at: any, status: string, returnDate?: any | null, material: { __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string } } | null> };

export type GetMaterialByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMaterialByIdQuery = { __typename?: 'Query', getMaterialById: { __typename?: 'Material', id: string, identifier: string, picture?: string | null, title: string, author: string, category: string, created_at: any, updated_at: any, description: string, type: string, claimCount: number, claimDuration: number, currentStatus?: { __typename?: 'Status', id: string, person_id: number, status: string, created_at: any, returnDate?: any | null } | null, location: { __typename?: 'Location', id: string, location: string } } };

export type GetItemsForClaimHistoryQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetItemsForClaimHistoryQuery = { __typename?: 'Query', getItemsForClaimHistory: Array<{ __typename?: 'Status', id: string, status: string, returnDate?: any | null, created_at: any, material: { __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string } } | null> };

export type GetMaterialByIdentifierQueryVariables = Exact<{
  identifier: Scalars['String'];
  locations?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetMaterialByIdentifierQuery = { __typename?: 'Query', getMaterialByIdentifier: { __typename?: 'Material', id: string, picture?: string | null, author: string, title: string, category: string } };

export type GetMaterialFromMetadataQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetMaterialFromMetadataQuery = { __typename?: 'Query', getMaterialByIdentifierFromMetadata?: { __typename?: 'IMetaOfMaterial', idType?: string | null, value?: string | null, material?: { __typename?: 'IMaterialMeta', title?: string | null, description?: string | null, cover?: string | null, authors?: Array<{ __typename?: 'Author', id?: string | null, name?: string | null } | null> | null, meta?: { __typename?: 'Meta', series?: string | null } | null } | null } | null };

export type GetNotificationsByPersonQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetNotificationsByPersonQuery = { __typename?: 'Query', getNotificationsByPerson: Array<{ __typename?: 'Notification', id: string, message?: string | null, material_id?: number | null, person_id: number, created_at: any, checked: boolean } | null> };

export type GetOnePersonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOnePersonQuery = { __typename?: 'Query', getOnePerson: { __typename?: 'Person', id: string, username: string, email: string, type: string, position: string, avatar: string, statuses?: Array<{ __typename?: 'Status', id: string, material_id: number, status: string, created_at: any, returnDate?: any | null, material: { __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string } } | null> | null, states?: Array<{ __typename?: 'BlockedUsers', state: boolean, id: string, description?: string | null, created_at: any } | null> | null, messages?: Array<{ __typename?: 'Message', id: string, material_id?: number | null, title: string, message: string, created_at: any } | null> | null } };

export type GetReasonOfBlockQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetReasonOfBlockQuery = { __typename?: 'Query', getReasonOfBlock?: { __typename?: 'BlockedUsers', state: boolean, description?: string | null } | null };

export type GetStatusesByMaterialQueryVariables = Exact<{
  material_id: Scalars['ID'];
}>;


export type GetStatusesByMaterialQuery = { __typename?: 'Query', getStatusesByMaterial: Array<{ __typename?: 'Status', id: string, status: string, created_at: any, returnDate?: any | null, person: { __typename?: 'Person', id: string, avatar: string, username: string, statuses?: Array<{ __typename?: 'Status', material_id: number, status: string, created_at: any, returnDate?: any | null } | null> | null } } | null> };

export type SearchOfMaterialsQueryVariables = Exact<{
  input?: InputMaybe<SearchInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDir?: InputMaybe<SortDir>;
}>;


export type SearchOfMaterialsQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', title: string, created_at: any, picture?: string | null, author: string, category: string, id: string, claimCount: number, currentStatus?: { __typename?: 'Status', id: string, created_at: any, status: string, returnDate?: any | null, person: { __typename?: 'Person', id: string, username: string } } | null } | null> };


export const AcceptBookDocument = gql`
    mutation AcceptBook($identifier: String!, $person_id: Int!) {
  acceptItem(input: {identifier: $identifier, person_id: $person_id}) {
    ... on Status {
      created_at
      status
    }
    ... on Error {
      message
    }
  }
}
    `;
export type AcceptBookMutationFn = Apollo.MutationFunction<AcceptBookMutation, AcceptBookMutationVariables>;

/**
 * __useAcceptBookMutation__
 *
 * To run a mutation, you first call `useAcceptBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptBookMutation, { data, loading, error }] = useAcceptBookMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useAcceptBookMutation(baseOptions?: Apollo.MutationHookOptions<AcceptBookMutation, AcceptBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptBookMutation, AcceptBookMutationVariables>(AcceptBookDocument, options);
      }
export type AcceptBookMutationHookResult = ReturnType<typeof useAcceptBookMutation>;
export type AcceptBookMutationResult = Apollo.MutationResult<AcceptBookMutation>;
export type AcceptBookMutationOptions = Apollo.BaseMutationOptions<AcceptBookMutation, AcceptBookMutationVariables>;
export const AddPersonLocationDocument = gql`
    mutation addPersonLocation($location_id: Int!, $person_id: Int!) {
  addPersonLocation(input: {location_id: $location_id, person_id: $person_id}) {
    id
  }
}
    `;
export type AddPersonLocationMutationFn = Apollo.MutationFunction<AddPersonLocationMutation, AddPersonLocationMutationVariables>;

/**
 * __useAddPersonLocationMutation__
 *
 * To run a mutation, you first call `useAddPersonLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonLocationMutation, { data, loading, error }] = useAddPersonLocationMutation({
 *   variables: {
 *      location_id: // value for 'location_id'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useAddPersonLocationMutation(baseOptions?: Apollo.MutationHookOptions<AddPersonLocationMutation, AddPersonLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPersonLocationMutation, AddPersonLocationMutationVariables>(AddPersonLocationDocument, options);
      }
export type AddPersonLocationMutationHookResult = ReturnType<typeof useAddPersonLocationMutation>;
export type AddPersonLocationMutationResult = Apollo.MutationResult<AddPersonLocationMutation>;
export type AddPersonLocationMutationOptions = Apollo.BaseMutationOptions<AddPersonLocationMutation, AddPersonLocationMutationVariables>;
export const ChangePersonRoleDocument = gql`
    mutation ChangePersonRole($person_id: Int!, $type: String!) {
  changePersonRole(person_id: $person_id, type: $type) {
    id
    type
  }
}
    `;
export type ChangePersonRoleMutationFn = Apollo.MutationFunction<ChangePersonRoleMutation, ChangePersonRoleMutationVariables>;

/**
 * __useChangePersonRoleMutation__
 *
 * To run a mutation, you first call `useChangePersonRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePersonRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePersonRoleMutation, { data, loading, error }] = useChangePersonRoleMutation({
 *   variables: {
 *      person_id: // value for 'person_id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useChangePersonRoleMutation(baseOptions?: Apollo.MutationHookOptions<ChangePersonRoleMutation, ChangePersonRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePersonRoleMutation, ChangePersonRoleMutationVariables>(ChangePersonRoleDocument, options);
      }
export type ChangePersonRoleMutationHookResult = ReturnType<typeof useChangePersonRoleMutation>;
export type ChangePersonRoleMutationResult = Apollo.MutationResult<ChangePersonRoleMutation>;
export type ChangePersonRoleMutationOptions = Apollo.BaseMutationOptions<ChangePersonRoleMutation, ChangePersonRoleMutationVariables>;
export const ClaimBookDocument = gql`
    mutation ClaimBook($identifier: String!, $person_id: Int!) {
  claimBook(input: {identifier: $identifier, person_id: $person_id}) {
    ... on Status {
      created_at
      status
      returnDate
    }
    ... on Error {
      message
    }
  }
}
    `;
export type ClaimBookMutationFn = Apollo.MutationFunction<ClaimBookMutation, ClaimBookMutationVariables>;

/**
 * __useClaimBookMutation__
 *
 * To run a mutation, you first call `useClaimBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClaimBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [claimBookMutation, { data, loading, error }] = useClaimBookMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useClaimBookMutation(baseOptions?: Apollo.MutationHookOptions<ClaimBookMutation, ClaimBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClaimBookMutation, ClaimBookMutationVariables>(ClaimBookDocument, options);
      }
export type ClaimBookMutationHookResult = ReturnType<typeof useClaimBookMutation>;
export type ClaimBookMutationResult = Apollo.MutationResult<ClaimBookMutation>;
export type ClaimBookMutationOptions = Apollo.BaseMutationOptions<ClaimBookMutation, ClaimBookMutationVariables>;
export const CreateMessageForManagerDocument = gql`
    mutation CreateMessageForManager($person_id: Int!, $material_id: Int, $title: String!, $message: String!, $location_id: Int!) {
  createMessageForManager(
    input: {person_id: $person_id, material_id: $material_id, title: $title, message: $message, location_id: $location_id}
  ) {
    message
    title
  }
}
    `;
export type CreateMessageForManagerMutationFn = Apollo.MutationFunction<CreateMessageForManagerMutation, CreateMessageForManagerMutationVariables>;

/**
 * __useCreateMessageForManagerMutation__
 *
 * To run a mutation, you first call `useCreateMessageForManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageForManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageForManagerMutation, { data, loading, error }] = useCreateMessageForManagerMutation({
 *   variables: {
 *      person_id: // value for 'person_id'
 *      material_id: // value for 'material_id'
 *      title: // value for 'title'
 *      message: // value for 'message'
 *      location_id: // value for 'location_id'
 *   },
 * });
 */
export function useCreateMessageForManagerMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageForManagerMutation, CreateMessageForManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageForManagerMutation, CreateMessageForManagerMutationVariables>(CreateMessageForManagerDocument, options);
      }
export type CreateMessageForManagerMutationHookResult = ReturnType<typeof useCreateMessageForManagerMutation>;
export type CreateMessageForManagerMutationResult = Apollo.MutationResult<CreateMessageForManagerMutation>;
export type CreateMessageForManagerMutationOptions = Apollo.BaseMutationOptions<CreateMessageForManagerMutation, CreateMessageForManagerMutationVariables>;
export const CreateNotificationDocument = gql`
    mutation CreateNotification($input: CreateNotificationInput!) {
  createNotification(input: $input) {
    id
  }
}
    `;
export type CreateNotificationMutationFn = Apollo.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const CreateSimpleNotificationDocument = gql`
    mutation createSimpleNotification($input: CreateSimpleNotification!) {
  createSimpleNotification(input: $input) {
    id
    message
  }
}
    `;
export type CreateSimpleNotificationMutationFn = Apollo.MutationFunction<CreateSimpleNotificationMutation, CreateSimpleNotificationMutationVariables>;

/**
 * __useCreateSimpleNotificationMutation__
 *
 * To run a mutation, you first call `useCreateSimpleNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSimpleNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSimpleNotificationMutation, { data, loading, error }] = useCreateSimpleNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSimpleNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateSimpleNotificationMutation, CreateSimpleNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSimpleNotificationMutation, CreateSimpleNotificationMutationVariables>(CreateSimpleNotificationDocument, options);
      }
export type CreateSimpleNotificationMutationHookResult = ReturnType<typeof useCreateSimpleNotificationMutation>;
export type CreateSimpleNotificationMutationResult = Apollo.MutationResult<CreateSimpleNotificationMutation>;
export type CreateSimpleNotificationMutationOptions = Apollo.BaseMutationOptions<CreateSimpleNotificationMutation, CreateSimpleNotificationMutationVariables>;
export const CreateStateDocument = gql`
    mutation CreateState($state: Boolean!, $person_id: Int!, $description: String) {
  createState(
    input: {state: $state, person_id: $person_id, description: $description}
  ) {
    state
  }
}
    `;
export type CreateStateMutationFn = Apollo.MutationFunction<CreateStateMutation, CreateStateMutationVariables>;

/**
 * __useCreateStateMutation__
 *
 * To run a mutation, you first call `useCreateStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStateMutation, { data, loading, error }] = useCreateStateMutation({
 *   variables: {
 *      state: // value for 'state'
 *      person_id: // value for 'person_id'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateStateMutation(baseOptions?: Apollo.MutationHookOptions<CreateStateMutation, CreateStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStateMutation, CreateStateMutationVariables>(CreateStateDocument, options);
      }
export type CreateStateMutationHookResult = ReturnType<typeof useCreateStateMutation>;
export type CreateStateMutationResult = Apollo.MutationResult<CreateStateMutation>;
export type CreateStateMutationOptions = Apollo.BaseMutationOptions<CreateStateMutation, CreateStateMutationVariables>;
export const DonateBookDocument = gql`
    mutation DonateBook($person_id: Int!, $location_id: Int!, $identifier: String!, $id_type: String!, $type: String!, $title: String!, $author: String!, $category: String!, $description: String, $picture: String, $role: String!, $is_donated: Boolean!) {
  donateBook(
    input: {person_id: $person_id, location_id: $location_id, identifier: $identifier, type: $type, author: $author, category: $category, description: $description, id_type: $id_type, picture: $picture, title: $title, role: $role, is_donated: $is_donated}
  ) {
    title
    picture
    identifier
  }
}
    `;
export type DonateBookMutationFn = Apollo.MutationFunction<DonateBookMutation, DonateBookMutationVariables>;

/**
 * __useDonateBookMutation__
 *
 * To run a mutation, you first call `useDonateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDonateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [donateBookMutation, { data, loading, error }] = useDonateBookMutation({
 *   variables: {
 *      person_id: // value for 'person_id'
 *      location_id: // value for 'location_id'
 *      identifier: // value for 'identifier'
 *      id_type: // value for 'id_type'
 *      type: // value for 'type'
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      category: // value for 'category'
 *      description: // value for 'description'
 *      picture: // value for 'picture'
 *      role: // value for 'role'
 *      is_donated: // value for 'is_donated'
 *   },
 * });
 */
export function useDonateBookMutation(baseOptions?: Apollo.MutationHookOptions<DonateBookMutation, DonateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DonateBookMutation, DonateBookMutationVariables>(DonateBookDocument, options);
      }
export type DonateBookMutationHookResult = ReturnType<typeof useDonateBookMutation>;
export type DonateBookMutationResult = Apollo.MutationResult<DonateBookMutation>;
export type DonateBookMutationOptions = Apollo.BaseMutationOptions<DonateBookMutation, DonateBookMutationVariables>;
export const ProlongTimeDocument = gql`
    mutation ProlongTime($person_id: Int!, $material_id: Int!) {
  prolongClaimPeriod(input: {material_id: $material_id, person_id: $person_id}) {
    ... on Status {
      created_at
      status
      returnDate
    }
    ... on Error {
      message
    }
  }
}
    `;
export type ProlongTimeMutationFn = Apollo.MutationFunction<ProlongTimeMutation, ProlongTimeMutationVariables>;

/**
 * __useProlongTimeMutation__
 *
 * To run a mutation, you first call `useProlongTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProlongTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [prolongTimeMutation, { data, loading, error }] = useProlongTimeMutation({
 *   variables: {
 *      person_id: // value for 'person_id'
 *      material_id: // value for 'material_id'
 *   },
 * });
 */
export function useProlongTimeMutation(baseOptions?: Apollo.MutationHookOptions<ProlongTimeMutation, ProlongTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProlongTimeMutation, ProlongTimeMutationVariables>(ProlongTimeDocument, options);
      }
export type ProlongTimeMutationHookResult = ReturnType<typeof useProlongTimeMutation>;
export type ProlongTimeMutationResult = Apollo.MutationResult<ProlongTimeMutation>;
export type ProlongTimeMutationOptions = Apollo.BaseMutationOptions<ProlongTimeMutation, ProlongTimeMutationVariables>;
export const RejectItemDocument = gql`
    mutation RejectItem($identifier: String!, $person_id: Int!) {
  rejectItem(input: {identifier: $identifier, person_id: $person_id}) {
    ... on Status {
      created_at
      status
    }
    ... on Error {
      message
    }
  }
}
    `;
export type RejectItemMutationFn = Apollo.MutationFunction<RejectItemMutation, RejectItemMutationVariables>;

/**
 * __useRejectItemMutation__
 *
 * To run a mutation, you first call `useRejectItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectItemMutation, { data, loading, error }] = useRejectItemMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useRejectItemMutation(baseOptions?: Apollo.MutationHookOptions<RejectItemMutation, RejectItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectItemMutation, RejectItemMutationVariables>(RejectItemDocument, options);
      }
export type RejectItemMutationHookResult = ReturnType<typeof useRejectItemMutation>;
export type RejectItemMutationResult = Apollo.MutationResult<RejectItemMutation>;
export type RejectItemMutationOptions = Apollo.BaseMutationOptions<RejectItemMutation, RejectItemMutationVariables>;
export const RemoveMaterialDocument = gql`
    mutation RemoveMaterial($identifier: String!, $type: String!, $location_id: Int!) {
  removeMaterial(
    input: {identifier: $identifier, type: $type, location_id: $location_id}
  ) {
    identifier
    id_type
    type
    location_id
    title
    author
    category
  }
}
    `;
export type RemoveMaterialMutationFn = Apollo.MutationFunction<RemoveMaterialMutation, RemoveMaterialMutationVariables>;

/**
 * __useRemoveMaterialMutation__
 *
 * To run a mutation, you first call `useRemoveMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMaterialMutation, { data, loading, error }] = useRemoveMaterialMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      type: // value for 'type'
 *      location_id: // value for 'location_id'
 *   },
 * });
 */
export function useRemoveMaterialMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMaterialMutation, RemoveMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMaterialMutation, RemoveMaterialMutationVariables>(RemoveMaterialDocument, options);
      }
export type RemoveMaterialMutationHookResult = ReturnType<typeof useRemoveMaterialMutation>;
export type RemoveMaterialMutationResult = Apollo.MutationResult<RemoveMaterialMutation>;
export type RemoveMaterialMutationOptions = Apollo.BaseMutationOptions<RemoveMaterialMutation, RemoveMaterialMutationVariables>;
export const RemoveNotificationDocument = gql`
    mutation RemoveNotification($input: RemoveNotificationInput!) {
  removeNotification(input: $input) {
    id
  }
}
    `;
export type RemoveNotificationMutationFn = Apollo.MutationFunction<RemoveNotificationMutation, RemoveNotificationMutationVariables>;

/**
 * __useRemoveNotificationMutation__
 *
 * To run a mutation, you first call `useRemoveNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNotificationMutation, { data, loading, error }] = useRemoveNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveNotificationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveNotificationMutation, RemoveNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveNotificationMutation, RemoveNotificationMutationVariables>(RemoveNotificationDocument, options);
      }
export type RemoveNotificationMutationHookResult = ReturnType<typeof useRemoveNotificationMutation>;
export type RemoveNotificationMutationResult = Apollo.MutationResult<RemoveNotificationMutation>;
export type RemoveNotificationMutationOptions = Apollo.BaseMutationOptions<RemoveNotificationMutation, RemoveNotificationMutationVariables>;
export const RemovePersonLocationDocument = gql`
    mutation removePersonLocation($location_id: Int!, $person_id: Int!) {
  removePersonLocation(input: {location_id: $location_id, person_id: $person_id}) {
    id
    smg_id
  }
}
    `;
export type RemovePersonLocationMutationFn = Apollo.MutationFunction<RemovePersonLocationMutation, RemovePersonLocationMutationVariables>;

/**
 * __useRemovePersonLocationMutation__
 *
 * To run a mutation, you first call `useRemovePersonLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonLocationMutation, { data, loading, error }] = useRemovePersonLocationMutation({
 *   variables: {
 *      location_id: // value for 'location_id'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useRemovePersonLocationMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonLocationMutation, RemovePersonLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonLocationMutation, RemovePersonLocationMutationVariables>(RemovePersonLocationDocument, options);
      }
export type RemovePersonLocationMutationHookResult = ReturnType<typeof useRemovePersonLocationMutation>;
export type RemovePersonLocationMutationResult = Apollo.MutationResult<RemovePersonLocationMutation>;
export type RemovePersonLocationMutationOptions = Apollo.BaseMutationOptions<RemovePersonLocationMutation, RemovePersonLocationMutationVariables>;
export const ReturnBookDocument = gql`
    mutation ReturnBook($identifier: String!, $person_id: Int!) {
  returnItem(input: {identifier: $identifier, person_id: $person_id}) {
    ... on Status {
      created_at
      status
    }
    ... on Error {
      message
    }
  }
}
    `;
export type ReturnBookMutationFn = Apollo.MutationFunction<ReturnBookMutation, ReturnBookMutationVariables>;

/**
 * __useReturnBookMutation__
 *
 * To run a mutation, you first call `useReturnBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnBookMutation, { data, loading, error }] = useReturnBookMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useReturnBookMutation(baseOptions?: Apollo.MutationHookOptions<ReturnBookMutation, ReturnBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReturnBookMutation, ReturnBookMutationVariables>(ReturnBookDocument, options);
      }
export type ReturnBookMutationHookResult = ReturnType<typeof useReturnBookMutation>;
export type ReturnBookMutationResult = Apollo.MutationResult<ReturnBookMutation>;
export type ReturnBookMutationOptions = Apollo.BaseMutationOptions<ReturnBookMutation, ReturnBookMutationVariables>;
export const UpdateMaterialDocument = gql`
    mutation UpdateMaterial($identifier: String!, $id_type: String, $type: String, $location_id: Int, $title: String, $author: String, $category: String, $updated_at: DateTime!, $description: String, $claimDuration: Int!) {
  updateMaterial(
    input: {identifier: $identifier, id_type: $id_type, type: $type, location_id: $location_id, title: $title, author: $author, category: $category, updated_at: $updated_at, description: $description, claimDuration: $claimDuration}
  ) {
    identifier
    id_type
    type
    location_id
    title
    author
    category
    updated_at
    description
    claimDuration
  }
}
    `;
export type UpdateMaterialMutationFn = Apollo.MutationFunction<UpdateMaterialMutation, UpdateMaterialMutationVariables>;

/**
 * __useUpdateMaterialMutation__
 *
 * To run a mutation, you first call `useUpdateMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMaterialMutation, { data, loading, error }] = useUpdateMaterialMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      id_type: // value for 'id_type'
 *      type: // value for 'type'
 *      location_id: // value for 'location_id'
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      category: // value for 'category'
 *      updated_at: // value for 'updated_at'
 *      description: // value for 'description'
 *      claimDuration: // value for 'claimDuration'
 *   },
 * });
 */
export function useUpdateMaterialMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>(UpdateMaterialDocument, options);
      }
export type UpdateMaterialMutationHookResult = ReturnType<typeof useUpdateMaterialMutation>;
export type UpdateMaterialMutationResult = Apollo.MutationResult<UpdateMaterialMutation>;
export type UpdateMaterialMutationOptions = Apollo.BaseMutationOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>;
export const UpdatePersonDocument = gql`
    mutation UpdatePerson($personId: Int!, $input: UpdatePersonInput!) {
  updatePerson(personId: $personId, input: $input) {
    id
    lastSeenNotificationDate
  }
}
    `;
export type UpdatePersonMutationFn = Apollo.MutationFunction<UpdatePersonMutation, UpdatePersonMutationVariables>;

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonMutation, UpdatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonMutation, UpdatePersonMutationVariables>(UpdatePersonDocument, options);
      }
export type UpdatePersonMutationHookResult = ReturnType<typeof useUpdatePersonMutation>;
export type UpdatePersonMutationResult = Apollo.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = Apollo.BaseMutationOptions<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const CreateAnswerNotificationDocument = gql`
    mutation createAnswerNotification($input: CreateAnswerNotification!) {
  createAnswerNotification(input: $input) {
    id
    message
  }
}
    `;
export type CreateAnswerNotificationMutationFn = Apollo.MutationFunction<CreateAnswerNotificationMutation, CreateAnswerNotificationMutationVariables>;

/**
 * __useCreateAnswerNotificationMutation__
 *
 * To run a mutation, you first call `useCreateAnswerNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnswerNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnswerNotificationMutation, { data, loading, error }] = useCreateAnswerNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAnswerNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnswerNotificationMutation, CreateAnswerNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnswerNotificationMutation, CreateAnswerNotificationMutationVariables>(CreateAnswerNotificationDocument, options);
      }
export type CreateAnswerNotificationMutationHookResult = ReturnType<typeof useCreateAnswerNotificationMutation>;
export type CreateAnswerNotificationMutationResult = Apollo.MutationResult<CreateAnswerNotificationMutation>;
export type CreateAnswerNotificationMutationOptions = Apollo.BaseMutationOptions<CreateAnswerNotificationMutation, CreateAnswerNotificationMutationVariables>;
export const GetAllDonatedMaterialsByPersonDocument = gql`
    query GetAllDonatedMaterialsByPerson($id: ID!) {
  getAllDonatedMaterialsByPerson(id: $id) {
    id
    picture
    title
    author
    category
    currentStatus {
      id
      created_at
      person_id
      status
      returnDate
    }
    claimCount
  }
}
    `;

/**
 * __useGetAllDonatedMaterialsByPersonQuery__
 *
 * To run a query within a React component, call `useGetAllDonatedMaterialsByPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDonatedMaterialsByPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDonatedMaterialsByPersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAllDonatedMaterialsByPersonQuery(baseOptions: Apollo.QueryHookOptions<GetAllDonatedMaterialsByPersonQuery, GetAllDonatedMaterialsByPersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDonatedMaterialsByPersonQuery, GetAllDonatedMaterialsByPersonQueryVariables>(GetAllDonatedMaterialsByPersonDocument, options);
      }
export function useGetAllDonatedMaterialsByPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDonatedMaterialsByPersonQuery, GetAllDonatedMaterialsByPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDonatedMaterialsByPersonQuery, GetAllDonatedMaterialsByPersonQueryVariables>(GetAllDonatedMaterialsByPersonDocument, options);
        }
export type GetAllDonatedMaterialsByPersonQueryHookResult = ReturnType<typeof useGetAllDonatedMaterialsByPersonQuery>;
export type GetAllDonatedMaterialsByPersonLazyQueryHookResult = ReturnType<typeof useGetAllDonatedMaterialsByPersonLazyQuery>;
export type GetAllDonatedMaterialsByPersonQueryResult = Apollo.QueryResult<GetAllDonatedMaterialsByPersonQuery, GetAllDonatedMaterialsByPersonQueryVariables>;
export const GetAllLocationsDocument = gql`
    query GetAllLocations {
  getAllLocations {
    id
    location
  }
}
    `;

/**
 * __useGetAllLocationsQuery__
 *
 * To run a query within a React component, call `useGetAllLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
      }
export function useGetAllLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
        }
export type GetAllLocationsQueryHookResult = ReturnType<typeof useGetAllLocationsQuery>;
export type GetAllLocationsLazyQueryHookResult = ReturnType<typeof useGetAllLocationsLazyQuery>;
export type GetAllLocationsQueryResult = Apollo.QueryResult<GetAllLocationsQuery, GetAllLocationsQueryVariables>;
export const GetAllMaterialsDocument = gql`
    query GetAllMaterials($input: SearchInput, $limit: Int, $offset: Int, $sortBy: String, $sortDir: SortDir) {
  getAllMaterials(
    input: $input
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDir: $sortDir
  ) {
    author
    category
    created_at
    id
    id_type
    identifier
    description
    is_donated
    notifications {
      material_id
      person_id
    }
    picture
    currentStatus {
      status
      person_id
      returnDate
    }
    title
    type
    updated_at
    claimCount
  }
}
    `;

/**
 * __useGetAllMaterialsQuery__
 *
 * To run a query within a React component, call `useGetAllMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMaterialsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *   },
 * });
 */
export function useGetAllMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>(GetAllMaterialsDocument, options);
      }
export function useGetAllMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>(GetAllMaterialsDocument, options);
        }
export type GetAllMaterialsQueryHookResult = ReturnType<typeof useGetAllMaterialsQuery>;
export type GetAllMaterialsLazyQueryHookResult = ReturnType<typeof useGetAllMaterialsLazyQuery>;
export type GetAllMaterialsQueryResult = Apollo.QueryResult<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>;
export const GetAllMaterialsForDonateDocument = gql`
    query GetAllMaterialsForDonate($input: SearchInput, $limit: Int, $offset: Int, $sortBy: String, $sortDir: SortDir) {
  getAllMaterials(
    input: $input
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDir: $sortDir
  ) {
    id
    title
    currentStatus {
      id
      status
      returnDate
      person {
        id
        username
        avatar
      }
    }
    claimCount
  }
}
    `;

/**
 * __useGetAllMaterialsForDonateQuery__
 *
 * To run a query within a React component, call `useGetAllMaterialsForDonateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMaterialsForDonateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMaterialsForDonateQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *   },
 * });
 */
export function useGetAllMaterialsForDonateQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMaterialsForDonateQuery, GetAllMaterialsForDonateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMaterialsForDonateQuery, GetAllMaterialsForDonateQueryVariables>(GetAllMaterialsForDonateDocument, options);
      }
export function useGetAllMaterialsForDonateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMaterialsForDonateQuery, GetAllMaterialsForDonateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMaterialsForDonateQuery, GetAllMaterialsForDonateQueryVariables>(GetAllMaterialsForDonateDocument, options);
        }
export type GetAllMaterialsForDonateQueryHookResult = ReturnType<typeof useGetAllMaterialsForDonateQuery>;
export type GetAllMaterialsForDonateLazyQueryHookResult = ReturnType<typeof useGetAllMaterialsForDonateLazyQuery>;
export type GetAllMaterialsForDonateQueryResult = Apollo.QueryResult<GetAllMaterialsForDonateQuery, GetAllMaterialsForDonateQueryVariables>;
export const GetAllMaterialsForManagerDocument = gql`
    query GetAllMaterialsForManager($input: SearchInput, $limit: Int, $offset: Int, $sortBy: String, $sortDir: SortDir) {
  getAllMaterials(
    input: $input
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDir: $sortDir
  ) {
    id
    title
    category
    picture
    currentStatus {
      id
      created_at
      status
      returnDate
      person {
        id
        username
      }
    }
    claimCount
  }
}
    `;

/**
 * __useGetAllMaterialsForManagerQuery__
 *
 * To run a query within a React component, call `useGetAllMaterialsForManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMaterialsForManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMaterialsForManagerQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *   },
 * });
 */
export function useGetAllMaterialsForManagerQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMaterialsForManagerQuery, GetAllMaterialsForManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMaterialsForManagerQuery, GetAllMaterialsForManagerQueryVariables>(GetAllMaterialsForManagerDocument, options);
      }
export function useGetAllMaterialsForManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMaterialsForManagerQuery, GetAllMaterialsForManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMaterialsForManagerQuery, GetAllMaterialsForManagerQueryVariables>(GetAllMaterialsForManagerDocument, options);
        }
export type GetAllMaterialsForManagerQueryHookResult = ReturnType<typeof useGetAllMaterialsForManagerQuery>;
export type GetAllMaterialsForManagerLazyQueryHookResult = ReturnType<typeof useGetAllMaterialsForManagerLazyQuery>;
export type GetAllMaterialsForManagerQueryResult = Apollo.QueryResult<GetAllMaterialsForManagerQuery, GetAllMaterialsForManagerQueryVariables>;
export const GetAllMessagesDocument = gql`
    query GetAllMessages($location_id: [Int!]) {
  getAllMessages(location_id: $location_id) {
    id
    created_at
    title
    message
    person_id
    person {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useGetAllMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMessagesQuery({
 *   variables: {
 *      location_id: // value for 'location_id'
 *   },
 * });
 */
export function useGetAllMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
      }
export function useGetAllMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
        }
export type GetAllMessagesQueryHookResult = ReturnType<typeof useGetAllMessagesQuery>;
export type GetAllMessagesLazyQueryHookResult = ReturnType<typeof useGetAllMessagesLazyQuery>;
export type GetAllMessagesQueryResult = Apollo.QueryResult<GetAllMessagesQuery, GetAllMessagesQueryVariables>;
export const GetAllPersonsDocument = gql`
    query GetAllPersons($username: String, $locations: [Int!]) {
  getAllPersons(username: $username, locations: $locations) {
    id
    username
    avatar
    statuses {
      id
      material_id
      created_at
      status
      returnDate
    }
  }
}
    `;

/**
 * __useGetAllPersonsQuery__
 *
 * To run a query within a React component, call `useGetAllPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPersonsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      locations: // value for 'locations'
 *   },
 * });
 */
export function useGetAllPersonsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, options);
      }
export function useGetAllPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPersonsQuery, GetAllPersonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, options);
        }
export type GetAllPersonsQueryHookResult = ReturnType<typeof useGetAllPersonsQuery>;
export type GetAllPersonsLazyQueryHookResult = ReturnType<typeof useGetAllPersonsLazyQuery>;
export type GetAllPersonsQueryResult = Apollo.QueryResult<GetAllPersonsQuery, GetAllPersonsQueryVariables>;
export const GetAllStatusesIsOverdueDocument = gql`
    query GetAllStatusesIsOverdue($locations: [Int!]) {
  getAllStatusesIsOverdue(locations: $locations) {
    id
    created_at
    returnDate
    material {
      id
      title
    }
    person {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useGetAllStatusesIsOverdueQuery__
 *
 * To run a query within a React component, call `useGetAllStatusesIsOverdueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStatusesIsOverdueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStatusesIsOverdueQuery({
 *   variables: {
 *      locations: // value for 'locations'
 *   },
 * });
 */
export function useGetAllStatusesIsOverdueQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStatusesIsOverdueQuery, GetAllStatusesIsOverdueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStatusesIsOverdueQuery, GetAllStatusesIsOverdueQueryVariables>(GetAllStatusesIsOverdueDocument, options);
      }
export function useGetAllStatusesIsOverdueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStatusesIsOverdueQuery, GetAllStatusesIsOverdueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStatusesIsOverdueQuery, GetAllStatusesIsOverdueQueryVariables>(GetAllStatusesIsOverdueDocument, options);
        }
export type GetAllStatusesIsOverdueQueryHookResult = ReturnType<typeof useGetAllStatusesIsOverdueQuery>;
export type GetAllStatusesIsOverdueLazyQueryHookResult = ReturnType<typeof useGetAllStatusesIsOverdueLazyQuery>;
export type GetAllStatusesIsOverdueQueryResult = Apollo.QueryResult<GetAllStatusesIsOverdueQuery, GetAllStatusesIsOverdueQueryVariables>;
export const GetAllTakenItemsDocument = gql`
    query GetAllTakenItems($person_id: Int!) {
  getAllTakenItems(person_id: $person_id) {
    id
    created_at
    status
    returnDate
    material {
      id
      picture
      title
      author
      category
    }
  }
}
    `;

/**
 * __useGetAllTakenItemsQuery__
 *
 * To run a query within a React component, call `useGetAllTakenItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTakenItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTakenItemsQuery({
 *   variables: {
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useGetAllTakenItemsQuery(baseOptions: Apollo.QueryHookOptions<GetAllTakenItemsQuery, GetAllTakenItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTakenItemsQuery, GetAllTakenItemsQueryVariables>(GetAllTakenItemsDocument, options);
      }
export function useGetAllTakenItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTakenItemsQuery, GetAllTakenItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTakenItemsQuery, GetAllTakenItemsQueryVariables>(GetAllTakenItemsDocument, options);
        }
export type GetAllTakenItemsQueryHookResult = ReturnType<typeof useGetAllTakenItemsQuery>;
export type GetAllTakenItemsLazyQueryHookResult = ReturnType<typeof useGetAllTakenItemsLazyQuery>;
export type GetAllTakenItemsQueryResult = Apollo.QueryResult<GetAllTakenItemsQuery, GetAllTakenItemsQueryVariables>;
export const GetMaterialByIdDocument = gql`
    query GetMaterialById($id: ID!) {
  getMaterialById(id: $id) {
    id
    identifier
    picture
    title
    author
    category
    created_at
    updated_at
    description
    type
    currentStatus {
      id
      person_id
      status
      created_at
      returnDate
    }
    location {
      id
      location
    }
    claimCount
    claimDuration
  }
}
    `;

/**
 * __useGetMaterialByIdQuery__
 *
 * To run a query within a React component, call `useGetMaterialByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMaterialByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>(GetMaterialByIdDocument, options);
      }
export function useGetMaterialByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>(GetMaterialByIdDocument, options);
        }
export type GetMaterialByIdQueryHookResult = ReturnType<typeof useGetMaterialByIdQuery>;
export type GetMaterialByIdLazyQueryHookResult = ReturnType<typeof useGetMaterialByIdLazyQuery>;
export type GetMaterialByIdQueryResult = Apollo.QueryResult<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>;
export const GetItemsForClaimHistoryDocument = gql`
    query GetItemsForClaimHistory($person_id: Int!) {
  getItemsForClaimHistory(person_id: $person_id) {
    id
    status
    returnDate
    created_at
    material {
      id
      picture
      title
      author
      category
    }
  }
}
    `;

/**
 * __useGetItemsForClaimHistoryQuery__
 *
 * To run a query within a React component, call `useGetItemsForClaimHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsForClaimHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsForClaimHistoryQuery({
 *   variables: {
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useGetItemsForClaimHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetItemsForClaimHistoryQuery, GetItemsForClaimHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsForClaimHistoryQuery, GetItemsForClaimHistoryQueryVariables>(GetItemsForClaimHistoryDocument, options);
      }
export function useGetItemsForClaimHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsForClaimHistoryQuery, GetItemsForClaimHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsForClaimHistoryQuery, GetItemsForClaimHistoryQueryVariables>(GetItemsForClaimHistoryDocument, options);
        }
export type GetItemsForClaimHistoryQueryHookResult = ReturnType<typeof useGetItemsForClaimHistoryQuery>;
export type GetItemsForClaimHistoryLazyQueryHookResult = ReturnType<typeof useGetItemsForClaimHistoryLazyQuery>;
export type GetItemsForClaimHistoryQueryResult = Apollo.QueryResult<GetItemsForClaimHistoryQuery, GetItemsForClaimHistoryQueryVariables>;
export const GetMaterialByIdentifierDocument = gql`
    query GetMaterialByIdentifier($identifier: String!, $locations: [Int!]) {
  getMaterialByIdentifier(input: {identifier: $identifier, locations: $locations}) {
    id
    picture
    author
    title
    category
  }
}
    `;

/**
 * __useGetMaterialByIdentifierQuery__
 *
 * To run a query within a React component, call `useGetMaterialByIdentifierQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialByIdentifierQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialByIdentifierQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      locations: // value for 'locations'
 *   },
 * });
 */
export function useGetMaterialByIdentifierQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialByIdentifierQuery, GetMaterialByIdentifierQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialByIdentifierQuery, GetMaterialByIdentifierQueryVariables>(GetMaterialByIdentifierDocument, options);
      }
export function useGetMaterialByIdentifierLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialByIdentifierQuery, GetMaterialByIdentifierQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialByIdentifierQuery, GetMaterialByIdentifierQueryVariables>(GetMaterialByIdentifierDocument, options);
        }
export type GetMaterialByIdentifierQueryHookResult = ReturnType<typeof useGetMaterialByIdentifierQuery>;
export type GetMaterialByIdentifierLazyQueryHookResult = ReturnType<typeof useGetMaterialByIdentifierLazyQuery>;
export type GetMaterialByIdentifierQueryResult = Apollo.QueryResult<GetMaterialByIdentifierQuery, GetMaterialByIdentifierQueryVariables>;
export const GetMaterialFromMetadataDocument = gql`
    query GetMaterialFromMetadata($identifier: String!) {
  getMaterialByIdentifierFromMetadata(identifier: $identifier) {
    idType
    value
    material {
      title
      description
      cover
      authors {
        id
        name
      }
      meta {
        series
      }
    }
  }
}
    `;

/**
 * __useGetMaterialFromMetadataQuery__
 *
 * To run a query within a React component, call `useGetMaterialFromMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialFromMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialFromMetadataQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useGetMaterialFromMetadataQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialFromMetadataQuery, GetMaterialFromMetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialFromMetadataQuery, GetMaterialFromMetadataQueryVariables>(GetMaterialFromMetadataDocument, options);
      }
export function useGetMaterialFromMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialFromMetadataQuery, GetMaterialFromMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialFromMetadataQuery, GetMaterialFromMetadataQueryVariables>(GetMaterialFromMetadataDocument, options);
        }
export type GetMaterialFromMetadataQueryHookResult = ReturnType<typeof useGetMaterialFromMetadataQuery>;
export type GetMaterialFromMetadataLazyQueryHookResult = ReturnType<typeof useGetMaterialFromMetadataLazyQuery>;
export type GetMaterialFromMetadataQueryResult = Apollo.QueryResult<GetMaterialFromMetadataQuery, GetMaterialFromMetadataQueryVariables>;
export const GetNotificationsByPersonDocument = gql`
    query GetNotificationsByPerson($person_id: Int!) {
  getNotificationsByPerson(person_id: $person_id) {
    id
    message
    material_id
    person_id
    created_at
    checked
  }
}
    `;

/**
 * __useGetNotificationsByPersonQuery__
 *
 * To run a query within a React component, call `useGetNotificationsByPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsByPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsByPersonQuery({
 *   variables: {
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useGetNotificationsByPersonQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsByPersonQuery, GetNotificationsByPersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsByPersonQuery, GetNotificationsByPersonQueryVariables>(GetNotificationsByPersonDocument, options);
      }
export function useGetNotificationsByPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsByPersonQuery, GetNotificationsByPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsByPersonQuery, GetNotificationsByPersonQueryVariables>(GetNotificationsByPersonDocument, options);
        }
export type GetNotificationsByPersonQueryHookResult = ReturnType<typeof useGetNotificationsByPersonQuery>;
export type GetNotificationsByPersonLazyQueryHookResult = ReturnType<typeof useGetNotificationsByPersonLazyQuery>;
export type GetNotificationsByPersonQueryResult = Apollo.QueryResult<GetNotificationsByPersonQuery, GetNotificationsByPersonQueryVariables>;
export const GetOnePersonDocument = gql`
    query GetOnePerson($id: ID!) {
  getOnePerson(id: $id) {
    id
    username
    email
    type
    position
    avatar
    statuses {
      id
      material_id
      status
      created_at
      returnDate
      material {
        id
        picture
        title
        author
        category
      }
    }
    states {
      state
      id
      description
      created_at
    }
    messages {
      id
      material_id
      title
      message
      created_at
    }
  }
}
    `;

/**
 * __useGetOnePersonQuery__
 *
 * To run a query within a React component, call `useGetOnePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnePersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnePersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOnePersonQuery(baseOptions: Apollo.QueryHookOptions<GetOnePersonQuery, GetOnePersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnePersonQuery, GetOnePersonQueryVariables>(GetOnePersonDocument, options);
      }
export function useGetOnePersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnePersonQuery, GetOnePersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnePersonQuery, GetOnePersonQueryVariables>(GetOnePersonDocument, options);
        }
export type GetOnePersonQueryHookResult = ReturnType<typeof useGetOnePersonQuery>;
export type GetOnePersonLazyQueryHookResult = ReturnType<typeof useGetOnePersonLazyQuery>;
export type GetOnePersonQueryResult = Apollo.QueryResult<GetOnePersonQuery, GetOnePersonQueryVariables>;
export const GetReasonOfBlockDocument = gql`
    query GetReasonOfBlock($id: ID!) {
  getReasonOfBlock(person_id: $id) {
    state
    description
  }
}
    `;

/**
 * __useGetReasonOfBlockQuery__
 *
 * To run a query within a React component, call `useGetReasonOfBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReasonOfBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReasonOfBlockQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetReasonOfBlockQuery(baseOptions: Apollo.QueryHookOptions<GetReasonOfBlockQuery, GetReasonOfBlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReasonOfBlockQuery, GetReasonOfBlockQueryVariables>(GetReasonOfBlockDocument, options);
      }
export function useGetReasonOfBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReasonOfBlockQuery, GetReasonOfBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReasonOfBlockQuery, GetReasonOfBlockQueryVariables>(GetReasonOfBlockDocument, options);
        }
export type GetReasonOfBlockQueryHookResult = ReturnType<typeof useGetReasonOfBlockQuery>;
export type GetReasonOfBlockLazyQueryHookResult = ReturnType<typeof useGetReasonOfBlockLazyQuery>;
export type GetReasonOfBlockQueryResult = Apollo.QueryResult<GetReasonOfBlockQuery, GetReasonOfBlockQueryVariables>;
export const GetStatusesByMaterialDocument = gql`
    query GetStatusesByMaterial($material_id: ID!) {
  getStatusesByMaterial(material_id: $material_id) {
    id
    status
    created_at
    returnDate
    person {
      id
      avatar
      username
      statuses {
        material_id
        status
        created_at
        returnDate
      }
    }
  }
}
    `;

/**
 * __useGetStatusesByMaterialQuery__
 *
 * To run a query within a React component, call `useGetStatusesByMaterialQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatusesByMaterialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatusesByMaterialQuery({
 *   variables: {
 *      material_id: // value for 'material_id'
 *   },
 * });
 */
export function useGetStatusesByMaterialQuery(baseOptions: Apollo.QueryHookOptions<GetStatusesByMaterialQuery, GetStatusesByMaterialQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatusesByMaterialQuery, GetStatusesByMaterialQueryVariables>(GetStatusesByMaterialDocument, options);
      }
export function useGetStatusesByMaterialLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatusesByMaterialQuery, GetStatusesByMaterialQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatusesByMaterialQuery, GetStatusesByMaterialQueryVariables>(GetStatusesByMaterialDocument, options);
        }
export type GetStatusesByMaterialQueryHookResult = ReturnType<typeof useGetStatusesByMaterialQuery>;
export type GetStatusesByMaterialLazyQueryHookResult = ReturnType<typeof useGetStatusesByMaterialLazyQuery>;
export type GetStatusesByMaterialQueryResult = Apollo.QueryResult<GetStatusesByMaterialQuery, GetStatusesByMaterialQueryVariables>;
export const SearchOfMaterialsDocument = gql`
    query SearchOfMaterials($input: SearchInput, $limit: Int, $offset: Int, $sortBy: String, $sortDir: SortDir) {
  getAllMaterials(
    input: $input
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDir: $sortDir
  ) {
    title
    created_at
    picture
    author
    category
    id
    claimCount
    currentStatus {
      id
      created_at
      status
      returnDate
      person {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useSearchOfMaterialsQuery__
 *
 * To run a query within a React component, call `useSearchOfMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOfMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOfMaterialsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortBy: // value for 'sortBy'
 *      sortDir: // value for 'sortDir'
 *   },
 * });
 */
export function useSearchOfMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<SearchOfMaterialsQuery, SearchOfMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchOfMaterialsQuery, SearchOfMaterialsQueryVariables>(SearchOfMaterialsDocument, options);
      }
export function useSearchOfMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOfMaterialsQuery, SearchOfMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchOfMaterialsQuery, SearchOfMaterialsQueryVariables>(SearchOfMaterialsDocument, options);
        }
export type SearchOfMaterialsQueryHookResult = ReturnType<typeof useSearchOfMaterialsQuery>;
export type SearchOfMaterialsLazyQueryHookResult = ReturnType<typeof useSearchOfMaterialsLazyQuery>;
export type SearchOfMaterialsQueryResult = Apollo.QueryResult<SearchOfMaterialsQuery, SearchOfMaterialsQueryVariables>;