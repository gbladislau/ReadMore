import { View, StyleSheet, Image } from 'react-native';


export default function BookPage({ route, navigator }) {
    var bookData = route.params.bookData;
    var coverJSX = <View style={styles.image}></View>;

    if ('cover_i' in bookData) {
      coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['cover_i']}-L.jpg` }} style={styles.image} />;
    }
    return (
        <View>
            {coverJSX}
        </View>
    )

}

const styles = StyleSheet.create({
    image: {
        borderRadius: 9,
        width: 100,
        height: 150,
      }
})
