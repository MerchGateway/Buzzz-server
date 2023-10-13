import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullDB1697123991454 implements MigrationInterface {
  name = 'FullDB1697123991454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment_receipt\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`reference\` varchar(255) NOT NULL, \`broker\` varchar(255) NOT NULL, \`payment_status\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f8ccb18f63f56dd046e9274a2a\` (\`reference\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`thumbnail\` text NULL, \`in_stock\` tinyint NOT NULL DEFAULT 1, \`price\` decimal NOT NULL, \`description\` varchar(255) NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`receipt_id\` varchar(255) NULL, \`purchased\` tinyint NOT NULL DEFAULT 0, \`bio\` varchar(255) NULL, \`category_id\` varchar(36) NULL, \`seller_id\` varchar(36) NULL, \`design_id\` varchar(36) NULL, UNIQUE INDEX \`REL_3d12e5ac2924935dd903ef576b\` (\`design_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`design\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`published\` tinyint NOT NULL DEFAULT 0, \`design_data\` text NOT NULL, \`contributors\` text NULL, \`images\` text NULL, \`texts\` text NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wallet\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`transaction\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`reference\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`currency\` enum ('NGN') NULL, \`message\` varchar(255) NULL, \`method\` enum ('DEBIT', 'CREDIT') NOT NULL, \`status\` enum ('FAILED', 'SUCCESS', 'PENDING') NOT NULL DEFAULT 'PENDING', \`channel\` enum ('CARD', 'BANK', 'USSD', 'QR', 'MOBILE_MONEY', 'BANK_TRANSFER') NOT NULL, \`wallet_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_0b12a144bdc7678b6ddb0b913f\` (\`reference\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cart\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`total\` int NOT NULL, \`size\` enum ('M', 'L', 'XL', 'S', 'XXL') NULL DEFAULT 'M', \`color\` enum ('#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NULL, \`user_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, UNIQUE INDEX \`REL_dccd1ec2d6f5644a69adf163bc\` (\`product_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`printing_partner\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` text NOT NULL, \`status\` enum ('enabled', 'disabled') NOT NULL DEFAULT 'enabled', UNIQUE INDEX \`IDX_058d21d734e33beeab6cd534c3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`seller_id\` varchar(255) NOT NULL, \`quantity\` decimal NOT NULL, \`total\` decimal(10,2) NOT NULL, \`shipping_details\` text NULL, \`polymailer_details\` text NULL, \`delivery_fee\` decimal(10) NULL DEFAULT '0', \`coupon\` varchar(255) NULL, \`status\` enum ('Pending', 'Paid', 'Cancelled', 'In-Progress', 'Printed', 'Sent-For-Delievery', 'Delievered', 'Not-Delievered', 'Completed') NOT NULL DEFAULT 'Pending', \`user_id\` varchar(36) NULL, \`transaction_id\` varchar(36) NULL, \`cart_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, \`printing_partner_id\` varchar(36) NULL, \`logistics_partner_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`logistics_partner\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` text NOT NULL, \`status\` enum ('enabled', 'disabled') NOT NULL DEFAULT 'enabled', UNIQUE INDEX \`IDX_387eaba8e550a28753e22e9715\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`identity_provider\` enum ('GOOGLE', 'TWITTER') NULL, \`identity_provider_id\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`password\` varchar(255) NULL, \`pin\` varchar(255) NULL, \`role\` enum ('admin', 'super-admin', 'printing-admin', 'logistic-admin', 'publisher', 'user') NOT NULL DEFAULT 'user', \`bio\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`shipping_address\` text NULL, \`is_public\` tinyint NOT NULL DEFAULT 1, \`allow_notification\` tinyint NOT NULL DEFAULT 0, \`registration_token\` varchar(255) NULL, \`allow_two_factor_authentication\` tinyint NOT NULL DEFAULT 0, \`is_two_factor_verified\` tinyint NOT NULL DEFAULT 0, \`two_factor_type\` enum ('GOOGLE', 'IN_APP') NOT NULL DEFAULT 'GOOGLE', \`show_email\` tinyint NOT NULL DEFAULT 1, \`instagram\` varchar(255) NULL, \`username\` varchar(255) NOT NULL, \`facebook\` varchar(255) NULL, \`twitter\` varchar(255) NULL, \`reddit\` varchar(255) NULL, \`printing_partner\` varchar(36) NULL, \`logistics_partner\` varchar(36) NULL, \`wallet_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_8b068ccc9f2d780253f5d7eae3\` (\`identity_provider_id\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_858c4058a370d9385b5a182e23\` (\`registration_token\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`REL_b453ec3d9d579f6b9699be98be\` (\`wallet_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`2fa\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`secret\` varchar(255) NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`contact\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`seller_id\` varchar(255) NOT NULL, \`status\` enum ('enabled', 'disabled') NOT NULL DEFAULT 'enabled', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`password_reset\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`token\` varchar(255) NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`status\` enum ('read', 'unread') NOT NULL DEFAULT 'unread', \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`polymailer_content\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer_user\` (\`customer_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_cec55e8d04c4f18c8e3376c4cd\` (\`customer_id\`), INDEX \`IDX_47d8f9531fe0accd8787fddf0e\` (\`user_id\`), PRIMARY KEY (\`customer_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0dce9bc93c2d2c399982d04bef1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ee28a0714cda2ea2f8cf38338a8\` FOREIGN KEY (\`receipt_id\`) REFERENCES \`payment_receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_79a3ae0442388a2418ec67a3120\` FOREIGN KEY (\`seller_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_3d12e5ac2924935dd903ef576b0\` FOREIGN KEY (\`design_id\`) REFERENCES \`design\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` ADD CONSTRAINT \`FK_b8ce694f1fb91d8c34f9002cec6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_08081d10759ec250c557cebd81a\` FOREIGN KEY (\`wallet_id\`) REFERENCES \`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_f091e86a234693a49084b4c2c86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_dccd1ec2d6f5644a69adf163bc1\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_199e32a02ddc0f47cd93181d8fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_d1c3a07f8a0cb7044b57cfe5f35\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transaction\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c99a206eb11ad45f6b7f04f2dcc\` FOREIGN KEY (\`cart_id\`) REFERENCES \`cart\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_539ede39e518562dfdadfddb492\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_7ac83bec8833b5ee2e0828b6b0c\` FOREIGN KEY (\`printing_partner_id\`) REFERENCES \`printing_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_2f89a44d0ca0fcf286fe5cb79a6\` FOREIGN KEY (\`logistics_partner_id\`) REFERENCES \`logistics_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_ba1ba67fd439832b11a8a7a4198\` FOREIGN KEY (\`printing_partner\`) REFERENCES \`printing_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c69cfff4a707fe546d884b9c03d\` FOREIGN KEY (\`logistics_partner\`) REFERENCES \`logistics_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_b453ec3d9d579f6b9699be98beb\` FOREIGN KEY (\`wallet_id\`) REFERENCES \`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` ADD CONSTRAINT \`FK_7580edd7eeaad88d161f796972c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` ADD CONSTRAINT \`FK_ad88301fdc79593dd222268a8b6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_928b7aa1754e08e1ed7052cb9d8\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_user\` ADD CONSTRAINT \`FK_cec55e8d04c4f18c8e3376c4cd2\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_user\` ADD CONSTRAINT \`FK_47d8f9531fe0accd8787fddf0ee\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer_user\` DROP FOREIGN KEY \`FK_47d8f9531fe0accd8787fddf0ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer_user\` DROP FOREIGN KEY \`FK_cec55e8d04c4f18c8e3376c4cd2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_928b7aa1754e08e1ed7052cb9d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` DROP FOREIGN KEY \`FK_ad88301fdc79593dd222268a8b6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` DROP FOREIGN KEY \`FK_7580edd7eeaad88d161f796972c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_b453ec3d9d579f6b9699be98beb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c69cfff4a707fe546d884b9c03d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_ba1ba67fd439832b11a8a7a4198\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_2f89a44d0ca0fcf286fe5cb79a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_7ac83bec8833b5ee2e0828b6b0c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_539ede39e518562dfdadfddb492\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c99a206eb11ad45f6b7f04f2dcc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_d1c3a07f8a0cb7044b57cfe5f35\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_dccd1ec2d6f5644a69adf163bc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_08081d10759ec250c557cebd81a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` DROP FOREIGN KEY \`FK_b8ce694f1fb91d8c34f9002cec6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_3d12e5ac2924935dd903ef576b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_79a3ae0442388a2418ec67a3120\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ee28a0714cda2ea2f8cf38338a8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0dce9bc93c2d2c399982d04bef1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_47d8f9531fe0accd8787fddf0e\` ON \`customer_user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cec55e8d04c4f18c8e3376c4cd\` ON \`customer_user\``,
    );
    await queryRunner.query(`DROP TABLE \`customer_user\``);
    await queryRunner.query(`DROP TABLE \`polymailer_content\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP TABLE \`password_reset\``);
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(`DROP TABLE \`contact\``);
    await queryRunner.query(`DROP TABLE \`2fa\``);
    await queryRunner.query(
      `DROP INDEX \`REL_b453ec3d9d579f6b9699be98be\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_858c4058a370d9385b5a182e23\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8b068ccc9f2d780253f5d7eae3\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_387eaba8e550a28753e22e9715\` ON \`logistics_partner\``,
    );
    await queryRunner.query(`DROP TABLE \`logistics_partner\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_058d21d734e33beeab6cd534c3\` ON \`printing_partner\``,
    );
    await queryRunner.query(`DROP TABLE \`printing_partner\``);
    await queryRunner.query(
      `DROP INDEX \`REL_dccd1ec2d6f5644a69adf163bc\` ON \`cart\``,
    );
    await queryRunner.query(`DROP TABLE \`cart\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0b12a144bdc7678b6ddb0b913f\` ON \`transaction\``,
    );
    await queryRunner.query(`DROP TABLE \`transaction\``);
    await queryRunner.query(`DROP TABLE \`wallet\``);
    await queryRunner.query(`DROP TABLE \`design\``);
    await queryRunner.query(
      `DROP INDEX \`REL_3d12e5ac2924935dd903ef576b\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f8ccb18f63f56dd046e9274a2a\` ON \`payment_receipt\``,
    );
    await queryRunner.query(`DROP TABLE \`payment_receipt\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
