import { Text, View } from 'react-native';
import { styles } from '../styles/GreyBoxStyle';

/**
 * RECEBE OS DADOS DO AUTOR EM FORMATO JSON, TRATA OS DADOS E TRANSFORMA EM UMA AUTHORBOX, CONTENDO A FOTO E 
 * NOME DO AUTOR, USADO SOMENTE NA PÁGINA DO AUTOR
 * @returns AUTHORBOX DA AUTHORPAGE
 */
export default function AuthorPageAuthorBox({ authorData }) {

    const imageopt = authorData?.photos?.[0];

    const coverJSX = imageopt ? (
        <Image source={{ uri: `https://covers.openlibrary.org/a/id/${imageopt}-M.jpg` }} style={styles.image} />
    ) : (
        <View style={styles.image}></View>
    );
    const authorName = authorData?.name;



    return (
        <View style={styles.card}>
            <Text style={styles.textTitle}>{authorName}</Text>
            <View>{coverJSX}</View>
        </View>
    );
};