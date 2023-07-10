import { createStackNavigator } from '@react-navigation/stack';
import BookPage from '../screens/BookPage';
import AuthorPage from '../screens/AuthorPage';
import Bookshelf from '../screens/Bookshelf';

const Stack = createStackNavigator();

export const UserStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
  
        <Stack.Screen name="Estante" component={Bookshelf} />
        <Stack.Screen name="BookPage" component={BookPage}/>
        <Stack.Screen name="AuthorPage" component={AuthorPage}/>
  
      </Stack.Navigator>
    );
  }