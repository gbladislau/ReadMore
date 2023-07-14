import { createDrawerNavigator } from '@react-navigation/drawer';
import Bookshelf from '../screens/Bookshelf';
import { SearchStack } from './SearchStack';
import Logout from '../screens/Logout';
import { UserStack } from './UserStack';


const Drawer = createDrawerNavigator();
/**
 * Retorna a barra lateral com os componentes de navegação
 */
export const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

      }}>
      <Drawer.Screen name="Minha Estante" component={UserStack} />
      <Drawer.Screen name="Explorar Livros" component={SearchStack} />
      <Drawer.Screen name="Logout" component={Logout}/>
    </Drawer.Navigator>

  );
}
