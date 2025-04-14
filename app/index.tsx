// app/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const usuarioLogado = await SecureStore.getItemAsync("usuario");
      if (usuarioLogado) {
        router.replace("/(home)/index");
      } else {
        router.replace("/LoginScreen");
      }
    };

    verificarAutenticacao();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
