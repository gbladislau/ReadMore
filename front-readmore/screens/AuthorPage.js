import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Touchable, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { apiRequestWithToken } from '../api_man/ApiManager';
import AuthosBioBox from '../components/AuthorBioBox';
import ResultsList from '../components/ResultsList';

export default function AuthorPage({ route, navigator }) {


    var authorData = route.params.authorData;

    var photoJSX = <View style={styles.image}></View>;
    var bioBox = <View/>;
    const authorKey = authorData?.key;
    const authorName = authorData?.name;
    const authorBio =  authorData?.bio?.value;
    const [searchResults, setSearchResults] = useState();
    const [BooksList, setBooksList] = useState(<View></View>);


    const fetchauthorbooksData = async () => {
        console.log('Busca livros do autor ');
        console.log(authorData['key']);
        const url_ = `https://openlibrary.org${authorData['key']}/works.json`;
        try {
            setLoading(true)
            var response = await fetch(url_);
            if (response.ok) {
                console.log(`Sucesso na requisição GET para ${url_} HTTP ${response.status}`);

                try {
                    var responseJSON = await response.json();
                    setSearchResults(responseJSON);
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
        fetchauthorbooksData();
    }, []);


    useEffect(()=>{
        //setBooksList(<ResultsList/>)
    },[searchResults])


    if (authorBio) {

        bioBox = (<AuthosBioBox descriptionString={authorBio} />)
    }

    if ('photo' in authorData) {

        photoJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['photo']}-L.jpg` }} 
        style={styles.image} />;
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ width: 'auto', height: 'auto', alignItems: 'center' }}>
                <View style={styles.retanguloContainer}>
                    <Text style={styles.titleText}>{authorName}</Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {photoJSX}
                        <Text></Text>
                    </View>
                    <ScrollView>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {bioBox}
                        </View>
                        <View style={{ flex: 1}}>
                            {BooksList}
                        </View>

                    </ScrollView>

                </View>
            </View>
        </SafeAreaView >
    )

}

const styles = StyleSheet.create({
    image: {
        marginLeft: 6,
        borderRadius: 9,
        resizeMode: 'contain',
        resizeMethod: 'resize',
        width: '50%',
        height: '40%',
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
