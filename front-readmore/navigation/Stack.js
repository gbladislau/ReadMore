import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginPage from '../screens/LoginPage';
import Registration from '../screens/Registration';
import UserHomeScreen from '../screens/UserHomeScreen';
import { MainDrawer } from './Drawer';
import SearchResults from '../screens/SearchResults';
import BookPage from '../screens/BookPage';


const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="UserHome" component={MainDrawer} />
      {/* <Stack.Screen name="Settings" component={Settings} />*/}
    </Stack.Navigator>
  );
}