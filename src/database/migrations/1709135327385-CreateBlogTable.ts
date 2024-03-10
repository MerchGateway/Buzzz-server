import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBlogTable1709135327385 implements MigrationInterface {
  name = 'CreateBlogTable1709135327385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`blog\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`image_url\` varchar(255) NULL, \`title\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL, \`content\` longtext COLLATE "utf8mb4_unicode_ci" NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`blog\``);
  }
}
