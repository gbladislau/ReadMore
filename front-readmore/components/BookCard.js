import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BookCard({ bookData, hasBook }) {
    //console.log(bookData);
    const navigation = useNavigation()
    const [paginasLidas, setPaginasLidas] = useState();
    const [authorName, setAuthorName] = useState(bookData['author_name']);
    var coverJSX = <View style={styles.image}></View>;

    if ('cover_i' in bookData) {
        coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['cover_i']}-M.jpg` }} style={styles.image} />;
    }
    else if ('covers' in bookData) {
        coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['covers'][0]}-M.jpg` }} style={styles.image} />;
    }

    

    useEffect(()=>{
        if(hasBook){
            setPaginasLidas(<Text style={styles.textAuthor}>Leu até pagina {bookData['pages_read']}</Text>);
            setAuthorName(JSON.parse(bookData['author_name'].replace(/'/g, '"')).join(', '));
        }
    },[])

    return (
        <View style={styles.retanguloContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("BookPage", { bookData: bookData })}>
                <View style={styles.retanguloContainer2}>
                    {coverJSX}
                    <View style={{ flexDirection: 'column', alignContent: "space-between" }}>
                        <Text style={styles.textTitle}>{bookData['title']}</Text>
                        <Text style={styles.textAuthor}>{authorName}</Text>
                        {paginasLidas}
                    </View>
                </View>
            </TouchableOpacity>
        </View >

    );
}

const styles = StyleSheet.create({
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
        marginBottom:6,
        fontFamily: 'Manjari-Bold',
        fontSize: 16
    },

    retanguloContainer: {
        width: 'auto',
        height: 'auto',
        borderWidth: 1,
        borderColor: '#2938C4',
        borderRadius: 10,

        backgroundColor: "rgba(30, 30, 30, 0.20)",
        flexDirection: "row",
        marginBottom: 20,
    },
    retanguloContainer2: {
        width: 'auto',
        height: 'auto',
        margin: 5,
        flexDirection: "row",
    },
    image: {
        borderRadius: 9,
        width: 100,
        height: 150,
    }
});