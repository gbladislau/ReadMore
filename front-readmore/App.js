import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { HomeStack } from './navigation/Stack';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] =  useFonts({
        'Manjari-Bold': require('./assets/fonts/Manjari-Bold.ttf'),
        'Manjari-regular': require('./assets/fonts/Manjari-Regular.ttf'),
        'Manjari-Thin': require('./assets/fonts/Manjari-Thin.ttf'),
    })
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
}
