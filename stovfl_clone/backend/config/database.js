import { Sequelize } from "sequelize";

const db = new Sequelize("cqadb", "postgres", "2245", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
});

export default db;
