import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateOrders1680650548498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "orders_games_games" ("orders_id" uuid NOT NULL, "games_id" uuid NOT NULL, CONSTRAINT "PK_679f3a0abf5df01e5abc9e1eb5d" PRIMARY KEY ("orders_id", "games_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_1539374faae65b41e72b717ace" ON "orders_games_games" ("orders_id")',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_c33cc0bf56d07dcf4817fce355" ON "orders_games_games" ("games_id")',
    );
    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_1539374faae65b41e72b717ace8" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_c33cc0bf56d07dcf4817fce3553" FOREIGN KEY ("games_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_c33cc0bf56d07dcf4817fce3553"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_1539374faae65b41e72b717ace8"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"',
    );
    await queryRunner.query('DROP INDEX "IDX_c33cc0bf56d07dcf4817fce355"');
    await queryRunner.query('DROP INDEX "IDX_1539374faae65b41e72b717ace"');
    await queryRunner.query('DROP TABLE "orders_games_games"');
    await queryRunner.query('DROP TABLE "orders"');
  }
}
