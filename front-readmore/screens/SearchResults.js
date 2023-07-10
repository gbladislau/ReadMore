import { StyleSheet, Dimensions, Alert, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ResultsList from '../components/ResultsList';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function SearchResults({ route, navigation }) {


    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState();
    const [searchList, setSearchList] = useState(<View />);



    const fetchSearch = async () => {
        console.log('\n\n\n\nCHAMOU \n\n');
        const url_ = `https://openlibrary.org/search.json?&fields=author_name,title,key,cover_i&mode=everything&q=${route.params.searchKey}`;
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
        fetchSearch();
    }
        , []);

    useEffect(() => {
        if (searchResults) {
            console.log("\nUpdated searchResults:\n", searchResults);
            setSearchList(<ResultsList searchResults={searchResults} isBook={true} />);
        }
    }, [searchResults]);


    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.retanguloContainer}>
                <Text style={styles.titleText}>Busca por: {route.params.searchKey} </Text>

                {loading && (<ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>)}

                <TouchableOpacity style={styles.imagem} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} />
                </TouchableOpacity>
                <ScrollView style={styles.scrollStyle}>
                    <View style={styles.resultsView}>
                        {searchList}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const Wwidth = Dimensions.get('window').width;
const marginLeftvar = ((Wwidth - ((Wwidth) * 0.92)) / 2);

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#070558',
        flex: 1,
        alignItems: 'center',
    },

    titleText: {
        position: 'relative',

        left: 3,
        top: 20,
        fontSize: 20,
        fontFamily: 'Manjari-Bold',
    },

    imagem: {
        position: 'absolute',
        bottom: 6
    },

    retanguloContainer: {
        width: '90%',
        height: '98%',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
        alignItems: 'center',
    },
    resultsView: {
        alignItems: 'center',
    },
    scrollStyle: {
        marginTop: 30,
        marginBottom: 45
    },
    loading: {

        marginTop: 40,
    },
})

export default SearchResults;
