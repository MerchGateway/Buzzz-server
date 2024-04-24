import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDesignVariantTable1713522576754
	implements MigrationInterface
{
	name = 'CreateDesignVariantTable1713522576754';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`design_variant\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`design_data\` text COLLATE "utf8mb4_unicode_ci" NOT NULL, \`images\` text NULL, \`texts\` text COLLATE "utf8mb4_unicode_ci" NULL, \`design_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`ALTER TABLE \`design_variant\` ADD CONSTRAINT \`FK_aa8b2766a932631859ce5ede024\` FOREIGN KEY (\`design_id\`) REFERENCES \`design\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`design_variant\` DROP FOREIGN KEY \`FK_aa8b2766a932631859ce5ede024\``
		);
		await queryRunner.query(`DROP TABLE \`design_variant\``);
	}
}
