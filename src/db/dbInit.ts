import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "./schema";
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

export async function initializeDatabase() {
  const db = openDatabaseSync(DATABASE_NAME);

  try {
    const senhaOriginal = "senha123";
    const senhaCriptografada = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senhaOriginal
    );

    db.execSync(`PRAGMA foreign_keys = ON;`);

    db.runSync(`
      CREATE TABLE IF NOT EXISTS ccps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCcps TEXT,
        cnpj TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        cep TEXT,
        telefone TEXT,
        endereco TEXT,
        cidade TEXT,
        estado TEXT,
        codigoAprovado TEXT,
        dataValidade TEXT
      );
    `);
    console.log("Tabela ccps criada ou já existia.");

    db.runSync(
      `INSERT INTO ccps (
        nomeCcps, cnpj, senha, telefone, cep, endereco, cidade, estado, codigoAprovado, dataValidade
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        "Centro de Reprodução Equina",
        "12345678000199",
        senhaCriptografada,
        "(71) 91234-5678",
        "12345-678",
        "Rua das Éguas, 123",
        "Camaçari",
        "BA",
        "APROVADO123",
        "2025-12-31",
      ]
    );    
    console.log("Registro inicial do CCPS inserido.");

    db.execSync(`
      CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        crmv TEXT NOT NULL,
        fotoUrl TEXT,
        ccpsId INTEGER,
        FOREIGN KEY (ccpsId) REFERENCES ccps(id)
      );
    `);
    console.log("Tabela veterinarios criada.");
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

export async function selectCcps(): Promise<any[]> {
  const db = openDatabaseSync(DATABASE_NAME);
  try {
    const resultados = db.getAllSync("SELECT * FROM ccps;");
    return resultados;
  } catch (error) {
    console.error("Erro ao buscar registros da tabela ccps:", error);
    return [];
  }
}
