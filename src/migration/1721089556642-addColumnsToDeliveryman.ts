import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToDeliveryman1721089556642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("deliveryman", new TableColumn({
            name: "reset_token",
            type: "varchar",
            isNullable: true,
            default: null,
        }));

        await queryRunner.addColumn("deliveryman", new TableColumn({
            name: "password_hash",
            type: "varchar",
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("deliveryman", "reset_token");
        await queryRunner.dropColumn("deliveryman", "password_hash");
    }

}
