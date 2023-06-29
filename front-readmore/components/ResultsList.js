
import { View, StyleSheet } from 'react-native';
import BookCard from './BookCard';

export default function ResultsList({ searchResults, loading }) {

  console.log(searchResults);

  const bookComponent = searchResults['docs'].map((item, i) => {
    return <BookCard  id ={i} bookData={item}/>
  })
  return (
    <View>{bookComponent}</View>
  );

}

const styles = StyleSheet.create({})
