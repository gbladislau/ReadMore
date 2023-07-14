import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import { apiRequestWithToken } from '../api_man/ApiManager';
import { useState, useEffect, useCallback } from 'react';
import ApiList from '../components/ApiList';
import { ScrollView } from 'react-native-gesture-handler';
/**
 * Retorna a página da estatante de livros do usuário
 */
function Bookshelf() {
    const [apiResults, setApiResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaDeLivros, setListaDeLivros] = useState(<View />);

    /**
     * Retorna os livros presentes na estante
     */
    const fetchData = async () => {
        try {
            await apiRequestWithToken(`/api/get_user_books/`, setApiResults);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Salva a lista de livros
     */
    useEffect(() => {
        setListaDeLivros(<ApiList key={apiResults.length} isBook={true} searchResults={apiResults} />);
    }, [apiResults]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            setListaDeLivros(<ApiList isBook={true} searchResults={apiResults} />);
        }, [])
    );

    return (
        <SafeAreaView style={styles.background}>
            <TopBar title={'Minha Estante'} />
            <View style={styles.retanguloContainer}>
                <ScrollView style={{ padding: 10 }}>{listaDeLivros}</ScrollView>
            </View>
        </SafeAreaView>
    );
}
/**
 * lista de estilos específicos usado na criação da página
 */
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },
    retanguloContainer: {
        width: '92%',
        height: '90%',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
    },
});

export default Bookshelf;
