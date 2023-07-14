import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

export default function Logout() {
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