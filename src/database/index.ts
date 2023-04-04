import "reflect-metadata"
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgresdb",
  database: "queries_challenge",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(), // set snake_case to use all query methods
});

// postgresDataSource
//   .initialize()
//   .then(() => {
//     console.log("Postgres has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during postgres initialization", err);
//   });
