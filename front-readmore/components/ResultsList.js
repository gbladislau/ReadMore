
import {View, StyleSheet} from 'react-native';
import Book from './Book';

export default function ResultsList({searchResults}) {

  console.log(searchResults)

  return(<View/>)
    bookComponent = searchResults.map( (item, i) =>{
        return <Book name={item}></Book>
    })
    return(
        <View>{bookComponent}</View>
    );
  }
  
const styles = StyleSheet.create({})
