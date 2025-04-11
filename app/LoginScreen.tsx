import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { CcpsService } from "@/services/CcpsService";
import * as SecureStore from "expo-secure-store"; 
import { MaskedTextInput } from "react-native-mask-text";

export default function LoginScreen() {
    const [password, setPassword] = useState("");
    const [cnpj, setCnpj] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        // Remove qualquer caractere não numérico do CNPJ (normalização)
        const cnpjNormalizado = cnpj.replace(/\D/g, "");

        const usuario = await CcpsService.autenticar(cnpjNormalizado, password); 
        if (usuario) {
            await SecureStore.setItemAsync("usuario", JSON.stringify(usuario));
            router.replace("/(home)");
        } else {
            alert("CNPJ ou senha inválidos!");
        }
    };

    return (
        <View style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    }}
                />
                <Text style={styles.title}>CCPS</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>CNPJ</Text>
                    <MaskedTextInput
                        mask="99.999.999/9999-99"
                        style={styles.input}
                        placeholder="12.345.678/1234-01"
                        keyboardType="numeric"
                        value={cnpj}
                        onChangeText={setCnpj}
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => router.push("/RegisterScreen")}
                    >
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#4CAF50"
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
        textAlign: "center",
    },
    formContainer: {
        width: "100%",
        maxWidth: 350,
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#555",
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
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    secondaryButton: {
        backgroundColor: "#6c757d",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});
