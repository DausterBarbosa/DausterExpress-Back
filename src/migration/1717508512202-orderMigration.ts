import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class OrderMigration1717508512202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "order",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "destinatario",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "entregador",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "encomenda",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "status",
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

        await queryRunner.createForeignKey("order", new TableForeignKey({
            columnNames: ["destinatario"],
            referencedColumnNames: ["id"],
            referencedTableName: "recipient",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("order", new TableForeignKey({
            columnNames: ["entregador"],
            referencedColumnNames: ["id"],
            referencedTableName: "deliveryman",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order");
    }

}
