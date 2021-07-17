import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Cars1626560755449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "plate",
            type: "varchar",
          },
          {
            name: "chassis",
            type: "varchar",
          },
          {
            name: "reindeer",
            type: "varchar",
          },
          {
            name: "model",
            type: "varchar",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "year",
            type: "integer",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}
