import { createDrawerNavigator } from '@react-navigation/drawer';
import UserHomeScreen from '../screens/UserHomeScreen';
import SearchBooks from '../screens/SearchBooks';
import { NavigationContainer } from '@react-navigation/native';
import Bookshelf from '../screens/Bookshelf';


const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

      }}>
      <Drawer.Screen name="Página Inicial" component={UserHomeScreen} />
      <Drawer.Screen name="Explorar Livros" component={SearchBooks} />
      <Drawer.Screen name="Minha Estante" component={Bookshelf} />
    </Drawer.Navigator>

  );
}
