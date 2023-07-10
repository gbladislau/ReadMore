import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.barraDePesquisa} >

                <LinearGradient
                    start={[0, 0]} // Início no meio superior
                    end={[1, 1]} // Fim no meio inferior
                    colors={['#4ADEDE', '#2938C4']}
                    style={{ flex: 1, borderRadius: 25, zIndex: 0 }}
                />

                <Text style={styles.titleText}>Read More</Text>
            </View>

            <View style={styles.retanguloContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Registration")}>
                    <Text style={styles.btnText}>Cadastro</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
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
        flex: 1,
    },

    retanguloContainer: {
        width: '92%',
        height: 'auto',
        marginTop: 100,
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'space-around',
        alignItems: 'center',
        padding: 30
    },

    titleRectangle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        height: 82,
        top: 60,
        backgroundColor: 'tranparent',
        borderRadius: 99,
    },
    barraDePesquisa: {
        width: '90%',
        height: 80,
        marginTop: 180,
        alignSelf: 'auto',
        borderRadius: 25,
    },

    titleText: {
        position: 'absolute',
        alignSelf: 'center',
        fontFamily: 'Manjari-Bold',
        fontStyle: 'italic',
        marginTop: 2,
        fontSize: 48,

        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    btn:
    {
        width: "80%",
        borderRadius: 25,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
        marginBottom: 6,
        backgroundColor: "#2938C4",
    },
    btnText: {
        position: 'absolute',
        display: 'flex',
        fontFamily: 'Manjari-regular',
        fontStyle: 'normal',
        fontSize: 20,
        color: 'white',

    },

});