import { useNavigation } from '@react-navigation/native';
import{ StyleSheet, View ,Dimensions} from 'react-native';

const Wwidth = Dimensions.get('window').width;
const marginLeftvar = ((Wwidth - ((Wwidth)*0.92))/2);
/**
 * Retorna a caixa central do aplicativo
 */
export default function CentralBox() {
  const navigation = useNavigation()
  return (
    <View style = {styles.retanguloContainer}/>
  );
}

const styles = StyleSheet.create({
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