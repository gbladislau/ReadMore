
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native'
import { HomeStack } from './navigation/stack';
import { StrictMode } from 'react';

export default function App() {

    return(
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>

    );
}
