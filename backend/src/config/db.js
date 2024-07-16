import pg from "pg";

const {Pool} = pg;

export const pool = new Pool({
  host: "ep-calm-sea-a5tvx5qz-pooler.us-east-2.aws.neon.tech",
  port: 5432,
  user: "pipoca_owner",
  password: "onNPGam1Y0ME",
  database: "projeto",
  max: 100,
  min: 10,
  ssl: true,
});

