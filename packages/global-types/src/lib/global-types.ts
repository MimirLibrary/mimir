
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Permissions {
    GRANT_REVOKE_MANAGER = "GRANT_REVOKE_MANAGER"
}

export interface CreateStateInput {
    person_id: number;
    state: boolean;
    description?: Nullable<string>;
}

export interface BookInput {
    identifier: string;
    person_id: number;
}

export interface ProlongTimeInput {
    person_id: number;
    material_id: number;
}

export interface CreateLocationInput {
    location: string;
}

export interface RemoveLocationInput {
    location_id: number;
}

export interface CreateMaterialInput {
    identifier: string;
    id_type: string;
    location_id: number;
    type: string;
    title: string;
    picture?: Nullable<string>;
    author: string;
    category: string;
    description: string;
}

export interface RemoveMaterialInput {
    identifier: string;
    location_id: number;
    type: string;
}

export interface UpdateMaterialInput {
    identifier?: Nullable<string>;
    id_type?: Nullable<string>;
    location_id?: Nullable<number>;
    type?: Nullable<string>;
    title?: Nullable<string>;
    picture?: Nullable<string>;
    author?: Nullable<string>;
    category?: Nullable<string>;
    updated_at: DateTime;
    description?: Nullable<string>;
}

export interface SearchOneMaterial {
    identifier: string;
    location_id: number;
}

export interface DonateBookInput {
    identifier: string;
    id_type: string;
    location_id: number;
    type: string;
    title: string;
    author: string;
    category: string;
    description?: Nullable<string>;
    picture?: Nullable<string>;
    person_id: number;
    role: string;
    is_donated: boolean;
}

export interface SearchInput {
    search?: Nullable<string>;
    location: string;
}

export interface CreateMessageInput {
    title: string;
    message: string;
    material_id?: Nullable<number>;
    location_id: number;
    person_id: number;
}

export interface CreateAnswerNotification {
    id: number;
    person_id: number;
    message: string;
}

export interface CreateNotificationInput {
    material_id: number;
    person_id: number;
}

export interface RemoveNotificationInput {
    material_id: number;
    person_id: number;
}

export interface CreatePersonInput {
    smg_id: string;
    location_id: number;
    type: string;
}

export interface UpdatePersonLocationInput {
    person_id: number;
    location_id: number;
}

export interface CreateStatusInput {
    material_id: number;
    person_id: number;
    status: string;
}

export interface BlockedUsers {
    id: string;
    description?: Nullable<string>;
    state: boolean;
    created_at: DateTime;
    person: Person;
}

export interface IQuery {
    getBlocksByPerson(person_id: string): Nullable<Nullable<BlockedUsers>[]> | Promise<Nullable<Nullable<BlockedUsers>[]>>;
    getReasonOfBlock(person_id: string): Nullable<BlockedUsers> | Promise<Nullable<BlockedUsers>>;
    getAllTakenItems(person_id: number): Nullable<Status>[] | Promise<Nullable<Status>[]>;
    getItemsForClaimHistory(person_id: number): Nullable<Status>[] | Promise<Nullable<Status>[]>;
    getAllLocations(): Nullable<Location>[] | Promise<Nullable<Location>[]>;
    getAllMaterials(location_id: string, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Material>[] | Promise<Nullable<Material>[]>;
    getMaterialById(id: string): Material | Promise<Material>;
    searchOfMaterials(input: SearchInput): Nullable<Nullable<Material>[]> | Promise<Nullable<Nullable<Material>[]>>;
    getMaterialByIdentifier(input: SearchOneMaterial): Material | Promise<Material>;
    getMaterialByIdentifierFromMetadata(identifier: string): Nullable<IMetaOfMaterial> | Promise<Nullable<IMetaOfMaterial>>;
    getAllDonatedMaterialsByPerson(id: string): Nullable<Nullable<Material>[]> | Promise<Nullable<Nullable<Material>[]>>;
    getMessagesByPerson(person_id: string): Nullable<Nullable<Message>[]> | Promise<Nullable<Nullable<Message>[]>>;
    getAllMessages(location_id: number): Nullable<Message[]> | Promise<Nullable<Message[]>>;
    getNotificationsByPerson(person_id: number): Nullable<Notification>[] | Promise<Nullable<Notification>[]>;
    getNotificationsByMaterial(material_id: number): Nullable<Notification>[] | Promise<Nullable<Notification>[]>;
    getOnePerson(id: string): Person | Promise<Person>;
    getAllPersons(username?: Nullable<string>): Person[] | Promise<Person[]>;
    getStatusesByPerson(person_id: string): Nullable<Status>[] | Promise<Nullable<Status>[]>;
    getStatusesByMaterial(material_id: string): Nullable<Status>[] | Promise<Nullable<Status>[]>;
    getAllStatusesIsOverdue(location_id: string): Nullable<Status>[] | Promise<Nullable<Status>[]>;
    welcome(): string | Promise<string>;
}

export interface IMutation {
    createState(input: CreateStateInput): Nullable<BlockedUsers> | Promise<Nullable<BlockedUsers>>;
    claimBook(input?: Nullable<BookInput>): BookUnionResult | Promise<BookUnionResult>;
    returnItem(input?: Nullable<BookInput>): BookUnionResult | Promise<BookUnionResult>;
    rejectItem(input?: Nullable<BookInput>): BookUnionResult | Promise<BookUnionResult>;
    prolongClaimPeriod(input?: Nullable<ProlongTimeInput>): BookUnionResult | Promise<BookUnionResult>;
    createLocation(input: CreateLocationInput): Nullable<Location> | Promise<Nullable<Location>>;
    removeLocation(input: RemoveLocationInput): Nullable<Location> | Promise<Nullable<Location>>;
    createMaterial(input: CreateMaterialInput): Material | Promise<Material>;
    removeMaterial(input: RemoveMaterialInput): Material | Promise<Material>;
    updateMaterial(input: UpdateMaterialInput): Material | Promise<Material>;
    donateBook(input: DonateBookInput): Material | Promise<Material>;
    createMessageForManager(input: CreateMessageInput): Message | Promise<Message>;
    createNotification(input: CreateNotificationInput): Nullable<Notification> | Promise<Nullable<Notification>>;
    removeNotification(input: RemoveNotificationInput): Nullable<Notification> | Promise<Nullable<Notification>>;
    createAnswerNotification(input: CreateAnswerNotification): Notification | Promise<Notification>;
    createPerson(input: CreatePersonInput): Person | Promise<Person>;
    updatePersonLocation(input: UpdatePersonLocationInput): Person | Promise<Person>;
    changePersonRole(person_id: number, type: string): Person | Promise<Person>;
    createStatus(input: CreateStatusInput): Status | Promise<Status>;
}

export interface Location {
    id: string;
    location: string;
    persons?: Nullable<Nullable<Person>[]>;
    materials?: Nullable<Nullable<Material>[]>;
}

export interface Material {
    id: string;
    identifier: string;
    id_type: string;
    type: string;
    location_id: number;
    created_at: DateTime;
    updated_at: DateTime;
    title: string;
    picture?: Nullable<string>;
    author: string;
    category: string;
    location: Location;
    statuses: Nullable<Status>[];
    notifications: Nullable<Notification>[];
    messages: Nullable<Message>[];
    description: string;
    is_donated: boolean;
}

export interface ResponseMetadata {
    idType: string;
    value: string;
}

export interface Author {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface Publisher {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface Meta {
    ageRestriction?: Nullable<string>;
    coverType?: Nullable<string>;
    dimensions?: Nullable<string>;
    manufacturer?: Nullable<string>;
    mass?: Nullable<string>;
    numberOfPages?: Nullable<string>;
    price?: Nullable<string>;
    series?: Nullable<string>;
    sku?: Nullable<string>;
}

export interface IMaterialMeta {
    authors?: Nullable<Nullable<Author>[]>;
    cover?: Nullable<string>;
    description?: Nullable<string>;
    title?: Nullable<string>;
    yearPublishedAt?: Nullable<number>;
    meta?: Nullable<Meta>;
    publisher?: Nullable<Publisher>;
}

export interface IMetaOfMaterial {
    idType?: Nullable<string>;
    value?: Nullable<string>;
    material?: Nullable<IMaterialMeta>;
}

export interface Message {
    id: string;
    material_id?: Nullable<number>;
    person_id: number;
    location_id: number;
    created_at: DateTime;
    person: Person;
    material: Material;
    title: string;
    message: string;
}

export interface Notification {
    id: string;
    material_id?: Nullable<number>;
    person_id: number;
    created_at: DateTime;
    person: Person;
    material?: Nullable<Material>;
    message?: Nullable<string>;
}

export interface Person {
    id: string;
    smg_id: string;
    position: string;
    type: string;
    username: string;
    email: string;
    avatar: string;
    location_id: number;
    created_at: DateTime;
    permissions?: Nullable<Nullable<Permissions>[]>;
    statuses?: Nullable<Nullable<Status>[]>;
    notifications?: Nullable<Nullable<Notification>[]>;
    location: Location;
    messages?: Nullable<Nullable<Message>[]>;
    states?: Nullable<Nullable<BlockedUsers>[]>;
}

export interface Status {
    id: string;
    material_id: number;
    person_id: number;
    status: string;
    created_at: DateTime;
    material: Material;
    person: Person;
}

export interface Error {
    message: string;
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
export type BookUnionResult = Status | Error;
type Nullable<T> = T | null;
