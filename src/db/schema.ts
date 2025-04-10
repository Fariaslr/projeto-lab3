import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "ccps.db";

export const ccpsTable = sqliteTable("ccps", {
  id: text("id").primaryKey().notNull(),
  nomeEstabelecimento: text("nome_estabelecimento").notNull(),
  cnpj: text("cnpj").notNull(),
  telefone: text("telefone"),
  email: text("email"),
  cep: text("cep"),
  endereco: text("endereco"),
  municipio: text("municipio"),
  estado: text("estado"),
});

export const veterinariosTable = sqliteTable("veterinarios", {
  id: text("id").primaryKey().notNull(), 
  nome: text("nome").notNull(),
  crmv: text("crmv").notNull(),
  fotoUrl: text("fotoUrl"),
  ccpsId: text("ccpsId").notNull(),
});
