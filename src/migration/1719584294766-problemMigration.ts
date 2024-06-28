import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProblemMigration1719581852326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "problem",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "encomenda",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "descricao",
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
                }
            ]
        }));

        await queryRunner.createForeignKey("problem", new TableForeignKey({
            columnNames: ["encomenda"],
            referencedColumnNames: ["id"],
            referencedTableName: "order",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("problem");
    }

}
