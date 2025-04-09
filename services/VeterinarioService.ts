import { DZSQLiteInsert, DZSQLiteSelect, DZSQLiteUpdate, DZSQLiteDelete } from "@/src/db/drizzlesqlite";
import { veterinariosTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { Veterinario } from "@/src/models/Veterinario";

export const VeterinarioService = {
  async listarPorCcps(ccpsId: number): Promise<Veterinario[]> {
    const todos = await DZSQLiteSelect<Veterinario>(veterinariosTable);
    console.log("Todos os veterinários:", todos);
    console.log("ccpsId (filtro):", ccpsId, typeof ccpsId);
    console.log("todos[0].ccpsId:", todos[0]?.ccpsId, typeof todos[0]?.ccpsId);
    return todos.filter(v => Number( v.ccpsId === ccpsId));
  },
  

  async salvar(v: Omit<Veterinario, "id">) {
    console.log("Dados que vão ser inseridos:", v);
    try {
      console.log("Veterinário service " + v.crmv);
      await DZSQLiteInsert(veterinariosTable, v);
      console.log("Veterinário inserido com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir veterinário:", error);
    }
  },

  async atualizar(v: Veterinario) {
    await DZSQLiteUpdate(veterinariosTable, {
      set: {
        nome: v.nome,
        crmv: v.crmv,
        estado: v.estado,
        fotoUrl: v.fotoUrl,
        ccpsId: v.ccpsId,
      },
      where: eq(veterinariosTable.id, v.id!),
    });
  },

  async remover(id: number) {
    await DZSQLiteDelete(veterinariosTable, {
      where: eq(veterinariosTable.id, id)
    });
  }
};
