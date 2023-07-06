
import { View, StyleSheet } from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

export default function ResultsList({ searchResults, isBook }) {
    
    const component = searchResults['docs'].map((item, i) => {

        if (isBook)
            return <BookCard key={i} bookData={item} />
        else
            return <AuthorCard key={i} authorData={item} />
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}

const styles = StyleSheet.create({})
