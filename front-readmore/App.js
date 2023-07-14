import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { HomeStack } from './navigation/Stack';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [fontsLoaded] =  useFonts({
        'Manjari-Bold': require('./assets/fonts/Manjari-Bold.ttf'),
        'Manjari-regular': require('./assets/fonts/Manjari-Regular.ttf'),
        'Manjari-Thin': require('./assets/fonts/Manjari-Thin.ttf'),
    })
    useEffect(() => {
        if(fontsLoaded)
            setLoading(false)
    }, [fontsLoaded]);
    return (
        <NavigationContainer>
            {loading ? <ActivityIndicator/> : <HomeStack/>}
        </NavigationContainer>
    );
}
