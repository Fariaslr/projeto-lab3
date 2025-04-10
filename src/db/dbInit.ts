import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "./schema";
import * as FileSystem from "expo-file-system";

export function initializeDatabase() {
  const db = openDatabaseSync(DATABASE_NAME);

  try {
    // Ativa suporte a chave estrangeira
    db.execSync(`PRAGMA foreign_keys = ON;`);

    // Cria a tabela de CCPS
    db.execSync(`
      CREATE TABLE IF NOT EXISTS ccps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCcps TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        cep TEXT NOT NULL,
        endereco TEXT NOT NULL,
        cidade TEXT NOT NULL,
        estado TEXT NOT NULL,
        codigoAprovado TEXT NOT NULL,
        dataValidade TEXT NOT NULL
      );
    `);
    console.log("Tabela ccps criada ou já existia.");

    db.runSync(`
        INSERT INTO ccps (
          nomeCcps, cnpj, cep, endereco, cidade, estado, codigoAprovado, dataValidade
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `, [
      "Centro de Reprodução Equina",
      "12.345.678/0001-99",
      "12345-678",
      "Rua das Éguas, 123",
      "Camaçari",
      "BA",
      "APROVADO123",
      "2025-12-31"
    ]);
    console.log("Registro inicial do CCPS inserido.");

    db.execSync(`
      CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        crmv TEXT NOT NULL,
        fotoUrl TEXT,
        ccpsId INTEGER NOT NULL,
        FOREIGN KEY (ccpsId) REFERENCES ccps(id)
      );
    `);
    console.log("Tabela veterinarios criada");

  } catch (error) {
    console.error("Erro ao criar tabelas ou inserir registro:", error);
  }
}

export async function dropDatabase() {
  const dbPath = `${FileSystem.documentDirectory}SQLite/${DATABASE_NAME}`;
  const exists = await FileSystem.getInfoAsync(dbPath);
  if (exists.exists) {
    await FileSystem.deleteAsync(dbPath);
    console.log("Banco de dados deletado.");
  } else {
    console.log("Banco de dados não encontrado.");
  }
}
