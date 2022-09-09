import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1662723856261 implements MigrationInterface {
    name = 'generate1662723856261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_receipt\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`reference\` varchar(255) NOT NULL, \`broker\` varchar(255) NOT NULL, \`payment_status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_f8ccb18f63f56dd046e9274a2a\` (\`reference\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`inStock\` tinyint NOT NULL DEFAULT 0, \`price\` decimal NOT NULL, \`isPublished\` tinyint NOT NULL DEFAULT 0, \`categoryId\` varchar(255) NOT NULL, \`receiptId\` varchar(255) NULL, \`purchased\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` varchar(36) NOT NULL, \`reference\` varchar(255) NOT NULL, \`fee\` varchar(255) NULL, \`amount\` decimal NULL, \`currency\` varchar(255) NULL, \`status\` enum ('failed', 'successful', 'pending') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`channel\` enum ('card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer') NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`client_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_0b12a144bdc7678b6ddb0b913f\` (\`reference\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`product\` text NULL, \`quantity\` decimal NULL, \`total\` decimal NULL, \`shipping_details\` text NOT NULL, \`delivery_fee\` decimal(10) NULL DEFAULT '0', \`coupon\` varchar(255) NULL, \`status\` enum ('completed', 'paid', 'pending') NOT NULL DEFAULT 'pending', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`client_id\` varchar(36) NULL, \`transaction_id\` varchar(36) NULL, \`cart_item_id\` varchar(36) NULL, UNIQUE INDEX \`REL_f2460125a2e55358208bd5f50f\` (\`cart_item_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart-item\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`total\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`client_id\` varchar(36) NULL, \`productId\` varchar(36) NULL, \`productCategoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`bio\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_public\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`show_email\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`instagram\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`facebook\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`twitter\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reddit\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_7d6084b041fc26a746ac639f6bc\` FOREIGN KEY (\`receiptId\`) REFERENCES \`payment_receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_3e4cf3f31643825f80f28f929e2\` FOREIGN KEY (\`client_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a0d9cbb7f4a017bac3198dd8ca0\` FOREIGN KEY (\`client_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_d1c3a07f8a0cb7044b57cfe5f35\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transaction\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_f2460125a2e55358208bd5f50fb\` FOREIGN KEY (\`cart_item_id\`) REFERENCES \`cart-item\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart-item\` ADD CONSTRAINT \`FK_a535ba3477ddc07db5af9949337\` FOREIGN KEY (\`client_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart-item\` ADD CONSTRAINT \`FK_1cff595dee87094a0892e6d0026\` FOREIGN KEY (\`productId\`, \`productCategoryId\`) REFERENCES \`product\`(\`id\`,\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart-item\` DROP FOREIGN KEY \`FK_1cff595dee87094a0892e6d0026\``);
        await queryRunner.query(`ALTER TABLE \`cart-item\` DROP FOREIGN KEY \`FK_a535ba3477ddc07db5af9949337\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_f2460125a2e55358208bd5f50fb\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_d1c3a07f8a0cb7044b57cfe5f35\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a0d9cbb7f4a017bac3198dd8ca0\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_3e4cf3f31643825f80f28f929e2\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_7d6084b041fc26a746ac639f6bc\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reddit\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twitter\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`facebook\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`instagram\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`show_email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_public\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bio\``);
        await queryRunner.query(`DROP TABLE \`cart-item\``);
        await queryRunner.query(`DROP INDEX \`REL_f2460125a2e55358208bd5f50f\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b12a144bdc7678b6ddb0b913f\` ON \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_f8ccb18f63f56dd046e9274a2a\` ON \`payment_receipt\``);
        await queryRunner.query(`DROP TABLE \`payment_receipt\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
