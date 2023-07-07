import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Touchable, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequestWithToken } from '../api_man/ApiManager';
import AuthosBioBox from '../components/AuthorBioBox';

export default function AuthorPage({ route, navigator }) {


  var authorData = route.params.authorData;

  var coverJSX = <View style={styles.image}></View>;

  const authorKey = authorData['key']
  const authorName = authorData['name']
  const authorBio = authorData['bio']['value']

  // var authorBookData = `https://openlibrary.org/authors/${authorKey}/works.json`

  const [bioBox, setbioBox] = useState(<View />);

  if (authorBio) {

    setbioBox(<AuthosBioBox descriptionString={authorBio} />)
  }

  if ('photo' in authorData) {

    photoJSX = <Image source={{ uri: `https://covers.openlibrary.org/b/id/${bookData['photo']}-L.jpg` }} style={styles.image} />;
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ width: 'auto', height: 'auto', alignItems: 'center' }}>
        <View style={styles.retanguloContainer}>
          <Text style={styles.titleText}>{authorName}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {photoJSX}
            <Text></Text>
          </View>
          <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {bioBox}
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
    width: '50%',
    height: '40%',
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
