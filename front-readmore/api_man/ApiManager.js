import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { API_URL } from "@env";

/**
 * Faz a requisição para a API REST django de dados do usuário usando o token
 * @param {string} uri 
 */
export const apiRequestWithToken = async (uri,set) => {
    var destino = concat(API_URL,uri)
    var TOKEN = await AsyncStorage.getItem('access_token');

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + TOKEN.replace(/"/g, '') },
    };

    try {
        var response = await fetch(destino, requestOptions);
        if (response.ok) {
            console.log(`Sucesso na requisição ${requestOptions["method"]} para ${uri} HTTP ${response.status}`);
            var responseJSON
            try { responseJSON = await response.json(); }
            catch (erro) {
                console.log(erro);
            }
            set( responseJSON);
            //console.log(responseJSON);
        }
        else {
            console.log(`Falha na requisição ${requestOptions["method"]} para ${uri} HTTP ${response.status}`)
            Alert.alert("Erro interno tente novamente")
        }

    }
    catch (erro) {
        console.log(`Erro no ${requestOptions["method"]} em ${uri}`)
        Alert.alert("Erro de Rede, verifique sua conexão com a internet")
        console.log(erro);
    }
}

export const apiPost = async (uri,data,set) => {
    var destino = concat(API_URL,uri);
    console.log(destino);

    var TOKEN = await AsyncStorage.getItem('access_token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TOKEN.replace(/"/g, '')
        },
        body: data,
    };
    
    try {
        var response = await fetch(destino, requestOptions);
        if (response.ok) {
            console.log(`Sucesso na requisição ${requestOptions["method"]} para ${uri} HTTP ${response.status}`);
            var responseJSON
            try { responseJSON = await response.json(); }
            catch (erro) {
                console.log(erro);
            }
            console.log(responseJSON);
            set(responseJSON);
        }
        else {
            console.log(`Falha na requisição ${requestOptions["method"]} para ${uri} HTTP ${response.status}`)
            Alert.alert("Erro interno tente novamente")
        }

    }
    catch (erro) {
        console.log(`Erro no ${requestOptions["method"]} em ${destino}`)
        console.log(destino);

        console.log(API_URL);
        Alert.alert("Erro de Rede, verifique sua conexão com a internet")
        console.log(erro);
    }
}