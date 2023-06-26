import { useNavigation } from '@react-navigation/native';
import{ StyleSheet, View ,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';


const Wwidth = Dimensions.get('window').width;
const marginLeftvar = ((Wwidth - ((Wwidth)*0.92))/2);

export default function UserHomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.background}>
        <TopBar title={"Página Inicial"}/>
        <View style = {styles.retanguloContainer}>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070558',
    flex:1,
  },

  retanguloContainer:{
    width: '92%',
    height: '90%',
    borderWidth:3,
    borderColor:'#2938C4',
    borderRadius: 25,
    marginLeft:marginLeftvar,
    marginRight: marginLeftvar,
    backgroundColor: "#D9D9D9",
  }
});