import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

/**
 * SCREEN DE PESQUISA DE LIVROS
 * @returns PAGINA DE PESQUISA
 */


function SearchPage() {
    const navigator = useNavigation();
    const [searchKey, setsearchKey] = useState('');
    const [isChecked, setChecked] = useState(false);


    return (
        <SafeAreaView style={styles.background}>
            <TopBar title={"Explorar"} />
            <View style={styles.retanguloContainer}>
                <TextInput style={styles.caixaDePesquisa}
                    placeholder='Pesquisa'
                    placeholderTextColor={'grey'}
                    cursorColor='black'
                    onChangeText={(input) => setsearchKey(input)}
                />
                <View style={styles.barraDePesquisa}>

                    <LinearGradient //Gradiente ou Degradê de Azul
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        colors={['#4ADEDE', '#2938C4']}
                        style={{ flex: 1, borderRadius: 25, zIndex: 0 }}
                    />

                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {/* <Text style={styles.titleBio}>Livro/Autor</Text>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    /> */}
                </View>
                <TouchableOpacity style={styles.imagem}
                    onPress={() => {
                        if (searchKey == '') { Alert.alert('Caixa de pesquisa vazia!', "Insira algo para pesquisar") }
                        else { navigator.navigate('SearchResults', { searchKey: searchKey }) }
                    }
                    }>
                    <Image source={require('../assets/search.png')} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}
/**
 * lista de estilos específicos usado na criação da página
 */
const Wwidth = Dimensions.get('window').width;
const marginLeftvar = ((Wwidth - ((Wwidth) * 0.92)) / 2);

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },

    caixaDePesquisa: {
        width: '72%',
        height: 46,
        marginTop: 12,
        marginRight: 30,
        left: 36,
        position: 'absolute',
        zIndex: 1,
        fontSize: 20,
        fontFamily: 'Manjari-Bold'
    },

    barraDePesquisa: {
        width: '90%',
        height: 46,
        marginTop: 10,
        borderRadius: 25,
    },

    imagem: {
        position: 'absolute',
        marginTop: 20,
        right: 40,
        zIndex: 2
    },

    retanguloContainer: {
        width: '92%',
        height: '90%',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        marginLeft: marginLeftvar,
        marginRight: marginLeftvar,
        backgroundColor: "#D9D9D9",
        alignItems: 'center',
        flexShrink: 0,
    },
})

export default SearchPage;
