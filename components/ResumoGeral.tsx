import { View, Text, StyleSheet } from "react-native";

export default function ResumoGeral({ dados }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📊 Resumo Geral</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.valor}>{dados.documentosEnviados}/5</Text>
          <Text style={styles.label}>Documentos Enviados</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.valor}>{dados.veterinarios}</Text>
          <Text style={styles.label}>Veterinários</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.valor}>{dados.status}</Text>
          <Text style={styles.label}>Status</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.valor}>{dados.ultimaAtualizacao}</Text>
          <Text style={styles.label}>Última Atualização</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    width: "47%",
    alignItems: "center",
  },
  valor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  label: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 4,
  },
});
