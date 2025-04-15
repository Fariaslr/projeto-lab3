import { Veterinario } from "@/src/models/Veterinario";
import { useEffect, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from "expo-image-picker";
import { generateUUID } from "@/src/utils/uuid";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSalvar: (veterinario: Omit<Veterinario, "id">) => void;
  onAtualizar: (veterinario: Veterinario) => void;
  veterinarioSelecionado?: Veterinario | null;
};

export default function VeterinarioModal({
  visible,
  onClose,
  onSalvar,
  veterinarioSelecionado,
  onAtualizar,
}: Props) {
  const [nome, setNome] = useState("");
  const [crmv, setCrmv] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [error, setError] = useState<{
    nome?: string;
    crmv?: string;
  }>({});

  const validateFields = () => {
    let errors: typeof error = {};
    if (!nome.trim()) errors.nome = "Nome do veterinário é obrigatório!";
    if (crmv.length < 7) errors.crmv = "CRMV inválido!";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (visible && veterinarioSelecionado) {
      setNome(veterinarioSelecionado.nome);
      setCrmv(veterinarioSelecionado.crmv);
      setFotoUrl(veterinarioSelecionado.fotoUrl ?? "");
      setError({});
    } else if (!visible) {
      setNome("");
      setCrmv("");
      setFotoUrl("");
      setError({});
    }
  }, [veterinarioSelecionado, visible]);

  const handleSalvar = async () => {
    if (!validateFields()) return;

    const novoVeterinario = {
      nome,
      crmv,
      fotoUrl,
      ccpsId: Number(veterinarioSelecionado?.ccpsId ?? 1),
    };
    
    if (veterinarioSelecionado?.id) {
      const comId: Veterinario = {
        ...novoVeterinario,
        id: veterinarioSelecionado.id,
      };
      onAtualizar(comId);
    } else {
      onSalvar(novoVeterinario);
    }

    onClose();
  };

  const escolherFonteImagem = () => {
    Alert.alert(
      "Selecionar Imagem",
      "Como deseja adicionar a imagem?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Tirar Foto", onPress: tirarFotoComCamera },
        { text: "Escolher da Galeria", onPress: escolherFotoGaleria },
      ]
    );
  };

  const tirarFotoComCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para usar a câmera foi negada!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoUrl(result.assets[0].uri);
    }
  };


  const escolherFotoGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria foi negada!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoUrl(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <TouchableOpacity onPress={escolherFonteImagem} style={styles.fotoContainer}>
            {fotoUrl ? (
              <Image source={{ uri: fotoUrl }} style={styles.imagemTopo} />
            ) : (
              <View style={[styles.imagemTopo, styles.placeholder]}>
                <Text style={styles.placeholderText}>Foto</Text>
              </View>
            )}
          </TouchableOpacity>


          <Text style={styles.label}>Nome do Veterinário</Text>
          <TextInput
            style={styles.input}
            placeholder="Marcos Cardoso..."
            value={nome}
            onChangeText={setNome}
          />
          {error.nome && <Text style={styles.error}>{error.nome}</Text>}

          <Text style={styles.label}>CRMV</Text>
          <MaskedTextInput
            mask="AA-99999"
            style={styles.input}
            placeholder="UF-12345"
            value={crmv}
            onChangeText={(text) => setCrmv(text.toUpperCase())}
          />
          {error.crmv && <Text style={styles.error}>{error.crmv}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
    marginBottom: 20
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  fotoContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  imagemTopo: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 60,
  },
  placeholder: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontWeight: "bold",
  }
});