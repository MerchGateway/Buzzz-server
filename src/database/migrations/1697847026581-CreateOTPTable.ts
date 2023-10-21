import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOTPTable1697847026581 implements MigrationInterface {
  name = 'CreateOTPTable1697847026581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`otp\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`reason\` enum ('PIN_RESET') NOT NULL, \`code\` varchar(255) NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`otp\` ADD CONSTRAINT \`FK_258d028d322ea3b856bf9f12f25\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`otp\` DROP FOREIGN KEY \`FK_258d028d322ea3b856bf9f12f25\``,
    );
    await queryRunner.query(`DROP TABLE \`otp\``);
  }
}
