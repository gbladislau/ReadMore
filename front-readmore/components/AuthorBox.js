import React, { useEffect, useState } from 'react';
import { Text, View, Linking, StyleSheet } from 'react-native';
import AuthorCard from './AuthorCard';

import { styles } from '../styles/GreyBoxStyle';

export default function AuthorBox({ authorsArray }) {
    console.log(authorsArray);
    const [authorDataArray, setAuthorDataArray] = useState([]);

    const fetchAuthorData = async (key) => {
        const url = `https://openlibrary.org${key}.json`;

        try {
            const response = await fetch(url);

            if (response.ok) {
                const responseJSON = await response.json();
                console.log(JSON.stringify(responseJSON));
                return responseJSON;
            } else {
                console.log(`Falha na requisição GET para ${url} HTTP ${response.status}`);
                return null;
            }
        } catch (error) {
            console.log(`Erro no GET em ${url}`);
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAuthorDataForArray = async () => {
            try {
                const authorDataArray = [];

                for (let i = 0; i < authorsArray.length; i++) {
                    const authorKey = authorsArray[i].author.key;
                    console.log(authorKey);
                    try {
                        const authorData = await fetchAuthorData(authorKey);
                        authorDataArray.push(authorData);
                    } catch (error) {
                        console.log(error);
                    }
                }

                setAuthorDataArray(authorDataArray);
            } catch (error) {
                console.log(error);
            }
        };

        if (authorsArray) {
            fetchAuthorDataForArray();
        }
    }, []);

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Autores:</Text>
            {authorDataArray.length > 0 ? (
                authorDataArray.map((authorData) => (
                    <AuthorCard key={authorData.key} authorData={authorData} />
                ))
            ) : (
                <Text style={styles.text}>Indisponível</Text>
            )}
        </View>
    );
}
