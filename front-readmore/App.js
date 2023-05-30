import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
    return(
      <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.titleRectangle}>
            <Text style={styles.titleText}>READ MORE</Text>
          </SafeAreaView>
          <StatusBar style='auto'/>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleRectangle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 82,
    top: 60,
    backgroundColor:'#4577D8',
    borderRadius: 99,
  },

  titleText: {
    position: 'absolute',

    //fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 48,

    color: 'black',
  }
});
