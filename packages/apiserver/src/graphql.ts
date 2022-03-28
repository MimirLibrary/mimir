
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    welcome(): string | Promise<string>;
}

export interface PersonEntity {
    id: string;
    smg_id: string;
    type: string;
    created_at: string;
    status: Nullable<StatusEntity>[];
}

export interface StatusEntity {
    id?: Nullable<string>;
}

type Nullable<T> = T | null;
