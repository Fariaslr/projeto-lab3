import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "./schema";

export function initializeDatabase() {
  const db = openDatabaseSync(DATABASE_NAME);

  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        crmv TEXT NOT NULL,
        cep TEXT NOT NULL,
        endereco TEXT,
        fotoUrl TEXT,
        ccpsId INTEGER NOT NULL
      );
    `);
    console.log("Tabela veterinarios criada ou já existia.");
  } catch (error) {
    console.error("Erro ao criar tabela veterinarios:", error);
  }
}
