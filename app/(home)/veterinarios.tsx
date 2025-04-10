import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import FlatListVeterinarios from "@/components/VeterinarioFlatList";
import { Veterinario } from "@/src/models/Veterinario";
import { VeterinarioService } from "@/services/VeterinarioService";
import VeterinarioModal from "@/components/VeterinarioModal";
import { dropDatabase, initializeDatabase } from "@/src/db/dbInit";


export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [veterinarioSelecionado, setVeterinarioSelecionado] = useState<Veterinario | null>(null); // <- aqui
  const [modalVisivel, setModalVisivel] = useState(false);
  const ccpsId = 1;

  useEffect(() => {
    const carregarVeterinarios = async () => {
      const dados = await VeterinarioService.listarPorCcps(ccpsId);
      setVeterinarios(dados);
    };

    carregarVeterinarios();
  }, []);

  const abrirModalParaAdicionar = () => {
    setVeterinarioSelecionado(null);
    setModalVisivel(true);
  };

  const abrirModalParaEditar = (v: Veterinario) => {
    setVeterinarioSelecionado(v);
    setModalVisivel(true);
  };  

  const salvarNovoVeterinario = async (v: Omit<Veterinario, "id">) => {
    await VeterinarioService.salvar(v);
    const atualizados = await VeterinarioService.listarPorCcps(ccpsId);
    setVeterinarios(atualizados);
  };
  
  const atualizarVeterinario = async (v: Veterinario) => {
    await VeterinarioService.atualizar(v);
    const atualizados = await VeterinarioService.listarPorCcps(ccpsId);
    setVeterinarios(atualizados);
  };
  

  const removerVeterinario = async (id: number) => {
    await VeterinarioService.remover(id);
    const atualizados = await VeterinarioService.listarPorCcps(ccpsId);
    setVeterinarios(atualizados);
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
