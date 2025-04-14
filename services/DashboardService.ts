import { eq, count } from "drizzle-orm";
import { veterinariosTable } from "@/src/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "@/src/db/schema";

const db = drizzle(openDatabaseSync(DATABASE_NAME));

const DashboardService = {
  async contarVeterinarios(ccpsId: number): Promise<number> {
    const result = await db
      .select({ total: count() })
      .from(veterinariosTable)
      .where(eq(veterinariosTable.ccpsId, ccpsId))
      .all();

    return result?.[0]?.total ?? 0;
  },

};

export default DashboardService;
