import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import FlatListVeterinarios from "@/components/VeterinarioFlatList";
import { Veterinario } from "@/src/models/Veterinario";
import { VeterinarioService } from "@/services/VeterinarioService";
import VeterinarioModal from "@/components/VeterinarioModal";
import * as SecureStore from "expo-secure-store";

export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [veterinarioSelecionado, setVeterinarioSelecionado] = useState<Veterinario | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [ccpsId, setCcpsId] = useState<number | null>(null);

  // Função para atualizar a lista de veterinários
  const atualizarLista = async () => {
    if (ccpsId !== null) {
      const dados = await VeterinarioService.listarPorCcps(ccpsId);
      setVeterinarios(dados);
    }
  };

  useEffect(() => {
    const carregarCcpsId = async () => {
      const usuarioJson = await SecureStore.getItemAsync("usuario");
      if (usuarioJson) {
        const usuario = JSON.parse(usuarioJson);
        setCcpsId(usuario.id);
      }
    };
    carregarCcpsId();
  }, []);

  useEffect(() => {
    if (ccpsId !== null) {
      atualizarLista();
    }
  }, [ccpsId]);

  const abrirModalParaAdicionar = () => {
    setVeterinarioSelecionado(null);
    setModalVisivel(true);
  };

  const abrirModalParaEditar = (v: Veterinario) => {
    setVeterinarioSelecionado(v);
    setModalVisivel(true);
  };

  const salvarNovoVeterinario = async (v: Omit<Veterinario, "id">) => {
    if (ccpsId === null) return;
    await VeterinarioService.salvar({ ...v, ccpsId });
    atualizarLista();
  };

  const atualizarVeterinario = async (v: Veterinario) => {
    await VeterinarioService.atualizar(v);
    atualizarLista();
  };

  const removerVeterinario = async (id: number) => {
    if (ccpsId === null) return;
    await VeterinarioService.remover(id);
    atualizarLista();
  };

  // Mostrar carregando enquanto os dados são obtidos
  if (ccpsId === null || veterinarios.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

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
        onSalvar={salvarNovoVeterinario}
        onAtualizar={atualizarVeterinario}
        veterinarioSelecionado={veterinarioSelecionado}
      />

      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={abrirModalParaAdicionar}
      >
        <Text style={styles.icone}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
  }
});
