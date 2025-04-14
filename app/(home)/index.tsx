import ResumoGeral from "@/components/ResumoGeral";
import DashboardService from "@/services/DashboardService";
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View
} from "react-native";
import * as SecureStore from "expo-secure-store";

const HomeScreen = () => {
  const [greeting, setGreeting] = useState("");
  const [quantidadeVeterinarios, setQuantidadeVeterinarios] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [ccpsId, setCcpsId] = useState<number | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const usuarioJson = await SecureStore.getItemAsync("usuario");
        if (usuarioJson) {
          const usuario = JSON.parse(usuarioJson);
          setCcpsId(usuario.id); // Define o ccpsId com base no usuário
          const total = await DashboardService.contarVeterinarios(usuario.id);
          setQuantidadeVeterinarios(total);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário ou veterinários:", error);
      } finally {
        setCarregando(false);
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  if (carregando || ccpsId === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.greeting}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.greeting}>
          {greeting} 👋
        </Text>
        <ResumoGeral
          dados={{
            documentosEnviados: 3,
            veterinarios: quantidadeVeterinarios,
            status: "Em Análise",
            ultimaAtualizacao: "09/04/2025"
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  inner: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  username: {
    fontWeight: "bold",
    color: "#007bff",
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default HomeScreen;