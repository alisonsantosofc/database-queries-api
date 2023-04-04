import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateGameGender1680638181704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_29aae5c35a416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "genres_games_games" ("genres_id" uuid NOT NULL, "games_id" uuid NOT NULL, CONSTRAINT "PK_477fd5c574477fd5c7693bc7872" PRIMARY KEY ("genres_id", "games_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_d8644de82980d8f9d0084e5c35" ON "users_games_games" ("genres_id") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_f9d0084c9876ad327980d8ad32" ON "users_games_games" ("games_id") ',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" ADD CONSTRAINT "FK_d8644de82980d8f9d0084e5c35a" FOREIGN KEY ("genres_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" ADD CONSTRAINT "FK_f9d0084c9876ad327980d8ad32d" FOREIGN KEY ("games_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" DROP CONSTRAINT "FK_f9d0084c9876ad327980d8ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_games_games" DROP CONSTRAINT "FK_d8644de82980d8f9d0084e5c35a"',
    );
    await queryRunner.query('DROP INDEX "IDX_f9d0084c9876ad327980d8ad32"');
    await queryRunner.query('DROP INDEX "IDX_d8644de82980d8f9d0084e5c35"');
    await queryRunner.query('DROP TABLE "genres_games_games"');
    await queryRunner.query('DROP TABLE "genres"');
  }
}
