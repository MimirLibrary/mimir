
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    welcome(): string | Promise<string>;
    getAllMaterials(): Nullable<Nullable<Material>[]> | Promise<Nullable<Nullable<Material>[]>>;
}

export interface Material {
    id: number;
    identifier: string;
    id_type: string;
    type: string;
    created_at: string;
    updated_at: string;
}

type Nullable<T> = T | null;
