/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface ClaimBookInput {
  identifier?: Nullable<string>;
  id_internal?: Nullable<string>;
  person_id: string;
}

export interface CreateMaterialInput {
  identifier: string;
  id_type: string;
  type: string;
}

export interface CreatePersonInput {
  smg_id: string;
  type: string;
}

export interface CreateStatusInput {
  material_id: string;
  person_id: string;
  status: string;
}

export interface Material {
  id: string;
  identifier: string;
  id_type: string;
  type: string;
  created_at: DateTime;
  updated_at: DateTime;
  statuses: Nullable<Status>[];
}

export interface Person {
  id: string;
  smg_id: string;
  type: string;
  created_at: DateTime;
  statuses?: Nullable<Nullable<Status>[]>;
}

export interface Status {
  id: string;
  material_id: string;
  person_id: string;
  status: string;
  created_at: DateTime;
}

export interface Error {
  message: string;
}

export interface IQuery {
  welcome(): string | Promise<string>;
  getAllPersons(): Nullable<Person>[] | Promise<Nullable<Person>[]>;
  getAllMaterials(): Nullable<Material>[] | Promise<Nullable<Material>[]>;
  getMaterialById(id: string): Nullable<Material> | Promise<Nullable<Material>>;
  getStatusesByPerson(
    person_id: string
  ): Nullable<Status>[] | Promise<Nullable<Status>[]>;
  getStatusesByMaterial(
    material_id: string
  ): Nullable<Status>[] | Promise<Nullable<Status>[]>;
  getOnePerson(id: string): Nullable<Person> | Promise<Nullable<Person>>;
}

export interface IMutation {
  createMaterial(
    input: CreateMaterialInput
  ): Nullable<Material> | Promise<Nullable<Material>>;
  createPerson(
    input: CreatePersonInput
  ): Nullable<Person> | Promise<Nullable<Person>>;
  createStatus(
    input: CreateStatusInput
  ): Nullable<Status> | Promise<Nullable<Status>>;
  claimBook(
    input?: Nullable<ClaimBookInput>
  ): StatusResult | Promise<StatusResult>;
}

export type DateTime = any;
export type Time = any;
export type Timestamp = any;
export type TimeZone = any;
export type UtcOffset = any;
export type Duration = any;
export type ISO8601Duration = any;
export type LocalDate = any;
export type LocalTime = any;
export type LocalEndTime = any;
export type EmailAddress = any;
export type NegativeFloat = any;
export type NegativeInt = any;
export type NonEmptyString = any;
export type NonNegativeFloat = any;
export type NonNegativeInt = any;
export type NonPositiveFloat = any;
export type NonPositiveInt = any;
export type PhoneNumber = any;
export type PositiveFloat = any;
export type PositiveInt = any;
export type PostalCode = any;
export type UnsignedFloat = any;
export type UnsignedInt = any;
export type URL = any;
export type BigInt = any;
export type Long = any;
export type Byte = any;
export type UUID = any;
export type GUID = any;
export type Hexadecimal = any;
export type HexColorCode = any;
export type HSL = any;
export type HSLA = any;
export type IPv4 = any;
export type IPv6 = any;
export type ISBN = any;
export type JWT = any;
export type Latitude = any;
export type Longitude = any;
export type MAC = any;
export type Port = any;
export type RGB = any;
export type RGBA = any;
export type SafeInt = any;
export type USCurrency = any;
export type Currency = any;
export type JSON = any;
export type JSONObject = any;
export type IBAN = any;
export type ObjectID = any;
export type Void = any;
export type DID = any;
export type CountryCode = any;
export type Locale = any;
export type RoutingNumber = any;
export type AccountNumber = any;
export type StatusResult = Status | Error;
type Nullable<T> = T | null;
