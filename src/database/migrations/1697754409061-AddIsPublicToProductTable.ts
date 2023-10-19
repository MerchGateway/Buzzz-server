import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsPublicToProductTable1697754409061
  implements MigrationInterface
{
  name = 'AddIsPublicToProductTable1697754409061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`is_public\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`is_public\``,
    );
  }
}
