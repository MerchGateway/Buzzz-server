import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeeTable1697324855619 implements MigrationInterface {
  name = 'CreateFeeTable1697324855619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_d1c3a07f8a0cb7044b57cfe5f35\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0b12a144bdc7678b6ddb0b913f\` ON \`transaction\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`fee\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`owner\` decimal(10,2) NOT NULL, \`reseller\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP COLUMN \`transaction_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`fee_amount\` decimal(10,2) NOT NULL DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`is_hidden\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`fee_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_bcee076d7199e0d45647c3b66e8\` FOREIGN KEY (\`fee_id\`) REFERENCES \`fee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_bcee076d7199e0d45647c3b66e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`fee_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`is_hidden\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`fee_amount\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`transaction_id\` varchar(36) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`fee\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_0b12a144bdc7678b6ddb0b913f\` ON \`transaction\` (\`reference\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_d1c3a07f8a0cb7044b57cfe5f35\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transaction\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
