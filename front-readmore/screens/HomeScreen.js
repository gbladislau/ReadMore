
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import{Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
    <LinearGradient //Gradiente ou Degradê de Azul
      colors={['#4ADEDE', '#2938C4']}
      style={styles.background}
    />
      <View style={styles.titleRectangle} 
        //Título do APP, mudar depois para logo
      >
        <Text style={styles.titleText}>READ MORE</Text>
      </View>

      <View style={styles.btn_div}>
        <Button title='Já Possuo Cadastro' style={styles.button} onPress={()=> navigation.navigate('Login')}/>
      </View>
        
      <View>
        <Button title='Fazer meu Cadastro' style={styles.button} onPress={()=> navigation.navigate('Registration')}/>
      </View>

      <StatusBar style='auto'/>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  titleRectangle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 82,
    top: 60,
    backgroundColor: '#2938C4',
    borderRadius: 99,
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