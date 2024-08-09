import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnFcmToken1723221373152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("deliveryman", new TableColumn({
            name: "fcm_token",
            type: "varchar",
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("deliveryman", "fcm_token");
    }

}
