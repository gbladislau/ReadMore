import { useNavigation } from '@react-navigation/native';
import{ StyleSheet, View ,Dimensions,Image,Text} from 'react-native';

export default function Book({bookData}) {
  const navigation = useNavigation()

  var coverJSX = <View style={styles.image}></View>;

  if('cover_i' in bookData){
      coverJSX = <Image source={{uri:`https://covers.openlibrary.org/b/id/${bookData['cover_i']}-M.jpg`}} style = {styles.image}/>;
  } 
  console.log()
  return (
    <View style = {styles.retanguloContainer}>
      <View style ={styles.retanguloContainer2}>
        {coverJSX}
        <View style ={{flexDirection:'column',alignContent:"space-between"}}>
          <Text style = {styles.textTitle}>{bookData['title']}</Text>
          <Text style = {styles.textAuthor}>Autor: {bookData['author_name']}</Text>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  textTitle:{
    display:'flex',
    width: 190,
    margin:12,
    fontFamily: 'Manjari-Bold',
    fontSize:16
  },
  textAuthor:{
    display:'flex',
    width: 190,
    marginLeft:12,
    fontFamily: 'Manjari-Bold',
    fontSize:16
  },

  retanguloContainer:{
    width: 'auto',
    height: 'auto',
    borderWidth:1,
    borderColor:'#2938C4',
    borderRadius: 10,

    backgroundColor: "#D9D9D9",
    flexDirection:"row",
    marginBottom:20,
  },
  retanguloContainer2:{
    width: 'auto',
    height: 'auto',
    margin:5,
    flexDirection:"row",
  },
  image:{
    borderRadius:9,
    width:100,
    height:150,
  }
});