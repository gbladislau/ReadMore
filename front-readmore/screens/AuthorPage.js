import { View, StyleSheet, Image, Text, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthorPage({ route, navigator }) {


    var bookData = route.params.bookData;
    var coverJSX = <View style={styles.image}></View>;
    const titleName = bookData['title']
    if ('cover_i' in bookData) {

      coverJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['cover_i']}-L.jpg` }} style={styles.image} />;
    }
    return (
        <SafeAreaView style={styles.background}>
            <View style={{width:'auto',height:'auto',alignItems:'center'}}>
                <View style={styles.retanguloContainer}>
                    <Text style={styles.titleText}>{titleName}</Text> 
                    <View style={{flex:1,flexDirection:'row'}}>
                        {coverJSX}
                        <Text></Text>
                    </View>
                    

                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    image: {
        marginLeft:6,
        borderRadius: 9,
        resizeMode:'contain',
        resizeMethod:'resize',
        width:'50%',
        height:'40%',
      },
    retanguloContainer:{
        width: '92%',
        height: '98%',
        borderWidth:3,
        borderColor:'#2938C4',
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
      },
    titleText: {
        display: 'flex',
        width: '70%',
        height:'auto',
        fontSize:26,
        marginTop:10,
        marginBottom:6,
        marginLeft:'auto',
        fontFamily: 'Manjari-regular',
      },
    background: {
        backgroundColor: '#070558',
        flex: 1,
      },
})
