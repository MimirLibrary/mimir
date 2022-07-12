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

export type BookInput = {
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
};

export type BookUnionResult = Error | Status;

export type CreateLocationInput = {
  location: Scalars['String'];
};

export type CreateMaterialInput = {
  author: Scalars['String'];
  category: Scalars['String'];
  id_type: Scalars['String'];
  identifier: Scalars['String'];
  location_id: Scalars['Int'];
  picture?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type CreateMessageInput = {
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

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  location: Scalars['String'];
  materials?: Maybe<Array<Maybe<Material>>>;
  persons?: Maybe<Array<Maybe<Person>>>;
};

export type Material = {
  __typename?: 'Material';
  author: Scalars['String'];
  category: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  id_type: Scalars['String'];
  identifier: Scalars['String'];
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
  material: Material;
  material_id: Scalars['Int'];
  message: Scalars['String'];
  person: Person;
  person_id: Scalars['Int'];
  title: Scalars['String'];
};

export type MessageUnionResult = Error | Message;

export type Mutation = {
  __typename?: 'Mutation';
  claimBook: BookUnionResult;
  createLocation?: Maybe<Location>;
  createMaterial: Material;
  createMessageForManager: MessageUnionResult;
  createNotification?: Maybe<Notification>;
  createPerson: Person;
  createStatus: Status;
  donateBook: Material;
  prolongClaimPeriod: BookUnionResult;
  removeLocation?: Maybe<Location>;
  removeMaterial: Material;
  removeNotification?: Maybe<Notification>;
  returnItem: BookUnionResult;
  updateMaterial: Material;
  updatePersonLocation: Person;
};


export type MutationClaimBookArgs = {
  input?: InputMaybe<BookInput>;
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


export type MutationCreateStatusArgs = {
  input: CreateStatusInput;
};


export type MutationDonateBookArgs = {
  input: DonateBookInput;
};


export type MutationProlongClaimPeriodArgs = {
  input?: InputMaybe<ProlongTimeInput>;
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


export type MutationReturnItemArgs = {
  input?: InputMaybe<BookInput>;
};


export type MutationUpdateMaterialArgs = {
  input: UpdateMaterialInput;
};


export type MutationUpdatePersonLocationArgs = {
  input: UpdatePersonLocationInput;
};

export type Notification = {
  __typename?: 'Notification';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  material: Material;
  material_id: Scalars['Int'];
  person: Person;
  person_id: Scalars['Int'];
};

export type Person = {
  __typename?: 'Person';
  avatar: Scalars['String'];
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  location: Location;
  location_id: Scalars['Int'];
  messages: Array<Maybe<Message>>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  smg_id: Scalars['String'];
  statuses?: Maybe<Array<Maybe<Status>>>;
  type: Scalars['String'];
  username: Scalars['String'];
};

export type ProlongTimeInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getAllLocations: Array<Maybe<Location>>;
  getAllMaterials: Array<Maybe<Material>>;
  getAllPersons: Array<Maybe<Person>>;
  getAllTakenItems: Array<Maybe<Status>>;
  getMaterialById: Material;
  getMaterialByIdentifier: Material;
  getNotificationsByMaterial: Array<Maybe<Notification>>;
  getNotificationsByPerson: Array<Maybe<Notification>>;
  getOnePerson: Person;
  getStatusesByMaterial: Array<Maybe<Status>>;
  getStatusesByPerson: Array<Maybe<Status>>;
  searchOfMaterials?: Maybe<Array<Maybe<Material>>>;
  welcome: Scalars['String'];
};


export type QueryGetAllTakenItemsArgs = {
  person_id: Scalars['Int'];
};


export type QueryGetMaterialByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetMaterialByIdentifierArgs = {
  input: SearchOneMaterial;
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


export type QueryGetStatusesByMaterialArgs = {
  material_id: Scalars['ID'];
};


export type QueryGetStatusesByPersonArgs = {
  person_id: Scalars['ID'];
};


export type QuerySearchOfMaterialsArgs = {
  input: SearchInput;
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

export type SearchInput = {
  location: Scalars['String'];
  search: Scalars['String'];
};

export type SearchOneMaterial = {
  identifier: Scalars['String'];
  location_id: Scalars['Int'];
};

export type Status = {
  __typename?: 'Status';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  material: Material;
  material_id: Scalars['Int'];
  person: Person;
  person_id: Scalars['Int'];
  status: Scalars['String'];
};

export type UpdateMaterialInput = {
  author?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  id_type?: InputMaybe<Scalars['String']>;
  identifier?: InputMaybe<Scalars['String']>;
  location_id?: InputMaybe<Scalars['Int']>;
  picture?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type UpdatePersonLocationInput = {
  location_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type ClaimBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ClaimBookMutation = { __typename?: 'Mutation', claimBook: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type CreateMessageForManagerMutationVariables = Exact<{
  person_id: Scalars['Int'];
  material_id?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  message: Scalars['String'];
}>;


export type CreateMessageForManagerMutation = { __typename?: 'Mutation', createMessageForManager: { __typename?: 'Error', message: string } | { __typename?: 'Message', message: string, title: string } };

export type CreateNotificationMutationVariables = Exact<{
  input: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: { __typename?: 'Notification', id: string } | null };

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
}>;


export type DonateBookMutation = { __typename?: 'Mutation', donateBook: { __typename?: 'Material', title: string, picture?: string | null, identifier: string } };

export type ProlongTimeMutationVariables = Exact<{
  person_id: Scalars['Int'];
  material_id: Scalars['Int'];
}>;


export type ProlongTimeMutation = { __typename?: 'Mutation', prolongClaimPeriod: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

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
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Material', identifier: string, id_type: string, type: string, location_id: number, title: string, author: string, category: string, updated_at: any } };

export type UpdatePersonLocationMutationVariables = Exact<{
  location_id: Scalars['Int'];
  person_id: Scalars['Int'];
}>;


export type UpdatePersonLocationMutation = { __typename?: 'Mutation', updatePersonLocation: { __typename?: 'Person', location_id: number } };

export type GetAllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocationsQuery = { __typename?: 'Query', getAllLocations: Array<{ __typename?: 'Location', id: string, location: string } | null> };

export type GetAllMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMaterialsQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', author: string, category: string, created_at: any, id: string, id_type: string, identifier: string, picture?: string | null, title: string, type: string, updated_at: any, notifications: Array<{ __typename?: 'Notification', material_id: number, person_id: number } | null>, statuses: Array<{ __typename?: 'Status', status: string, person_id: number } | null> } | null> };

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPersonsQuery = { __typename?: 'Query', getAllPersons: Array<{ __typename?: 'Person', id: string, statuses?: Array<{ __typename?: 'Status', id: string, material_id: number, created_at: any, status: string } | null> | null } | null> };

export type GetAllTakenItemsQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetAllTakenItemsQuery = { __typename?: 'Query', getAllTakenItems: Array<{ __typename?: 'Status', id: string, created_at: any, status: string, material: { __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string } } | null> };

export type GetMaterialByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMaterialByIdQuery = { __typename?: 'Query', getMaterialById: { __typename?: 'Material', id: string, identifier: string, picture?: string | null, title: string, author: string, category: string, created_at: any, updated_at: any, location_id: number, type: string, statuses: Array<{ __typename?: 'Status', id: string, person_id: number, status: string, created_at: any } | null> } };

export type GetMaterialByIdentifierQueryVariables = Exact<{
  identifier: Scalars['String'];
  location_id: Scalars['Int'];
}>;


export type GetMaterialByIdentifierQuery = { __typename?: 'Query', getMaterialByIdentifier: { __typename?: 'Material', id: string, picture?: string | null, author: string, title: string, category: string } };

export type GetNotificationsByPersonQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetNotificationsByPersonQuery = { __typename?: 'Query', getNotificationsByPerson: Array<{ __typename?: 'Notification', id: string, material_id: number, person_id: number } | null> };

export type SearchOfMaterialsQueryVariables = Exact<{
  search: Scalars['String'];
  location: Scalars['String'];
}>;


export type SearchOfMaterialsQuery = { __typename?: 'Query', searchOfMaterials?: Array<{ __typename?: 'Material', title: string, created_at: any, picture?: string | null, author: string, category: string, id: string, statuses: Array<{ __typename?: 'Status', id: string, created_at: any, status: string } | null> } | null> | null };


export const ClaimBookDocument = gql`
    mutation ClaimBook($identifier: String!, $person_id: Int!) {
  claimBook(input: {identifier: $identifier, person_id: $person_id}) {
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
    mutation CreateMessageForManager($person_id: Int!, $material_id: Int, $title: String!, $message: String!) {
  createMessageForManager(
    input: {person_id: $person_id, material_id: $material_id, title: $title, message: $message}
  ) {
    ... on Message {
      message
      title
    }
    ... on Error {
      message
    }
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
export const DonateBookDocument = gql`
    mutation DonateBook($person_id: Int!, $location_id: Int!, $identifier: String!, $id_type: String!, $type: String!, $title: String!, $author: String!, $category: String!, $description: String, $picture: String, $role: String!) {
  donateBook(
    input: {person_id: $person_id, location_id: $location_id, identifier: $identifier, type: $type, author: $author, category: $category, description: $description, id_type: $id_type, picture: $picture, title: $title, role: $role}
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
    mutation UpdateMaterial($identifier: String!, $id_type: String, $type: String, $location_id: Int, $title: String, $author: String, $category: String, $updated_at: DateTime!) {
  updateMaterial(
    input: {identifier: $identifier, id_type: $id_type, type: $type, location_id: $location_id, title: $title, author: $author, category: $category, updated_at: $updated_at}
  ) {
    identifier
    id_type
    type
    location_id
    title
    author
    category
    updated_at
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
export const UpdatePersonLocationDocument = gql`
    mutation UpdatePersonLocation($location_id: Int!, $person_id: Int!) {
  updatePersonLocation(input: {location_id: $location_id, person_id: $person_id}) {
    location_id
  }
}
    `;
export type UpdatePersonLocationMutationFn = Apollo.MutationFunction<UpdatePersonLocationMutation, UpdatePersonLocationMutationVariables>;

/**
 * __useUpdatePersonLocationMutation__
 *
 * To run a mutation, you first call `useUpdatePersonLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonLocationMutation, { data, loading, error }] = useUpdatePersonLocationMutation({
 *   variables: {
 *      location_id: // value for 'location_id'
 *      person_id: // value for 'person_id'
 *   },
 * });
 */
export function useUpdatePersonLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonLocationMutation, UpdatePersonLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonLocationMutation, UpdatePersonLocationMutationVariables>(UpdatePersonLocationDocument, options);
      }
export type UpdatePersonLocationMutationHookResult = ReturnType<typeof useUpdatePersonLocationMutation>;
export type UpdatePersonLocationMutationResult = Apollo.MutationResult<UpdatePersonLocationMutation>;
export type UpdatePersonLocationMutationOptions = Apollo.BaseMutationOptions<UpdatePersonLocationMutation, UpdatePersonLocationMutationVariables>;
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
    query GetAllMaterials {
  getAllMaterials {
    author
    category
    created_at
    id
    id_type
    identifier
    notifications {
      material_id
      person_id
    }
    picture
    statuses {
      status
      person_id
    }
    title
    type
    updated_at
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
export const GetAllPersonsDocument = gql`
    query GetAllPersons {
  getAllPersons {
    id
    statuses {
      id
      material_id
      created_at
      status
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
export const GetAllTakenItemsDocument = gql`
    query GetAllTakenItems($person_id: Int!) {
  getAllTakenItems(person_id: $person_id) {
    id
    created_at
    status
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
    location_id
    type
    statuses {
      id
      person_id
      status
      created_at
    }
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
export const GetMaterialByIdentifierDocument = gql`
    query GetMaterialByIdentifier($identifier: String!, $location_id: Int!) {
  getMaterialByIdentifier(
    input: {identifier: $identifier, location_id: $location_id}
  ) {
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
 *      location_id: // value for 'location_id'
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
export const GetNotificationsByPersonDocument = gql`
    query GetNotificationsByPerson($person_id: Int!) {
  getNotificationsByPerson(person_id: $person_id) {
    id
    material_id
    person_id
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
export const SearchOfMaterialsDocument = gql`
    query SearchOfMaterials($search: String!, $location: String!) {
  searchOfMaterials(input: {search: $search, location: $location}) {
    title
    created_at
    picture
    author
    category
    id
    statuses {
      id
      created_at
      status
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
 *      search: // value for 'search'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useSearchOfMaterialsQuery(baseOptions: Apollo.QueryHookOptions<SearchOfMaterialsQuery, SearchOfMaterialsQueryVariables>) {
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