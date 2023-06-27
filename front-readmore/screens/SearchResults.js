import { StyleSheet, Dimensions, Alert, View,Text ,Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ResultsList from '../components/ResultsList';
import { useState, useEffect } from 'react';

function SearchResults({ route ,navigation }) {
    

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState();

    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    };
 
    const fetchSearch = async () => {
        const url_ = `https://openlibrary.org/search.json?&fields=title,key,cover_i&sort=editions&mode=everything&q=${route.params.searchKey}`
        try {
            setLoading(true)
            var response = await fetch(url_, 'GET');
            console.log(response)
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para ${url_} HTTP ${response.status}`);
            
                try { 
                    var responseJSON = await response.json();
                    setSearchResults(responseJSON)
                }
                catch (erro) {
                    setLoading(false)}
                    console.log(erro);
                }
            else {
                console.log(`Falha na requisição ${requestOptions["method"]} para ${url_} HTTP ${response.status}`);
            }
            setLoading(false)

        }
        catch (erro) {
            console.log(`Erro no ${requestOptions["method"]} em ${url_} body:${requestOptions['body']}`)
            console.log(erro);
            setLoading(false)
            Alert.alert("Verifique sua conexão com a internet!")
        }
    }
    
    useEffect(()=>{
            fetchSearch();
        }
    );
   
    return (
        <SafeAreaView style={styles.background}>
            {loading && <ActivityIndicator ></ActivityIndicator>}
            <View style={styles.retanguloContainer}>
                <Text style={styles.titleText}>Busca por: {route.params.searchKey} </Text>
                <ResultsList searchResults={searchResults} />
                <TouchableOpacity style={styles.imagem} onPress={()=> navigation.goBack()}>
                    <Image source={require('../assets/back.png')} />
                </TouchableOpacity>
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

    titleText:{
        position:'absolute',
        left:10,
        top:0,
        fontSize:20,
        fontFamily:'Manjari-Bold',
        margin:10
    },

    barraDePesquisa: {
        width: '90%',
        height: '7%',
        marginTop: 10,
        borderRadius: 25,
    },

    imagem: {
        position: 'absolute',
        bottom:10
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
})

export default SearchResults;
