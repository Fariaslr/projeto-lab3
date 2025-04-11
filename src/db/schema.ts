// db/schema.ts
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "ccps.db";

export const ccpsTable = sqliteTable("ccps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nomeCcps: text("nomeCcps").notNull(),        // <- Agora está igual ao modelo
  cnpj: text("cnpj").notNull(),
  senha: text("senha").notNull(),
  telefone: text("telefone"),
  cep: text("cep"),
  endereco: text("endereco"),
  cidade: text("cidade"),
  estado: text("estado"),
  codigoAprovado: text("codigoAprovado"),
  dataValidade: text("dataValidade"),
});

export const veterinariosTable = sqliteTable("veterinarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  crmv: text("crmv").notNull(),
  fotoUrl: text("fotoUrl"),
  ccpsId: integer("ccpsId").notNull(),
});
