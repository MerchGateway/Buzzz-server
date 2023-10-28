import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailVerificationAndSocketIdToUsersTable1698501984234
  implements MigrationInterface
{
  name = 'AddEmailVerificationAndSocketIdToUsersTable1698501984234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email_verification_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_54663aeef9987efe0b4a3bda93\` (\`email_verification_token\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email_verified\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`socket_id\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`socket_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`email_verified\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_54663aeef9987efe0b4a3bda93\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`email_verification_token\``,
    );
  }
}
