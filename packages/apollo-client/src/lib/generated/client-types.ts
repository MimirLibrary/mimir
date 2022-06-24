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
  notifications: Array<Maybe<Notification>>;
  picture?: Maybe<Scalars['String']>;
  statuses: Array<Maybe<Status>>;
  title: Scalars['String'];
  type: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  claimBook: BookUnionResult;
  createLocation?: Maybe<Location>;
  createMaterial: Material;
  createNotification?: Maybe<Notification>;
  createPerson: Person;
  createStatus: Status;
  prolongClaimPeriod: BookUnionResult;
  removeLocation?: Maybe<Location>;
  removeMaterial: Material;
  removeNotification?: Maybe<Notification>;
  returnItem: BookUnionResult;
  updateMaterial: Material;
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


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationCreateStatusArgs = {
  input: CreateStatusInput;
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
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  location: Location;
  location_id: Scalars['Int'];
  notifications?: Maybe<Array<Maybe<Notification>>>;
  smg_id: Scalars['String'];
  statuses?: Maybe<Array<Maybe<Status>>>;
  type: Scalars['String'];
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
  getNotificationsByMaterial: Array<Maybe<Notification>>;
  getNotificationsByPerson: Array<Maybe<Notification>>;
  getOnePerson: Person;
  getStatusesByMaterial: Array<Maybe<Status>>;
  getStatusesByPerson: Array<Maybe<Status>>;
  welcome: Scalars['String'];
};


export type QueryGetAllTakenItemsArgs = {
  person_id: Scalars['Int'];
};


export type QueryGetMaterialByIdArgs = {
  id: Scalars['ID'];
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

export type RemoveLocationInput = {
  location_id: Scalars['Int'];
};

export type RemoveMaterialInput = {
  id_type: Scalars['String'];
  identifier: Scalars['String'];
  location_id: Scalars['Int'];
  type: Scalars['String'];
};

export type RemoveNotificationInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
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
  identifier: Scalars['String'];
  location_id?: InputMaybe<Scalars['Int']>;
  picture?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ClaimBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ClaimBookMutation = { __typename?: 'Mutation', claimBook: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type ProlongTimeMutationVariables = Exact<{
  person_id: Scalars['Int'];
  material_id: Scalars['Int'];
}>;


export type ProlongTimeMutation = { __typename?: 'Mutation', prolongClaimPeriod: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type ReturnBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ReturnBookMutation = { __typename?: 'Mutation', returnItem: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type GetAllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocationsQuery = { __typename?: 'Query', getAllLocations: Array<{ __typename?: 'Location', id: string, location: string } | null> };

export type GetAllMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMaterialsQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', author: string, category: string, created_at: any, id: string, id_type: string, identifier: string, picture?: string | null, title: string, type: string, updated_at: any, notifications: Array<{ __typename?: 'Notification', material_id: number, person_id: number } | null>, statuses: Array<{ __typename?: 'Status', status: string, person_id: number } | null> } | null> };

export type GetAllTakenItemsQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetAllTakenItemsQuery = { __typename?: 'Query', getAllTakenItems: Array<{ __typename?: 'Status', id: string, created_at: any, status: string, material: { __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string } } | null> };

export type GetMaterialByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMaterialByIdQuery = { __typename?: 'Query', getMaterialById: { __typename?: 'Material', id: string, identifier: string, picture?: string | null, title: string, author: string, category: string, created_at: any, statuses: Array<{ __typename?: 'Status', id: string, person_id: number, status: string, created_at: any } | null> } };


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