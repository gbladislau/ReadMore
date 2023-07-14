import { Text, View } from 'react-native';
import { styles } from '../styles/GreyBoxStyle';

/**
 * Retorna uma box com as informações padronizadas do autor, usado somente para a página do autor
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