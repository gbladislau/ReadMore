import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';

function Bookshelf() {

    return (
        <SafeAreaView style={styles.background}>
            <TopBar title={"Minha Estante"}/>
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
})

export default Bookshelf;
