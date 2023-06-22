import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import{Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function UserHomeScreen() {
  const navigation = useNavigation()
  return (
    <View>
        
    </View>
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