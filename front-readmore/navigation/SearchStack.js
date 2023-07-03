import { createStackNavigator } from '@react-navigation/stack';
import SearchResults from '../screens/SearchResults';
import BookPage from '../screens/BookPage';
import SearchPage from '../screens/SearchPage';
import AuthorPage from '../screens/AuthorPage';

const Stack = createStackNavigator();

export const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>

      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="SearchResults" component={SearchResults}/>
      <Stack.Screen name="BookPage" component={BookPage}/>
      <Stack.Screen name="AuthorPage" component={AuthorPage}/>

    </Stack.Navigator>
  );
}