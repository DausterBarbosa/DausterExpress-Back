import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToOrderTable1718804448278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("order", new TableColumn({
            name: "imagem_url",
            type: "varchar",
            isNullable: true,
            default: null,
        }));

        await queryRunner.addColumn("order", new TableColumn({
            name: "data_retirada",
            type: "timestamp",
            isNullable: true,
            default: null,
        }));

        await queryRunner.addColumn("order", new TableColumn({
            name: "data_entrega",
            type: "timestamp",
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "imagem_url");
        await queryRunner.dropColumn("order", "data_retirada");
        await queryRunner.dropColumn("order", "data_entrega");
    }

}
