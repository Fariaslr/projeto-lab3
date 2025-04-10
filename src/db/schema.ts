import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "ccps.db";

export const veterinariosTable = sqliteTable("veterinarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  crmv: text("crmv").notNull(),
  cep: text("cep").notNull(),
  endereco: text("endereco"),
  fotoUrl: text("fotoUrl"),
  ccpsId: integer("ccpsId").notNull(),
});

export const ccps = sqliteTable("ccps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nomeEstabelecimento: text("nome_estabelecimento").notNull(),
  cnpj: text("cnpj").notNull(),
  telefone: text("telefone"),
  email: text("email"),
  cep: text("cep"),
  endereco: text("endereco"),
  municipio: text("municipio"),
  estado: text("estado"),
});
