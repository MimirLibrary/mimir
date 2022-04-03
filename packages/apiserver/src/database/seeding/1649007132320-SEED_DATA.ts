import { MigrationInterface, QueryRunner } from "typeorm";
import { Material } from '../../resources/materials/material.entity'

export class SEEDDATA1649007132320 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const material = Material.create({
            identifier: "33",
            id_type: "333",
            type: "333",
        });

        await Material.save(material);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}


