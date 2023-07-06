import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink'
import { styles } from '../styles/GreyBoxStyle';

export default function AuthorBox({ authorKey }) {
    let component = <Text style={styles.text}>Indisponível</Text>;

    if (authorKey) {
        const fetchAuthorData = async () => {
            console.log('Busca + dados sobre o autor ');
            console.log(authorKey);
            const url_ = `https://openlibrary.org${authorKey}.json`;
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
            }            
        }
        useEffect(() => {
            fetchBookData();
        }, []);
    
        component = (
            <Hyperlink linkDefault={true} linkStyle={ 
                { color: 'blue',
                textDecorationLine: 'underline',}}>
                <Text style={styles.text}>{descriptionString}</Text>
            </Hyperlink>
        );
    }

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Autores:</Text>
            {component}
        </View>
    );
}
