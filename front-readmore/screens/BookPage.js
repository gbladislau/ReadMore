import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native';
import { API_URL } from '@env';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequestWithToken } from '../api_man/ApiManager';
import SubjectsBox from '../components/SubjectsList';
import DescriptionBox from '../components/DescriptionBox';
import AuthorBox from '../components/AuthorBox';
import { apiPost } from '../api_man/ApiManager';
/**
 * Pagina de livro, recebe parametros pelo route e exibe pagina especifica 
 * para cada livro disponivel na api
 * @param {Array} param0 
 * @returns 
 */
export default function BookPage({ route }) {

    var bookData = route.params.bookData;
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState();

    const [authorBox, setauthorBox] = useState(<View />);
    const [pagesnum, setpagesnum] = useState(<Text style={styles.pagesText}>Número de páginas total indisponível</Text>);
    const [subList, setSubList] = useState(<View />);
    const [descriptionBox, setdescriptionBox] = useState(<View />);

    const [hasBook, setHasBook] = useState(false);
    const [lerOuVoltarALer, setLerOuVoltarALer] = useState("Adicionar a Minha Estante");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pagesRead, setPagesRead] = useState("");
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const [buttonAction, setbuttonAction] = useState();

    const bookKey = bookData['key'];
    const titleName = bookData['title'];
    const authorName = bookData['author_name'];

    /**
     * Busca mais dados sobre o livro
     */
    const fetchBookData = async () => {
        // console.log('Busca + dados sobre o livro ');
        // console.log(bookData['key']);
        const url_ = `https://openlibrary.org${bookData['key']}.json`;
        try {
            setLoading(true)
            var response = await fetch(url_);
            if (response.ok) {
                console.log(`Sucesso na requisição GET para ${url_} HTTP ${response.status}`);

                try {
                    var responseJSON = await response.json();
                    setSearchResults(responseJSON);
                    //console.log(JSON.stringify(responseJSON))
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

    /**
     * BUSCA O NUMERO DE PAGINAS DO LIVRO e SETA outros componentes
     * caixa de autor e caixa de generos e caixa de descrição
     */
    useEffect(() => {
        if (searchResults) {
            //console.log("\nUpdated searchResults:\n", searchResults);
            var pgnum = -1;

            if (searchResults['excerpts'] != null) {
                searchResults['excerpts'].map(item => {
                    // console.log(item);
                    if ('pages' in item) {
                        pgnum = parseInt(item.pages);
                        //console.log("ACHOU");
                        //console.log(item.pages);
                    }
                });

                //console.log(pgnum);

                if (pgnum != -1)
                    setpagesnum(<Text style={styles.pagesText}>Aproximadamente {pgnum} páginas no Total</Text>);
            }

            if (searchResults['subjects'] != null)
                setSubList(<SubjectsBox subjectsArray={searchResults['subjects']} />);

            if (searchResults['description'])
                setdescriptionBox(<DescriptionBox descriptionString={searchResults['description']} />)

            if (searchResults['authors']) {
                //console.log(searchResults['authors']);
                setauthorBox(<AuthorBox authorsArray={searchResults['authors']} />);
            }
        }

    }, [searchResults]);

    /**
     * SE TIVER CAPA BUSCA ELA E ADICIONA
     */
    var coverJSX = <View style={styles.image}></View>;
    if ('cover_i' in bookData) {
        coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['cover_i']}-L.jpg` }}
            style={styles.image}
            resizeMethod='auto'
            resizeMode='contain' />;
    };


    /**
     * Tenta buscar dados da API para ver se o livro atual está ou não 
     * na estante
     */
    useEffect(() => {
        if (hasBook.hasBook == true) {
            setLerOuVoltarALer("Adicionar Marcação");
            setPagesRead(hasBook.pages_read)
        }
    }, [hasBook]);

    useEffect(() => {
        try {
            var rData = { 'opl_key': bookKey };
            apiPost(`${API_URL}/api/hasbook/`, JSON.stringify(rData), setHasBook);
        }
        catch (erro) {
            console.log(erro);
        }
    }, []);

    const saveBookData = {

        'title': titleName,
        'author_name': (authorName),
        'opl_key': (bookKey),
        'status': 'reading',
        'cover_i': (bookData?.cover_i),
    };

    const handleSavePagesRead = ()=>{
        apiPost(`${API_URL}/api/update_book/`,JSON.stringify({'opl_key':bookKey,'pages_read':pagesRead}),()=>{
            Alert.alert("Marcado com Sucesso!")
            toggleModal()}
            )
    };

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
                        <View style={styles.cover}>
                            {coverJSX}

                        </View>
                        {authorBox}
                        <View style={styles.container}>
                            {loading && (<ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>)}
                            {hasBook?.hasBook && <Text style={styles.pagesText}> Você Parou na Pagina {pagesRead}</Text>}
                            {pagesnum}
                            <TouchableOpacity
                                style={styles.botaoLerOpacity}
                                onPress={() => {
                                    if (!hasBook?.hasBook)
                                        apiPost(`${API_URL}/api/addbook/`, JSON.stringify(saveBookData),()=>'');
                                    else {
                                        toggleModal;
                                    }
                                }}>

                                <Text style={styles.button}>{lerOuVoltarALer}</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isModalVisible}
                                onRequestClose={toggleModal}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>Número de Páginas Lidas</Text>
                                        <TextInput
                                            style={styles.modalInput}
                                            keyboardType="numeric"
                                            placeholder="Digite o número de páginas lidas"
                                            value={pagesRead}
                                            onChangeText={setPagesRead}
                                        />
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={handleSavePagesRead}
                                        >
                                            <Text style={styles.modalButtonText}>Salvar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        {descriptionBox || loading && (<ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>)}
                        {subList || loading && (<ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>)}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    cover:{
        flex: 1,
        width: 'auto',
        height: 'auto',
        flexShrink: 0,
        alignContent: 'center',
        alignItems: 'center'
    },
    pagesText: {
        fontFamily: 'Manjari-regular',
        fontSize: 18,
        color: 'white',
        margin: 12,
        textAlign: 'center',
    },
    image: {
        marginLeft: 6,
        borderRadius: 9,
        borderWidth: 3,
        borderColor: '#29476',
        width: '50%',
        height: 300,
    },
    imagemMenu: {
        marginLeft: 20,
        marginTop: 12
    },
    container: {
        marginTop: 12,
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
        marginLeft: '5%',
        fontFamily: 'Manjari-regular',
    },
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },
})