import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, StyleSheet, Image, Text, Touchable, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Pagina de livro, recebe parametros pelo route e cria pagina com eles
 * @param {Array} param0 
 * @returns 
 */
export default function BookPage({ route, navigator }) {
    const navigation = useNavigation();

    const loadImage = (setImageDimensions, imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
      
        img.onload = () => {
          setImageDimensions({
            height: img.height,
            width: img.width
          });
        };
        img.onerror = (err) => {
          console.log("img error");
          console.error(err);
        };
    };
      
    var coverJSX = <View style={styles.image}></View>;

    const [imageDimensions, setImageDimensions] = useState({});
    if('cover_i' in bookData){
        const imageUrl = `https://covers.openlibrary.org/b/id/${bookData['cover_i']}-L.jpg` 
        
        useEffect(() => {
            loadImage(setImageDimensions, imageUrl);
            console.log(imageDimensions);
            coverJSX = <Image style={styles.image} resizeMode="contain" />;
        }, []);
    }

    var bookData = route.params.bookData;
    const titleName = bookData['title']
    const authorName = bookData['author_name']
    const lerOuVoltarALer = 'Voltar a Ler'

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ width: 'auto', height: 'auto', alignItems: 'center' }}>
                <View style={styles.retanguloContainer}>
                    <ScrollView>
                        <View style={{flex:1,width:'auto',height:'auto',flexShrink:0 ,flexDirection:'row'}}>
                            <TouchableOpacity onPress={navigation.openDrawer}>
                                <Image style={styles.imagemMenu} source={require('../assets/menu2.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.titleText}>{titleName}</Text>
                        </View>
                        <View style={{flex:1,width:'auto',height:'auto',flexShrink:0 ,flexDirection:'row'}}>

                            {coverJSX}
                            <View style={styles.lateralContainer}>
                                <TouchableOpacity style={styles.botaoLerOpacity}>
                                    <Text style={styles.button}>{lerOuVoltarALer}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    image: {
        marginLeft: 6,
        borderRadius: 9,
        borderWidth:3,
        borderColor:'black',
        width: '50%',
        height: '300',
    },
    imagemMenu:{
        marginLeft:17,
        marginRight:10,
        marginTop:10
      },
    lateralContainer:{
        
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor:'grey',
        borderRadius:20,
        marginLeft:6,
        marginRight:6,

    },
    botaoLerOpacity:
    {
        margin:10,
        width: "90%",
        borderRadius: 25,
        height: 'auto',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2938C4"
    },
    button: {

        fontFamily: 'Manjari-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        color: 'white',
        top:3

    } ,
    retanguloContainer: {
        width: '92%',
        height: '98%',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
    },
    titleText: {
        display: 'flex',
        width: '70%',
        height: 'auto',
        fontSize: 26,
        marginTop: 10,
        marginBottom: 6,
        marginLeft: 'auto',
        fontFamily: 'Manjari-regular',
    },
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },
})
