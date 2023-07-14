import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequestWithToken } from '../api_man/ApiManager';
import SubjectsBox from '../components/SubjectsList';
import DescriptionBox from '../components/DescriptionBox';
import AuthorBox from '../components/AuthorBox';
import { apiPost } from '../api_man/ApiManager';
/**
 * SCREEN COM AS INFORMAÇÕES DO LIVRO PESQUISADO
 * @returns PÁGINA DE LIVRO
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

    const [marcacao, setMarcacao] = useState();


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
    }
    else if ('covers' in bookData) {
        coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['covers'][0]}-M.jpg` }} style={styles.image} />;    
        bookData.cover_i = bookData['covers'][0];
    }


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

    var rData = { 'opl_key': bookKey };
    /**
     * Adiciona um livro na estante do usuário
     */
    useEffect(() => {
        try { 
            apiPost(`/api/hasbook/`, JSON.stringify(rData), setHasBook);
        }
        catch (erro) {
            console.log(erro);
        }
    }, []);

    /**
     * Salva as principais informações do livro
     */
    const saveBookData = {

        'title': titleName,
        'author_name': (authorName),
        'opl_key': (bookKey),
        'status': 'reading',
        'cover_i': (bookData?.cover_i),
    };
    /**
     * Marcador de página
     */
    const handleSavePagesRead = ()=>{
        apiPost(`/api/update_book/`,JSON.stringify({'opl_key':bookKey,'pages_read':parseInt(pagesRead)}),()=>{
            Alert.alert("Marcado com Sucesso!")
            toggleModal()})
    };
    /**
     * Remove um livro pra estante
     */
    const handleRemoveBook = ()=>{
        apiPost(`/api/delete_book/`,JSON.stringify({'opl_key':bookKey}),()=>{
            Alert.alert("Removido com Sucesso!")
            toggleModal()})
        setHasBook({'hasBook':false, 'pages_read':0})
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
                            {hasBook?.hasBook && <Text style={styles.pagesText_}> Você Parou na Pagina{'\n'}{pagesRead}</Text>}
                            {pagesnum}
                            <TouchableOpacity
                                style={styles.botaoLerOpacity}
                                onPress={() => {
                                    if (!hasBook?.hasBook)
                                        apiPost(`/api/addbook/`, JSON.stringify(saveBookData),()=>{
                                            Alert.alert("Adicionado com sucesso");
                                            setHasBook({'hasBook':true, 'pages_read':0})
                                        });
                                    else {
                                        toggleModal();
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
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity
                                                style={styles.modalButton}
                                                onPress={handleRemoveBook}
                                            >
                                            <Text style={styles.modalButtonTextVoltar}>Remover Livro</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.modalButton}
                                                onPress={toggleModal}
                                            >
                                            <Text style={styles.modalButtonTextVoltar}>Voltar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.modalButton}
                                                onPress={handleSavePagesRead}
                                            >
                                             <Text style={styles.modalButtonText}>Salvar</Text>
                                                </TouchableOpacity>
                                        </View>
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
/**
 * lista de estilos específicos usado na criação da página
 */
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
        marginTop: 12,
        textAlign: 'center',
    },
    pagesText_: {
        fontFamily: 'Manjari-regular',
        fontSize: 18,
        color: 'white',
        marginTop: 12,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    image: {
        marginLeft: 6,
        borderRadius: 9,
        borderWidth: 3,
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
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#2938C4',
        margin: 10
      },
      modalButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
      },
      modalButtonTextVoltar: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
      },
})