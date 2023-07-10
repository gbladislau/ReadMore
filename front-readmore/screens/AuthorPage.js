import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Touchable, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { apiRequestWithToken } from '../api_man/ApiManager';
import AuthosBioBox from '../components/AuthorBioBox';
import BooksResults from '../components/BooksResults';
import AuthorPageAuthorBox from '../components/AuthorPageAuthoBox';
import SubjectsBox from '../components/SubjectsList';

export default function AuthorPage({ route, navigator }) {


  var authorData = route.params.authorData;


  // const authorKey = authorData?.key;
  const authorBio = authorData?.bio?.value;
  const authorName = authorData?.name;
  const imageopt = authorData?.photos?.[0];



  const [searchResults, setSearchResults] = useState();
  const [BooksList, setBooksList] = useState(<View></View>);
  const [loading, setLoading] = useState(false);


  const coverJSX = imageopt ? (
    <Image source={{ uri: `https://covers.openlibrary.org/a/id/${imageopt}-M.jpg` }} style={styles.image} />
  ) : (
    <View style={styles.image}></View>
  );

  let component = <Text style={styles.text}>Indisponível</Text>;

  if (authorBio) {
    component = (
      <Text style={styles.textBio}>{authorBio}</Text>
    );
  }

  const fetchauthorbooksData = async () => {
    console.log('Busca livros do autor ');
    console.log(authorData['key']);
    const url_ = `https://openlibrary.org${authorData['key']}/works.json`;
    try {
      setLoading(true)
      var response = await fetch(url_);
      if (response.ok) {
        console.log(`Sucesso na requisição GET para ${url_} HTTP ${response.status}`);

        try {
          var responseJSON = await response.json();
          setSearchResults(responseJSON);
        }
        catch (e) {
          console.log(e)
          setLoading(false);
        }
      }
      else {
        console.log(`Falha na requisição GET para ${url_} HTTP ${response.status}`);
      }
      setLoading(false);
    }
    catch (erro) {
      console.log(`Erro no GET em ${url_}`);
      console.log(erro);
      setLoading(false);
      Alert.alert("Verifique sua conexão com a internet!");
    }
  }

  useEffect(() => {
    fetchauthorbooksData();
  }, [])
  useEffect(() => {
    if (searchResults) {
      console.log("\nUpdated searchResults:\n", searchResults);
      setBooksList(<BooksResults searchResults={searchResults} />);
    }
  }, [searchResults]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ width: 'auto', height: 'auto', alignItems: 'center' }}>
        <View style={styles.retanguloContainer}>
          <ScrollView>
            <View style={styles.authorBox}>
              <Text style={styles.titleText}>{authorName}</Text>
              {coverJSX}
            </View>
            <View style={styles.bioBox}>
              <Text style={styles.titleBio}>Bio:</Text>
              {component}
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={styles.livroBox}>
                <Text style={styles.titleBio}>livros:</Text>
                {BooksList}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  )

}

const styles = StyleSheet.create({
  image: {
    marginLeft: 6,
    borderRadius: 9,
    resizeMode: 'contain',
    resizeMethod: 'resize',
    width: '80%',
    height: '70%',
  },
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
    fontSize: 30,
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 'auto',
    fontFamily: 'Manjari-regular',
  },
  titleBio: {
    display: 'flex',
    width: '70%',
    height: 'auto',
    fontSize: 20,
    fontFamily: 'Manjari-regular',
  },
  textBio: {
    display: 'flex',
    width: '99%',
    height: 'auto',
    fontSize: 15,
    marginLeft: 'auto',
    fontFamily: 'Manjari-regular',
  },
  background: {
    backgroundColor: '#070558',
    flex: 1,
  },
  authorBox: {
    width: '96%',
    height: 300,
    marginTop: 12,
    marginBottom: 12,
    padding: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  bioBox: {
    width: '96%',
    height: 'auto',
    display: 'flex',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    borderRadius: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  livroBox: {
    width: 'auto',
    height: 'auto',
    marginTop: 12,
    marginBottom: 12,
    padding: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    marginLeft: 8,
    marginRight: 8,
  },
})
