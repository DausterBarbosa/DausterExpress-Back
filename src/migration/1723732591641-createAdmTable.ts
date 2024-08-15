import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdmTable1723732591641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "administrator",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "nome",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "sobrenome",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "telefone",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "estado",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "cidade",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "cep",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "endereco",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "numero",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                    onUpdate: "now()"
                },
                {
                    name: "password_hash",
                    type: "varchar",
                    isNullable: false,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("administrator");
    }

}
