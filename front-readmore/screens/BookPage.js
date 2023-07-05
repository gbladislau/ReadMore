import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Touchable, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequestWithToken } from '../api_man/ApiManager';

/**
 * Pagina de livro, recebe parametros pelo route e cria pagina com eles
 * @param {Array} param0 
 * @returns 
 */
export default function BookPage({ route, navigator }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState({});

    var bookData = route.params.bookData;
    const fetchBookData = async () => {
        console.log('Busca + dados sobre o livro ');
        console.log(bookData['key']);


        const url_ = `https://openlibrary.org${bookData['key']}.json`;
        try {
            setLoading(true)
            var response = await fetch(url_);
            if (response.ok) {
                console.log(`Sucesso na requisição GET para ${url_} HTTP ${response.status}`);

                try {
                    var responseJSON = await response.json();
                    setSearchResults(responseJSON);
                    console.log(JSON.stringify(responseJSON))
                }
                catch (e) {
                    console.log(e)
                    setLoading(false);
                }
            }
            else {
                console.log(`Falha na requisição GET para ${url_} HTTP ${response.status}`);
            }
            setLoading(false);
        }
        catch (erro) {
            console.log(`Erro no GET em ${url_}`);
            console.log(erro);
            setLoading(false);
            Alert.alert("Verifique sua conexão com a internet!");
        }
    }

    useEffect(() => {
        fetchBookData();
    }, []);

    var pageNumber = <View></View>;

    useEffect(() => {
        var pgnum = -1;

        searchResults['excerpts'].find(item => {
            if ('pages' in item) {
                pgnum = item.pages;
            }
        });

        if (pgnum != -1)
            pageNumber = <Text style={{ fontFamily: 'Manjari-Bold' }}>Número de Páginas:{pgnum}</Text>;
            
    }, [setSearchResults])

    if ('cover_i' in bookData) {
        var coverJSX = <View style={styles.image}></View>;
        coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['cover_i']}-L.jpg` }}
            style={styles.image}
            resizeMethod='auto'
            resizeMode='contain' />;
    }

    const titleName = bookData['title']
    const authorName = bookData['author_name']

    var lerOuVoltarALer = 'Adicionar na Minha Estante';
    try {
        var apiData = apiRequestWithToken('198.162.0.5:8000');
        // if (apiData) {
        //     lerOuVoltarALer = 'Adicionar Marcação';
        //     apiData
        // }
    }
    catch (erro) {
        console.log(erro);
    }


    return (
        <SafeAreaView style={styles.background}>
            <View style={{ width: 'auto', height: 'auto', alignItems: 'center' }}>
                <View style={styles.retanguloContainer}>
                    <ScrollView>
                        <View style={{ flex: 1, width: 'auto', height: 'auto', flexShrink: 0, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={navigation.openDrawer}>
                                <Image style={styles.imagemMenu} source={require('../assets/menu2.png')} />
                            </TouchableOpacity>
                            <Text style={styles.titleText}>{titleName}</Text>
                        </View>
                        <View style={{ flex: 1, width: 'auto', height: 'auto', flexShrink: 0, flexDirection: 'row' }}>

                            {coverJSX}
                            <View style={styles.lateralContainer}>
                                {pageNumber}
                                <TouchableOpacity style={styles.botaoLerOpacity}>
                                    <Text style={styles.button}>{lerOuVoltarALer}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    image: {
        marginLeft: 6,
        borderRadius: 9,
        borderWidth: 3,
        borderColor: 'black',
        width: '50%',
        height: 300,
    },
    imagemMenu: {
        marginLeft: 17,
        marginRight: 10,
        marginTop: 10
    },
    lateralContainer: {
        padding: 3,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 20,
        marginLeft: 6,
        marginRight: 6,

    },
    botaoLerOpacity:
    {

        margin: 10,
        width: "90%",
        borderRadius: 25,
        height: 'auto',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2938C4"
    },
    button: {
        textAlignVertical: 'top',
        alignSelf: 'center',
        fontFamily: 'Manjari-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        color: 'white',
        top: 3,
        padding: 3,
        margin: 3

    },
    retanguloContainer: {
        width: '92%',
        height: '98%',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
    },
    titleText: {
        display: 'flex',
        width: '70%',
        height: 'auto',
        fontSize: 26,
        marginTop: 10,
        marginBottom: 6,
        marginLeft: 'auto',
        fontFamily: 'Manjari-regular',
    },
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },
})
