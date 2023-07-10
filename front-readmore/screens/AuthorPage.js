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
      <Text style={styles.text}>{authorBio}</Text>
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
              {authorName && (
                <View style={{ flexDirection: 'column', alignContent: "space-between" }}>
                  <Text style={styles.titleText}>{authorName}</Text>
                </View>
              )}
              {coverJSX}
            </View>
            <View style={styles.bioBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleBio}>Bio:</Text>
                {component}
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
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
    width: '70%',
    height: '60%',
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
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 'auto',
    fontFamily: 'Manjari-regular',
  },
  background: {
    backgroundColor: '#070558',
    flex: 1,
  },
  authorBox: {
    width: '90%',
    height: '90%',
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
    padding: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
