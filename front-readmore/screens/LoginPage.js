import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import InputBox from "../components/InputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *  Pagina onde faz o login do usuário, aqui usamos componentes 
 *  criados para manter o reuso e pedimos ao BACKEND credenciais
 *  caso retorne tudo ok ele segue com o login, caso contrario mandamos
 *  repetir a senha.
 * @returns Pagina de Login (COMPONENTE)
 */
export default function LoginPage() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    const postLogin = async () => {
        const url_post = 'http://192.168.0.5:8000/api/login/'
        try {
            navigation.navigate("UserHome");


            var response = await fetch(url_post, requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para ${url_post} HTTP ${response.status}`);
                var responseJSON
                try { 
                    responseJSON = await response.json(); 
                    console.log(JSON.stringify(responseJSON));
                    AsyncStorage.setItem("acess_token:", JSON.stringify(responseJSON.access))
                    console.log(JSON.stringify(responseJSON.access))
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

    return (
        <SafeAreaView style={styles.container_dft}>

            <View style={styles.cadastroRetangulo}>
                <Text style={styles.cadatroText}>Login</Text>
            </View>

            <InputBox inputName="Email" inputSet={setEmail} secureTextEntry={false} />

            <InputBox inputName="Password" inputSet={setPassword} secureTextEntry={true} />

            <TouchableOpacity style={styles.loginBtn} onPress={postLogin}>
                <Text style={styles.loginText}>Fazer Login</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}


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

        fontFamily: 'Manjari-regular',
        fontStyle: 'normal',
        fontSize: 20,
        color: 'white',

    }
})
