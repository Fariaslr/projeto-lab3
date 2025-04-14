import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { selectCcps } from "@/src/db/dbInit";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const startApp = async () => {
      const lista = await selectCcps();
      console.log("Lista de CCPS:", lista);

      const usuarioLogado = await SecureStore.getItemAsync("usuario");
      if (usuarioLogado) {
        router.replace("/(home)");
      } else {
        router.replace("/LoginScreen");
      }
    };

    startApp();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
