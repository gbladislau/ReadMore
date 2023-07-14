import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * RECEBE OS DADOS DO AUTOR EM FORMATO JSON, TRATA OS DADOS E TRANSFORMA EM UM AUTHORCARD COM OS DADOS DO AUTOR
 * @returns AUTHORCARD
 */
export default function AuthorCard({ authorData ,hasAllData}) {
    const navigation = useNavigation()

    /**
     * Consulta os dados do autor para confirma a foto
     */
    const imageopt = authorData?.photos?.[0];
    /**
     * Consulta os dados do autor para confirma o nome
     */
    const authorName = authorData?.personal_name;

    /**
     * Faz uma busca na API e retorna a foto do autor, quando existir uma
     */
    const coverJSX = imageopt ? (
        <Image source={{ uri: `https://covers.openlibrary.org/a/id/${imageopt}-M.jpg` }} style={styles.image} />
    ) : (
        <View style={styles.image}></View>
    );

    return (
        <TouchableOpacity style={styles.card} onPress={() => {
                navigation.navigate("AuthorPage", { authorData: authorData })

            }}>
            <View style={styles.retanguloContainer2}>
                {coverJSX}
                {authorName && (
                    <View style={{ flexDirection: 'column', alignContent: "space-between" }}>
                        <Text style={styles.textTitle}>{authorName}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}
/**
 * lista de estilos específicos usado na criação da página
 */
const styles = StyleSheet.create({
    card:
    {
        width: "100%",
        borderRadius: 25,
        height: 'auto',
        alignItems: "center",
        alignSelf:'center',
        justifyContent: "center",
  
    },
    textTitle: {
        display: 'flex',
        width: 190,
        fontFamily: 'Manjari-regular',
        fontSize: 20,
        color:'white'
    },
    textAuthor: {
        display: 'flex',
        width: 190,
        marginLeft: 12,
        fontFamily: 'Manjari-Bold',
        fontSize: 16
    },
    retanguloContainer2: {
        width: 'auto',
        height: 'auto',
        margin: 5,
        flexDirection: "row",
    },
    image: {
        borderRadius: 80,
        width: 100,
        height: 150,
    }
});