import { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import InputBox from "../components/InputBox";

/**
 * SCREEN DE CADASTRO DE USUÁRIO
 * @returns REGISTRATION SCREEN
 */
export default function Registration() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estabelecendo parametros para request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    };

    const postCadastro = async () => {
        const url_post = `/api/register/`
        try {
            var response = await fetch(url_post, requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para ${ url_post } HTTP ${response.status}`);
                var responseJSON
                try { responseJSON = await response.json(); }
                catch (erro) { 
                    console.log(erro);
                }
                Alert.alert("Usuário Criado com Sucesso!");
                navigation.navigate("Login");
            }
            else {
                console.log(`Falha na requisição ${requestOptions["method"]} para ${ url_post } HTTP ${response.status}`)
                Alert.alert("Este email já possui uma conta atrelada")
            }

        }
        catch (erro) {
            console.log(`Erro no ${requestOptions["method"]} em ${ url_post } body:${requestOptions['body']}`)
            Alert.alert("Erro de Rede, verifique sua conexão com a internet")
            console.log(erro);
        }
    }

    return (
        <SafeAreaView style={styles.container_dft}>

            <View style={styles.cadastroRetangulo}>
                <Text style={styles.cadatroText}>Novo Cadastro</Text>
            </View>
            <View style={styles.retanguloContainer}>
                <InputBox inputName="Username" inputSet={setUsername} secureTextEntry={false} />

                <InputBox inputName="Email" inputSet={setEmail} secureTextEntry={false} />

                <InputBox inputName="Password" inputSet={setPassword} secureTextEntry={true} />

                <InputBox inputName="Confirm Password" inputSet={setConfirmPassword} secureTextEntry={true} />

                <TouchableOpacity style={styles.loginBtn} onPress={postCadastro}>
                    <Text style={styles.loginText}>Fazer Cadastro</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    cadatroText: {

        position: 'absolute',
        fontFamily: 'Manjari-Bold',
        fontStyle: 'normal',
        fontSize: 32,
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
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 90,
        backgroundColor: "#2938C4",
    },

    loginText: {
        position: 'absolute',

        fontFamily: 'Manjari-regular',
        fontStyle: 'normal',
        fontSize: 20,
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

})