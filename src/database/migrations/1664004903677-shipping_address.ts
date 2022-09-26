import { MigrationInterface, QueryRunner } from "typeorm";

export class shippingAddress1664004903677 implements MigrationInterface {
    name = 'shippingAddress1664004903677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_f2460125a2e55358208bd5f50fb\``);
        await queryRunner.query(`CREATE TABLE \`cart_item\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`total\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`client_id\` varchar(36) NULL, \`productId\` varchar(36) NULL, \`productCategoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`shipping_address\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`message\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`status\` \`status\` enum ('completed', 'paid', 'pending', 'cancelled') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_f2460125a2e55358208bd5f50fb\` FOREIGN KEY (\`cart_item_id\`) REFERENCES \`cart_item\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_0082966198f23d7c49d54ae48ef\` FOREIGN KEY (\`client_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_fde3612852e539029fd3da2496f\` FOREIGN KEY (\`productId\`, \`productCategoryId\`) REFERENCES \`product\`(\`id\`,\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_fde3612852e539029fd3da2496f\``);
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_0082966198f23d7c49d54ae48ef\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_f2460125a2e55358208bd5f50fb\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`status\` \`status\` enum ('completed', 'paid', 'pending') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`shipping_address\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`cart_item\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_f2460125a2e55358208bd5f50fb\` FOREIGN KEY (\`cart_item_id\`) REFERENCES \`cart-item\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
