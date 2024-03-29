import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNoteAndQuantityToGiftTable1702063142384
  implements MigrationInterface
{
  name = 'AddNoteAndQuantityToGiftTable1702063142384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`gift\` ADD \`note\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` ADD \`quantity\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_receipt\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ee28a0714cda2ea2f8cf38338a8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0dce9bc93c2d2c399982d04bef1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_79a3ae0442388a2418ec67a3120\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_3d12e5ac2924935dd903ef576b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`thumbnail\` \`thumbnail\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`receipt_id\` \`receipt_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`bio\` \`bio\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`category_id\` \`category_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`seller_id\` \`seller_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`design_id\` \`design_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` DROP FOREIGN KEY \`FK_b8ce694f1fb91d8c34f9002cec6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`contributors\` \`contributors\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`images\` \`images\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`texts\` \`texts\` text COLLATE "utf8mb4_unicode_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wallet\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`fee\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_08081d10759ec250c557cebd81a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_bcee076d7199e0d45647c3b66e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`currency\` \`currency\` enum ('NGN') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`message\` \`message\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`transfer_code\` \`transfer_code\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`wallet_id\` \`wallet_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`fee_id\` \`fee_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_dccd1ec2d6f5644a69adf163bc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`color\` \`color\` enum ('#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`printing_partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c99a206eb11ad45f6b7f04f2dcc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_539ede39e518562dfdadfddb492\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_7ac83bec8833b5ee2e0828b6b0c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_2f89a44d0ca0fcf286fe5cb79a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`shipping_details\` \`shipping_details\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`polymailer_details\` \`polymailer_details\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`coupon\` \`coupon\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`cart_id\` \`cart_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`printing_partner_id\` \`printing_partner_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`logistics_partner_id\` \`logistics_partner_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`logistics_partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_ba1ba67fd439832b11a8a7a4198\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c69cfff4a707fe546d884b9c03d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_b453ec3d9d579f6b9699be98beb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`identity_provider\` \`identity_provider\` enum ('GOOGLE', 'TWITTER') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`identity_provider_id\` \`identity_provider_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`pin\` \`pin\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`shipping_address\` \`shipping_address\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`registration_token\` \`registration_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`instagram\` \`instagram\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`facebook\` \`facebook\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`twitter\` \`twitter\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`reddit\` \`reddit\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`email_verification_token\` \`email_verification_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`socket_id\` \`socket_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`printing_partner\` \`printing_partner\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`logistics_partner\` \`logistics_partner\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`wallet_id\` \`wallet_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` DROP FOREIGN KEY \`FK_7580edd7eeaad88d161f796972c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` DROP FOREIGN KEY \`FK_ad88301fdc79593dd222268a8b6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_74e87d23a0f8db6a9ce4be59118\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_409eea92163eb5952c9090bd950\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`seller_id\` \`seller_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`buyer_id\` \`buyer_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` DROP FOREIGN KEY \`FK_9390b06adb20c221b02f86da553\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` DROP FOREIGN KEY \`FK_9b531b99ffe61e202a283a4bd9d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` CHANGE \`order_id\` \`order_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_928b7aa1754e08e1ed7052cb9d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`polymailer_content\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` DROP FOREIGN KEY \`FK_258d028d322ea3b856bf9f12f25\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`waitlist\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
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
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_bcee076d7199e0d45647c3b66e8\` FOREIGN KEY (\`fee_id\`) REFERENCES \`fee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_74e87d23a0f8db6a9ce4be59118\` FOREIGN KEY (\`seller_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_409eea92163eb5952c9090bd950\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` ADD CONSTRAINT \`FK_9390b06adb20c221b02f86da553\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` ADD CONSTRAINT \`FK_9b531b99ffe61e202a283a4bd9d\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_928b7aa1754e08e1ed7052cb9d8\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` ADD CONSTRAINT \`FK_258d028d322ea3b856bf9f12f25\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`otp\` DROP FOREIGN KEY \`FK_258d028d322ea3b856bf9f12f25\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_928b7aa1754e08e1ed7052cb9d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` DROP FOREIGN KEY \`FK_9b531b99ffe61e202a283a4bd9d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` DROP FOREIGN KEY \`FK_9390b06adb20c221b02f86da553\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_409eea92163eb5952c9090bd950\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_74e87d23a0f8db6a9ce4be59118\``,
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
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_dccd1ec2d6f5644a69adf163bc1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_bcee076d7199e0d45647c3b66e8\``,
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
      `ALTER TABLE \`waitlist\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` ADD CONSTRAINT \`FK_258d028d322ea3b856bf9f12f25\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`polymailer_content\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_928b7aa1754e08e1ed7052cb9d8\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` CHANGE \`order_id\` \`order_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` ADD CONSTRAINT \`FK_9b531b99ffe61e202a283a4bd9d\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`gift\` ADD CONSTRAINT \`FK_9390b06adb20c221b02f86da553\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`buyer_id\` \`buyer_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`seller_id\` \`seller_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_409eea92163eb5952c9090bd950\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_74e87d23a0f8db6a9ce4be59118\` FOREIGN KEY (\`seller_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_reset\` ADD CONSTRAINT \`FK_ad88301fdc79593dd222268a8b6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`2fa\` ADD CONSTRAINT \`FK_7580edd7eeaad88d161f796972c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`wallet_id\` \`wallet_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`logistics_partner\` \`logistics_partner\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`printing_partner\` \`printing_partner\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`socket_id\` \`socket_id\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`email_verification_token\` \`email_verification_token\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`reddit\` \`reddit\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`twitter\` \`twitter\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`facebook\` \`facebook\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`instagram\` \`instagram\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`registration_token\` \`registration_token\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`shipping_address\` \`shipping_address\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`pin\` \`pin\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`identity_provider_id\` \`identity_provider_id\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`identity_provider\` \`identity_provider\` enum ('GOOGLE', 'TWITTER') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_b453ec3d9d579f6b9699be98beb\` FOREIGN KEY (\`wallet_id\`) REFERENCES \`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c69cfff4a707fe546d884b9c03d\` FOREIGN KEY (\`logistics_partner\`) REFERENCES \`logistics_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_ba1ba67fd439832b11a8a7a4198\` FOREIGN KEY (\`printing_partner\`) REFERENCES \`printing_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`logistics_partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`logistics_partner_id\` \`logistics_partner_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`printing_partner_id\` \`printing_partner_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`cart_id\` \`cart_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`coupon\` \`coupon\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`polymailer_details\` \`polymailer_details\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`shipping_details\` \`shipping_details\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_2f89a44d0ca0fcf286fe5cb79a6\` FOREIGN KEY (\`logistics_partner_id\`) REFERENCES \`logistics_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_7ac83bec8833b5ee2e0828b6b0c\` FOREIGN KEY (\`printing_partner_id\`) REFERENCES \`printing_partner\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_539ede39e518562dfdadfddb492\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c99a206eb11ad45f6b7f04f2dcc\` FOREIGN KEY (\`cart_id\`) REFERENCES \`cart\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_199e32a02ddc0f47cd93181d8fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`printing_partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`color\` \`color\` enum ('#ffffff', '#808080', '#333333', '#ff0005', '#ff8c00', 'Green', 'Red', 'White', 'Blue', 'Orange', 'Black', 'Grey', 'Brown', 'Pink', 'Purple', 'Ash') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_dccd1ec2d6f5644a69adf163bc1\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_f091e86a234693a49084b4c2c86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`fee_id\` \`fee_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`wallet_id\` \`wallet_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`transfer_code\` \`transfer_code\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`message\` \`message\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`currency\` \`currency\` enum ('NGN') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_bcee076d7199e0d45647c3b66e8\` FOREIGN KEY (\`fee_id\`) REFERENCES \`fee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_08081d10759ec250c557cebd81a\` FOREIGN KEY (\`wallet_id\`) REFERENCES \`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`fee\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wallet\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`texts\` \`texts\` text COLLATE "utf8mb4_unicode_ci" NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`images\` \`images\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`contributors\` \`contributors\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`design\` ADD CONSTRAINT \`FK_b8ce694f1fb91d8c34f9002cec6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`design_id\` \`design_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`seller_id\` \`seller_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`category_id\` \`category_id\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`bio\` \`bio\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`receipt_id\` \`receipt_id\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`thumbnail\` \`thumbnail\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_3d12e5ac2924935dd903ef576b0\` FOREIGN KEY (\`design_id\`) REFERENCES \`design\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_79a3ae0442388a2418ec67a3120\` FOREIGN KEY (\`seller_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0dce9bc93c2d2c399982d04bef1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ee28a0714cda2ea2f8cf38338a8\` FOREIGN KEY (\`receipt_id\`) REFERENCES \`payment_receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_receipt\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`gift\` DROP COLUMN \`quantity\``);
    await queryRunner.query(`ALTER TABLE \`gift\` DROP COLUMN \`note\``);
  }
}
