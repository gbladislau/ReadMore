
import { View, StyleSheet } from 'react-native';
import Book from './Book';

export default function ResultsList({ searchResults, loading }) {


  console.log("\n\n\n\n\n");
  console.log(searchResults);

  const bookComponent = searchResults['docs'].map((item, i) => {
    return <Book bookData={item}></Book>
  })
  return (
    <View>{bookComponent}</View>
  );

}

const styles = StyleSheet.create({})
