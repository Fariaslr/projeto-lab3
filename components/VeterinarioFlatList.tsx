import { FlatList, View, Text, Button, StyleSheet, Image } from "react-native";
import { Veterinario } from "@/src/models/Veterinario";

type Props = {
  veterinarios: Veterinario[];
  onRemover: (id: string) => void;
  onEditar: (veterinario: Veterinario) => void;
};


export default function FlatListVeterinarios({
  veterinarios,
  onRemover,
  onEditar,
}: Props) {
  return (
    <FlatList
      data={veterinarios}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}> 
          <View style={styles.header}>
            <Image
              source={{
                uri: item.fotoUrl || "https://via.placeholder.com/60",
              }}
              style={styles.imagem}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>
                {item.id} - {item.crmv}
              </Text>
            </View>
          </View>
          <View style={styles.botoes}>
            <Button title="Editar" onPress={() => onEditar(item)} />
            <Button title="Excluir" onPress={() => onRemover(item.id)} />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    marginBottom: 12,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
