import { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import InputBox from "../components/InputBox";

export default function Registration() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        content: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    };

    const postCadastro = async () => {
        const url_post = 'http://192.168.0.5:8000/api/register/'
        try {
            var response = await fetch(url_post, requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para ${ url_post } HTTP ${response.status}`);
                var responseJSON
                try { responseJSON = await response.json(); }
                catch (erro) { }
                navigation.navigate("UserHome");
            }
            else {
                console.log(`Falha na requisição ${requestOptions["method"]} para ${ url_post } HTTP ${response.status}`);
            }

        }
        catch (erro) {
            console.log(`Erro no ${requestOptions["method"]} em ${ url_post } body:${requestOptions['body']}`)
            console.log(erro);
        }
    }

    return (
        <SafeAreaView style={styles.container_dft}>

            <View style={styles.cadastroRetangulo}>
                <Text style={styles.cadatroText}>Novo Cadastro</Text>
            </View>

            <InputBox inputName="Username" inputSet={setUsername} secureTextEntry={false} />

            <InputBox inputName="Email" inputSet={setEmail} secureTextEntry={false} />

            <InputBox inputName="Password" inputSet={setPassword} secureTextEntry={true} />

            <InputBox inputName="Confirm Password" inputSet={setConfirmPassword} secureTextEntry={true} />

            <TouchableOpacity style={styles.loginBtn} onPress={postCadastro}>
                <Text style={styles.loginText}>Fazer Cadastro</Text>
            </TouchableOpacity>

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

        //fontFamily: 'Manjari',
        fontStyle: 'normal',
        fontSize: 20,
        color: 'white',

    }
})