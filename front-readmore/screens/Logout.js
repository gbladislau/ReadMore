import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

/**
 * SCREEN DE LOGOUT
 * @returns PÁGINA LOGOUT
 */
export default function Logout() {
    /**
     * Remove o acesso do usuário ao aplicativo e executa o logout na conta
     */
    try{
        AsyncStorage.removeItem('acess_token');
    }
    catch(erro){
        console.log(erro)
    }
    navigator = useNavigation();
    navigator.navigate('Home');
    return(<View>{}</View>);
}