import {
  DZSQLiteInsert,
  DZSQLiteSelect,
  DZSQLiteUpdate,
  DZSQLiteDelete,
} from "@/src/db/drizzlesqlite";
import { ccpsTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { Ccps } from "@/src/models/Ccps";

export const CcpsService = {
  async listarTodos(): Promise<Ccps[]> {
    try {
      const ccps = await DZSQLiteSelect<Ccps>(ccpsTable);
      console.log("Todos os CCPS:", ccps);
      return ccps;
    } catch (error) {
      console.error("Erro ao listar CCPS:", error);
      return [];
    }
  },

  async autenticarPorCnpj(cnpj: string): Promise<Ccps | null> {
    try {
      const ccps = await DZSQLiteSelect<Ccps>(ccpsTable);
      const resultado = ccps.find((item) => item.cnpj === cnpj);
      console.log("Autenticação CCPS:", resultado);
      return resultado ?? null;
    } catch (error) {
      console.error("Erro ao autenticar CCPS:", error);
      return null;
    }
  },

  async salvar(ccps: Omit<Ccps, "id">) {
    try {
      console.log("Salvando CCPS:", ccps);
      await DZSQLiteInsert(ccpsTable, ccps);
      console.log("CCPS inserido com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir CCPS:", error);
    }
  },

  async atualizar(ccps: Ccps) {
    try {
      await DZSQLiteUpdate(ccpsTable, {
        set: {
          nomeCcps: ccps.nomeCcps,
          cnpj: ccps.cnpj,
          cep: ccps.cep,
          endereco: ccps.endereco,
          cidade: ccps.cidade,
          estado: ccps.estado,
          codigoAprovado: ccps.codigoAprovado,
          dataValidade: ccps.dataValidade,
          senha: ccps.senha,
        },
        where: eq(ccpsTable.id, ccps.id!),
      });
      console.log("CCPS atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar CCPS:", error);
    }
  },

  async remover(id: number) {
    try {
      await DZSQLiteDelete(ccpsTable, {
        where: eq(ccpsTable.id, id),
      });
      console.log("CCPS removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover CCPS:", error);
    }
  },

  async autenticar(cnpj: string, senha: string): Promise<Ccps | null> {
    try {
      const ccps = await DZSQLiteSelect<Ccps>(ccpsTable);
      const resultado = ccps.find(
        (item) => item.cnpj === cnpj && item.senha === senha
      );
      console.log("Resultado da autenticação:", resultado);
      return resultado ?? null;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      return null;
    }
  }
};
