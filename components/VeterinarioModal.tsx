// components/VeterinarioModal.tsx
import { Veterinario } from "@/models/Veterinario";
import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet, Text } from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSalvar: (veterinario: Veterinario) => void;
    veterinarioSelecionado?: Veterinario | null;
};


export default function VeterinarioModal({
    visible,
    onClose,
    onSalvar,
    veterinarioSelecionado,
  }: Props) {
    const [nome, setNome] = useState("");
    const [crmv, setCrmv] = useState("");
    const [estado, setEstado] = useState("");
  
    useEffect(() => {
      if (veterinarioSelecionado) {
        setNome(veterinarioSelecionado.nome);
        setCrmv(veterinarioSelecionado.crmv);
        setEstado(veterinarioSelecionado.estado);
      } else {
        setNome("");
        setCrmv("");
        setEstado("");
      }
    }, [veterinarioSelecionado]);
  
    const handleSalvar = () => {
      const novoVeterinario: Veterinario = {
        id: veterinarioSelecionado?.id ?? Date.now(),
        nome,
        crmv,
        estado,
        ccpsId: 1,
        fotoUrl: veterinarioSelecionado?.fotoUrl,
      };
      onSalvar(novoVeterinario);
      onClose();
    };
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.titulo}>Adicionar Veterinário</Text>
                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="CRMV"
                        value={crmv}
                        onChangeText={setCrmv}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Estado"
                        value={estado}
                        onChangeText={setEstado}
                        style={styles.input}
                    />
                    <Button title="Salvar" onPress={handleSalvar} />
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
        borderBottomWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
});
