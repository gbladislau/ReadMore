import 'react-native-gesture-handler';
import {createDraweNavigator} from '@react-navigation/drawer';

const Drawer = createDraweNavigator();

export default Drawer = () =>{
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );

}