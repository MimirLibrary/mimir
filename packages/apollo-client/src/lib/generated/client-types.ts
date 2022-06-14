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
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** Represents NULL values */
  Void: any;
};

export type BookInput = {
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
};

export type BookUnionResult = Error | Status;

export type CreateMaterialInput = {
  id_type: Scalars['String'];
  identifier: Scalars['String'];
  type: Scalars['String'];
};

export type CreateNotificationInput = {
  material_id: Scalars['Int'];
  person_id: Scalars['Int'];
};

export type CreatePersonInput = {
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

export type Material = {
  __typename?: 'Material';
  author: Scalars['String'];
  category: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  id_type: Scalars['String'];
  identifier: Scalars['String'];
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
  createMaterial: Material;
  createNotification?: Maybe<Notification>;
  createPerson: Person;
  createStatus: Status;
  removeNotification?: Maybe<Notification>;
  returnItem: BookUnionResult;
};


export type MutationClaimBookArgs = {
  input?: InputMaybe<BookInput>;
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


export type MutationRemoveNotificationArgs = {
  input: RemoveNotificationInput;
};


export type MutationReturnItemArgs = {
  input?: InputMaybe<BookInput>;
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
  notifications?: Maybe<Array<Maybe<Notification>>>;
  smg_id: Scalars['String'];
  statuses?: Maybe<Array<Maybe<Status>>>;
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
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

export type ClaimBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ClaimBookMutation = { __typename?: 'Mutation', claimBook: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type ReturnBookMutationVariables = Exact<{
  identifier: Scalars['String'];
  person_id: Scalars['Int'];
}>;


export type ReturnBookMutation = { __typename?: 'Mutation', returnItem: { __typename?: 'Error', message: string } | { __typename?: 'Status', created_at: any, status: string } };

export type GetAllMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMaterialsQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', author: string, category: string, created_at: any, id: string, id_type: string, identifier: string, picture?: string | null, title: string, type: string, updated_at: any, notifications: Array<{ __typename?: 'Notification', material_id: number, person_id: number } | null>, statuses: Array<{ __typename?: 'Status', status: string, person_id: number } | null> } | null> };

export type GetAllTakenItemsQueryVariables = Exact<{
  person_id: Scalars['Int'];
}>;


export type GetAllTakenItemsQuery = { __typename?: 'Query', getAllTakenItems: Array<{ __typename?: 'Status', id: string, created_at: any, status: string, material: { __typename?: 'Material', id: string, picture?: string | null, title: string, author: string, category: string } } | null> };

export type GetMaterialByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMaterialByIdQuery = { __typename?: 'Query', getMaterialById: { __typename?: 'Material', identifier: string, picture?: string | null, title: string, author: string, category: string, created_at: any, statuses: Array<{ __typename?: 'Status', id: string, person_id: number, status: string, created_at: any } | null> } };


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