import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import InputBox from "../components/InputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "@env"

/**
 *  Pagina onde faz o login do usuário, aqui usamos componentes 
 *  criados para manter o reuso e pedimos ao BACKEND credenciais
 *  caso retorne tudo ok ele segue com o login, caso contrario mandamos
 *  repetir a senha.
 * @returns PAGINA DE LOGIN
 */
export default function LoginPage() {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    /**
     * Faz o request do dados do usuário para o login
     */
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    /**
     * Faz o post da autenticação do usuário e o login no aplicativo
     */
    const postLogin = async () => {
        const url_post = API_URL+`/api/login/`
        try {
            //navigation.navigate("UserHome");
            var response = await fetch(url_post, requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para ${url_post} HTTP ${response.status}`);
                var responseJSON
                try {
                    responseJSON = await response.json();
                    await AsyncStorage.setItem("access_token", JSON.stringify(responseJSON.access))
                    navigation.navigate("UserHome");

                }
                catch (erro) {
                    console.log(erro)
                    Alert.alert("Erro interno, tente novamente")
                }
            }
            else {
                console.log(`Falha na requisição ${requestOptions["method"]} para ${url_post} HTTP ${response.status}`);
                Alert.alert("Email ou senha incorretos, tente novamente")
            }

        }
        catch (erro) {
            console.log(`Erro no ${requestOptions["method"]} em ${url_post} body:${requestOptions['body']}`)
            console.log(erro);
            Alert.alert("Erro de Rede, verifique sua conexão com a internet")
        }
    }

    /**
     * Faz a alteração da senha do usuário
     */
    const handleResetPassword = async () => {
        const url = API_URL + `/api/reset_password/`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                new_password: newPassword,
            }),
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para ${url} HTTP ${response.status}`);
                Alert.alert("Senha alterada com sucesso!");
                setModalVisible(false);
            } else {
                console.log(`Falha na requisição ${requestOptions["method"]} para ${url} HTTP ${response.status}`);
                Alert.alert("Ocorreu um erro ao alterar a senha. Verifique suas informações e tente novamente.");
            }
        } catch (error) {
            console.log(`Erro no ${requestOptions["method"]} em ${url}`);
            console.log(error);
            Alert.alert("Erro de Rede, verifique sua conexão com a internet");
        }
    };


    return (
        <SafeAreaView style={styles.container_dft}>
            <View style={styles.cadastroRetangulo}>
                <Text style={styles.cadatroText}>Login</Text>
            </View>
            <View style={styles.retanguloContainer}>

                <InputBox inputName="Email" inputSet={setEmail} secureTextEntry={false} />

                <InputBox inputName="Password" inputSet={setPassword} secureTextEntry={true} />

                <TouchableOpacity style={styles.loginBtn} onPress={postLogin}>
                    <Text style={styles.loginText}>Fazer Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoEsqueci} onPress={() => setModalVisible(true)}>
                    <Text style={styles.esqueciText}>esqueci minha senha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoEsqueci} onPress={() =>  navigation.navigate("UserHome")}>
                    <Text style={styles.esqueciText}>entrar como convidado</Text>
                </TouchableOpacity>

            </View>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Esqueci minha senha</Text>
                        <View style={{flexDirection:'column'}}>
                        <InputBox inputName="Username" inputSet={setUsername} secureTextEntry={false} />
                        <InputBox inputName="Email" inputSet={setEmail} secureTextEntry={false} />
                        <InputBox inputName="Nova Senha" inputSet={setNewPassword} secureTextEntry={true} />
                        </View>
                        <TouchableOpacity style={styles.modalButton} onPress={handleResetPassword}>
                            <Text style={styles.modalButtonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

/**
 * lista de estilos específicos usado na criação da página
 */
const styles = StyleSheet.create({

    cadatroText: {

        position: 'relative',
        fontFamily: 'Manjari-Bold',
        fontSize: 52,
        color: 'white',

    },

    container_dft: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        flex: 1,
    },

    inputView: {
        backgroundColor: "#4ADEDE",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },

    loginBtn:
    {
        width: "80%",
        borderRadius: 25,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
        backgroundColor: "#2938C4",
    },
    botaoEsqueci:
    {
        width: '70%',
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#6495ED",
    },
    cadastroRetangulo:
    {
        width: "90%",
        borderRadius: 30,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70,
        backgroundColor: "#2938C4",
    },

    loginText: {
        position: 'absolute',
        display:'flex',
        fontFamily: 'Manjari-regular',
        fontStyle: 'normal',
        fontSize: 20,
        color: 'white',

    },
    esqueciText: {
        position: 'absolute',
        display:'flex',
        fontFamily: 'Manjari-regular',
        fontStyle: 'normal',
        fontSize: 16,
        color: 'white',

    },
    retanguloContainer: {
        width: '92%',
        height: 'auto',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
        alignSelf: 'center',
        alignContent:'space-around',
        alignItems:'center',
        padding:30
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#2938C4',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
