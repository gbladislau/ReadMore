import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import{Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';

export default function UserHomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.background}>
        <TopBar title={"Página Inicial"}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070558',
    flex:1,
  },

  paginaInicialBarra:{
    backgroundColor:'#2938C4',
    marginTop:50,
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
  titleText: {
    position: 'absolute',

    //fontFamily: 'Manjari',
    fontStyle: 'normal',
    fontSize: 48,

    color: 'white',
  },

  btn_div:{
    
    alignItems: 'center',
    justifyContent: 'center',
    padding:44,
    

  },

  button:{
    width: 285,
    height: 47,
    left: 44,
    top: 350, 
    borderRadius: 30,
    position: 'absolute',
    alignContent:'center',
    alignSelf:'auto',
  
  }


});