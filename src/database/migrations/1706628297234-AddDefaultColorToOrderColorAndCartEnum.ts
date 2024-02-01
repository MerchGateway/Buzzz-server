import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultColorToOrderColorAndCartEnum1706628297234 implements MigrationInterface {
    name = 'AddDefaultColorToOrderColorAndCartEnum1706628297234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`size\` \`size\` enum ('M', 'L', 'XL', 'S', 'XXL') NOT NULL DEFAULT 'M'`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`color\` \`color\` enum ('#002366', '#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NOT NULL DEFAULT '#ffffff'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`size\` \`size\` enum ('M', 'L', 'XL', 'S', 'XXL') NOT NULL DEFAULT 'M'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`color\` \`color\` enum ('#002366', '#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NOT NULL DEFAULT '#ffffff'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`color\` \`color\` enum ('#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`size\` \`size\` enum ('M', 'L', 'XL', 'S', 'XXL') NULL DEFAULT 'M'`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`color\` \`color\` enum ('#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`size\` \`size\` enum ('M', 'L', 'XL', 'S', 'XXL') NULL DEFAULT 'M'`);
    }

}
