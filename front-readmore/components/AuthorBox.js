import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink'
import { styles } from '../styles/GreyBoxStyle';
import { useEffect, useState } from 'react';
import AuthorCard from './AuthorCard';


export default function AuthorBox({ authorKey: authorsArray }) {
    const [authorData, setauthorData] = useState();
    console.log(authorsArray);
    const fetchAuthorData = async (key) => {
        console.log('Busca + dados sobre o autor ');
        console.log(key);
        const url_ = `https://openlibrary.org${key}.json`;
        try {
            var response = await fetch(url_);
            if (response.ok) {
                console.log(`Sucesso na requisição GET para ${url_} HTTP ${response.status}`);

                try {
                    var responseJSON = await response.json();
                    setauthorData(responseJSON);
                }
                catch (e) {
                    console.log(e)
                }
            }
            else {
                console.log(`Falha na requisição GET para ${url_} HTTP ${response.status}`);
            }
        }
        catch (erro) {
            console.log(`Erro no GET em ${url_}`);
            console.log(erro);
        }            
    }
    const [component, setComponent] = useState(<Text style={styles.text}>Indisponível</Text>);
    
    useEffect(() => {
        setComponent(<AuthorCard key={Math.random()} authorData={authorData}/>);
    }, [authorData]);

    useEffect(()=>{
        if (authorsArray) {
            var authorCards = authorsArray.map( (item,i) =>{
                console.log((item));
                try {
                    fetchAuthorData(item['author']['key'])
                } catch (error) {
                    console.log(error);
                }
            })
        }
    },[]);

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Autores:</Text>
            {component}
        </View>
    );
}
