import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';
import { apiRequestWithToken } from '../api_man/ApiManager';
import { useEffect, useState } from 'react';
import { API_URL } from '@env'
import ApiList from '../components/ApiList';
import { ScrollView } from 'react-native-gesture-handler';


function Bookshelf() {
    const [apiResults, setApiResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaDeLivros, setListaDeLivros] = useState(<View />);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await apiRequestWithToken(`${API_URL}/api/get_user_books/`,setApiResults);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => { setListaDeLivros(<ApiList isBook={true} searchResults={apiResults} />)}, [apiResults])


    return (
        <SafeAreaView style={styles.background}>
            <TopBar title={"Minha Estante"} />
                    <View style={styles.retanguloContainer}>
                        <ScrollView style={{padding:10}}>
                        {listaDeLivros}
                        </ScrollView>
                    </View>
                
        </SafeAreaView>
    );
}



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
        backgroundColor: "#D9D9D9",
        alignSelf: 'center'
    },
    
})

export default Bookshelf;
