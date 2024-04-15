import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeliveryCostTable1713130634262
	implements MigrationInterface
{
	name = 'CreateDeliveryCostTable1713130634262';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`gift\` DROP FOREIGN KEY \`FK_9390b06adb20c221b02f86da553\``
		);
		await queryRunner.query(
			`CREATE TABLE \`delivery_cost\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`state\` enum ('Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara') NOT NULL, \`cost\` decimal(10,2) NOT NULL, \`address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`ALTER TABLE \`product\` ADD \`customization_instructions\` varchar(255) NULL`
		);
		await queryRunner.query(
			`ALTER TABLE \`cart\` ADD \`creator_instructions\` text NULL`
		);
		await queryRunner.query(
			`ALTER TABLE \`cart\` ADD \`delivery_method\` enum ('DOORSTEP', 'RIDER') NOT NULL DEFAULT 'DOORSTEP'`
		);
		await queryRunner.query(
			`ALTER TABLE \`gift\` ADD CONSTRAINT \`FK_9390b06adb20c221b02f86da553\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`gift\` DROP FOREIGN KEY \`FK_9390b06adb20c221b02f86da553\``
		);
		await queryRunner.query(
			`ALTER TABLE \`cart\` DROP COLUMN \`delivery_method\``
		);
		await queryRunner.query(
			`ALTER TABLE \`cart\` DROP COLUMN \`creator_instructions\``
		);
		await queryRunner.query(
			`ALTER TABLE \`product\` DROP COLUMN \`customization_instructions\``
		);
		await queryRunner.query(`DROP TABLE \`delivery_cost\``);
		await queryRunner.query(
			`ALTER TABLE \`gift\` ADD CONSTRAINT \`FK_9390b06adb20c221b02f86da553\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
