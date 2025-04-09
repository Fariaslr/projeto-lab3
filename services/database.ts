import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("ccps.db");

export function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        crmv TEXT NOT NULL,
        estado TEXT NOT NULL,
        fotoUrl TEXT,
        ccpsId INTEGER NOT NULL
      );`
    );
  });
}

export function getDbConnection() {
  return db;
}
