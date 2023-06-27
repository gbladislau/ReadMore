import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

function SearchPage() {
    const navigator = useNavigation();
    const [searchKey, setsearchKey] = useState('');
    return (
        <SafeAreaView style={styles.background}>
            <TopBar title={"Explorar"} />
            <View style={styles.retanguloContainer}>
                <TextInput style={styles.caixaDePesquisa} 
                    placeholder='Pesquisa'
                    placeholderTextColor={'grey'}
                    onChangeText={(input) => setsearchKey(input)}
                    />
                <View style={styles.barraDePesquisa}>
                
                    <LinearGradient //Gradiente ou Degradê de Azul
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        colors={['#4ADEDE', '#2938C4']}
                        style={{flex:1,borderRadius:25,zIndex:0}}
                    />

                </View>
                <TouchableOpacity style={styles.imagem} 
                    onPress={ ()  =>  {
                        if(searchKey=='') { Alert.alert('Caixa de pesquisa vazia!',"Insira algo para pesquisar")}
                        else{navigator.navigate('SearchResults',{searchKey:searchKey})}
                    }
                    }>
                    <Image source={require('../assets/search.png')} />
                </TouchableOpacity>

                <ScrollView>
                    
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}

const Wwidth = Dimensions.get('window').width;
const marginLeftvar = ((Wwidth - ((Wwidth)*0.92))/2);

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#070558',
        flex: 1,
    },

    caixaDePesquisa:{
        width: '90%',
        height: 46,
        marginTop:12,
        left:36,
        position:'absolute',
        zIndex:1,
        fontSize:20,
        fontFamily:'Manjari-Bold'
    },

    barraDePesquisa:{
        width: '90%',
        height: 46,
        marginTop:10,
        borderRadius:25,
    },

    imagem:{
       position:'absolute',
       marginTop:20,
       right:40,
       zIndex:2
    },
    
    retanguloContainer: {
        width: '92%',
        height: '90%',
        borderWidth: 3,
        borderColor: '#2938C4',
        borderRadius: 25,
        marginLeft: marginLeftvar,
        marginRight: marginLeftvar,
        backgroundColor: "#D9D9D9",
        alignItems:'center',
        flexShrink:0,
    },
})

export default SearchPage;
