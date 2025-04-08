import { openDatabaseSync, WebSQLDatabase, SQLTransaction, SQLResultSet } from "expo-sqlite";

let db: WebSQLDatabase;

export function getDbConnection(): WebSQLDatabase {
  if (!db) {
    db = openDatabaseSync("ccps.db");
  }
  return db;
}

export function createTable() {
  const db = getDbConnection();

  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        crmv TEXT NOT NULL,
        estado TEXT NOT NULL,
        fotoUrl TEXT,
        ccpsId INTEGER NOT NULL
      );`,
      [],
      (_tx: SQLTransaction, _result: SQLResultSet) => {
        console.log("Tabela criada com sucesso");
      },
      (_tx: SQLTransaction, error: Error) => {
        console.error("Erro ao criar tabela:", error);
        return false;
      }
    );
  });
}
