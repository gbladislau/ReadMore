import { Alert } from "react-native";

/**
 * Faz a requisição para a API REST django de dados do usuário usando o token
 * @param {string} uri 
 */
export const apiRequestWithToken = async (uri) => {

    var TOKEN = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + TOKEN }
    };

    try {
        var response = await fetch(uri, requestOptions);
        if (response.ok) {
            console.log(`Sucesso na requisição ${requestOptions["method"]} para ${uri} HTTP ${response.status}`);
            var responseJSON
            try { responseJSON = await response.json(); }
            catch (erro) {
                console.log(erro);
            }
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