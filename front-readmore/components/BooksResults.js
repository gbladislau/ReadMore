
import { View, StyleSheet } from 'react-native';
import BookCard from './BookCard';

export default function BooksResults({ searchResults }) {

    const component = searchResults['entries'].map((item, i) => {
        if ('covers' in item && item.covers != -1)
            return <BookCard key={i} bookData={item} />
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}

const styles = StyleSheet.create({})