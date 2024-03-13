import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStateColorAndPriceTableWithFeesRow1710312896435 implements MigrationInterface {
    name = 'UpdateStateColorAndPriceTableWithFeesRow1710312896435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`colors_and_sizes\` ADD \`owner_fee\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`colors_and_sizes\` ADD \`reseller_fee\` decimal(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`colors_and_sizes\` DROP COLUMN \`reseller_fee\``);
        await queryRunner.query(`ALTER TABLE \`colors_and_sizes\` DROP COLUMN \`owner_fee\``);
    }

}
