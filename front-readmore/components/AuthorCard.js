import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AuthorCard({ authorData }) {
    const navigation = useNavigation()
    console.log("ENTROU AQUI\n\n\n\n");
    console.log(JSON.stringify(authorData));

    const imageUrl = authorData?.photos?.[0]?.large;
    const authorName = authorData?.personal_name;
    const coverJSX = imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
    ) : (
        <View style={styles.image}></View>
    );

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AuthorPage", { authorData: authorData })}>
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

const styles = StyleSheet.create({
    card:
    {

        margin: 10,
        width: "90%",
        borderRadius: 25,
        height: 'auto',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2938C4"
    },
    textTitle: {
        display: 'flex',
        width: 190,
        margin: 12,
        fontFamily: 'Manjari-Bold',
        fontSize: 16
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