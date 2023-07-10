
import { View } from 'react-native';
import BookCard from './BookCard';

export default function BooksResults({ searchResults }) {

    const component = searchResults['entries'].map((item, i) => {
        if ('covers' in item && item.covers != -1)
            return <BookCard key={i} bookData={item} hasBook={false} />
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}