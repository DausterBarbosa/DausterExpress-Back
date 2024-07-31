import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnPhotoProfileDeliveryman1722445764775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("deliveryman", new TableColumn({
            name: "url_image_profile",
            type: "varchar",
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("deliveryman", "url_image_profile");
    }

}
