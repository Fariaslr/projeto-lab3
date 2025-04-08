import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import FlatListVeterinarios from "@/components/VeterinarioFlatList";
import { Veterinario } from "@/models/Veterinario";
import { VeterinarioService } from "@/services/VeterinarioService";
import VeterinarioModal from "@/components/VeterinarioModal";

export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [veterinarioSelecionado, setVeterinarioSelecionado] = useState<Veterinario | null>(null); // <- aqui
  const [modalVisivel, setModalVisivel] = useState(false);
  const ccpsId = 1;

  const abrirModalParaAdicionar = () => {
    setVeterinarioSelecionado(null);
    setModalVisivel(true);
  };

  const abrirModalParaEditar = (v: Veterinario) => {
    setVeterinarioSelecionado(v);
    setModalVisivel(true);
  };

  const salvarVeterinario = (v: Veterinario) => {
    VeterinarioService.salvarOuAtualizar(v);
    setVeterinarios(VeterinarioService.listarPorCcps(ccpsId));
  };

  useEffect(() => {
    const dados = VeterinarioService.listarPorCcps(ccpsId);
    setVeterinarios(dados);
  }, []);

  const removerVeterinario = (id: number) => {
    VeterinarioService.remover(id);
    setVeterinarios(VeterinarioService.listarPorCcps(ccpsId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Equipe Técnica - Veterinários</Text>

      <FlatListVeterinarios
        veterinarios={veterinarios}
        onRemover={removerVeterinario}
        onEditar={abrirModalParaEditar}
      />

      <VeterinarioModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        onSalvar={salvarVeterinario}
        veterinarioSelecionado={veterinarioSelecionado}
      />

      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => setModalVisivel(true)}
      >
        <Text style={styles.icone}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  botaoFlutuante: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  icone: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

});
