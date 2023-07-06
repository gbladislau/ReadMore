import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AuthorCard({ authorData }) {
  const navigation = useNavigation()

  var coverJSX = <View style={styles.image}></View>;
  console.log(JSON.stringify(authorData));
  return (

    <View style={{flex:1}}>
      <TouchableOpacity onPress={() => navigation.navigate("AuthorPage", { AuthorData: authorData })}>
        <View style={styles.retanguloContainer2}>
          {coverJSX}
          <View style={{ flexDirection: 'column', alignContent: "space-between" }}>
            <Text style={styles.textTitle}>{authorData['name']}</Text>
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
    borderRadius: 80,
    width: 100,
    height: 150,
  }
});