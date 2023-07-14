import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BooksResults from '../components/BooksResults';
/**
 * SCREEN COM AS INFORMAÇÃO DO AUTOR DO LIVRO PESQUISADO
 * @returns PÁGINA DO AUTOR
 */
export default function AuthorPage({ route, navigator }) {


    var authorData = route.params.authorData;


    var authorBio = authorData['bio']
    if (authorBio?.value) authorBio = authorBio.value;

    const authorName = authorData?.name;
    const imageopt = authorData?.photos?.[0];


    const [searchResults, setSearchResults] = useState();
    const [BooksList, setBooksList] = useState(<View></View>);
    /**
     * Faz consulta na API e retorna a foto do autor
     */
    const coverJSX = imageopt ? (
        <Image source={{ uri: `https://covers.openlibrary.org/a/id/${imageopt}-L.jpg` }} style={styles.image}     resizeMethod='auto'
        resizeMode='contain' />
    ) : (
        <View style={styles.image}></View>
    );

    let component = <Text style={styles.text}>Indisponível</Text>;

    if (authorBio) {
        component = (
            <Text style={styles.textBio}>{authorBio}</Text>
        );
    }
    /**
     * Faz consulta na API e retorna uma lista de livros do autor
     */
    useEffect(() => {
        const fetchauthorbooksData = async () => {
          console.log('Busca livros do autor ');
          console.log(authorData['key']);
          const url_ = `https://openlibrary.org${authorData['key']}/works.json`;
          try {
            var response = await fetch(url_);
            if (response.ok) {
              console.log(`Sucesso na requisição GET para ${url_} HTTP ${response.status}`);
      
              try {
                var responseJSON = await response.json();
                setSearchResults(responseJSON);
                console.log(responseJSON);
              } catch (e) {
                console.log(e);
              }
            } else {
              console.log(`Falha na requisição GET para ${url_} HTTP ${response.status}`);
            }
          } catch (erro) {
            console.log(`Erro no GET em ${url_}`);
            console.log(erro);
            Alert.alert('Verifique sua conexão com a internet!');
          }
        };
      
        fetchauthorbooksData();
      }, []);
      
      /**
       * trata o retorno da busca de livros do autor e formata padronizado para disponibilizar no aplicativo
       */
    useEffect(() => {
        if (searchResults) {
            console.log("\nUpdated searchResults:\n", searchResults);
            setBooksList(<BooksResults searchResults={searchResults} />);
        }
    }, [searchResults]);

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ width: 'auto', height: 'auto', alignItems: 'center' }}>
                <View style={styles.retanguloContainer}>
                    <ScrollView>
                        <View style={styles.authorBox}>
                            <Text style={styles.titleText}>{authorName}</Text>
                            {coverJSX}
                        </View>
                        <View style={styles.bioBox}>
                            <Text style={styles.titleBio}>Bio:</Text>
                            {component}
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={styles.bioBox}>
                                <Text style={styles.titleBio}>Livros:</Text>
                                {BooksList}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView >
    )

}
/**
 * lista de estilos específicos usado na criação da página
 */
const styles = StyleSheet.create({
    image: {
        marginLeft: 6,
        borderRadius: 9,
        width: '80%',
        height: '70%',
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
        fontSize: 30,
        marginTop: 10,
        marginBottom: 6,
        fontFamily: 'Manjari-regular',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    titleBio: {
        display: 'flex',
        width: '70%',
        height: 'auto',
        fontSize: 20,
        fontFamily: 'Manjari-regular',
        color: 'white'
    },
    textBio: {
        display: 'flex',
        width: '99%',
        height: 'auto',
        fontSize: 15,
        marginLeft: 'auto',
        fontFamily: 'Manjari-regular',
        color: 'white'
    },
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },
    authorBox: {
        width: '96%',
        height: 300,
        marginTop: 12,
        marginBottom: 12,
        padding: 1,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

        borderRadius: 20,
        marginLeft: 8,
        marginRight: 8,
    },
    bioBox: {
        width: '96%',
        height: 'auto',
        display: 'flex',
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'grey',
        borderRadius: 20,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 10,
        padding: 10
    },
})
