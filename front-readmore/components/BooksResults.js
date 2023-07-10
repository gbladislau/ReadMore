
import { View, StyleSheet } from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

export default function BooksResults({ searchResults }) {

    const component = searchResults['entries'].map((item, i) => {

        return <BookCard key={i} bookData={item} />
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}

const styles = StyleSheet.create({})