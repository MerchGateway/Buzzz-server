import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorCustomersTable1698325520638 implements MigrationInterface {
  name = 'RefactorCustomersTable1698325520638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`transfer_code\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`buyer_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`seller_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`seller_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_74e87d23a0f8db6a9ce4be59118\` FOREIGN KEY (\`seller_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_409eea92163eb5952c9090bd950\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE \`customer_user\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_409eea92163eb5952c9090bd950\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_74e87d23a0f8db6a9ce4be59118\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`seller_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`seller_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`buyer_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`transfer_code\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer_user\` (\`customer_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_cec55e8d04c4f18c8e3376c4cd\` (\`customer_id\`), INDEX \`IDX_47d8f9531fe0accd8787fddf0e\` (\`user_id\`), PRIMARY KEY (\`customer_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
  }
}
