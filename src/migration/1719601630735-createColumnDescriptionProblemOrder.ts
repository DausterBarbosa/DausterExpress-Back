import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnDescriptionProblemOrder1719601630735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("order", new TableColumn({
            name: "description_problem",
            type: "varchar",
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "description_problem");
    }

}
