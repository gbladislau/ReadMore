import { useNavigation } from '@react-navigation/native';
import{Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TopBar( {title}) {
  const navigation = useNavigation()
  return (
        <View style={styles.paginaInicialBarra}>
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Image style={styles.imagem} source={require('../assets/menu.png')} />
          </TouchableOpacity>
          
          <Text style={styles.textTitle}>{title}</Text>
        </View>
  );
}

const styles = StyleSheet.create({

  paginaInicialBarra:{
    backgroundColor:'#2938C4',
    marginBottom:10,
    marginRight:-30,
    width:276,
    height:60,
    flexShrink:0,
    borderTopRightRadius: 33,
    borderBottomRightRadius:33,
    justifyContent: 'space-evenly',
    flexDirection:'row',
  },

  textTitle: {
    color:'white',
    fontSize:29,
    margin:10,
    marginRight:20,
    fontFamily: 'Manjari-regular',
    fontStyle: 'normal',
  },
  imagem:{
    marginLeft:10,
    marginTop:10
  },
});