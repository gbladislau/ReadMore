import { useNavigation } from '@react-navigation/native';

export default function Logout() {
    localStorage.removeItem('token');
    navigator = useNavigation();
    navigator.navigate('HomeScreen');
    return;
}