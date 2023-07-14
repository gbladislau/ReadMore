
import { View} from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

/**
 * Retorna os dados, tratados, resultantes da busca na API
 */
export default function ResultsList({ searchResults, isBook }) {
    
    const component = searchResults['docs'].map((item, i) => {

        if (isBook)
            return <BookCard key={i} bookData={item} hasBook={false} />
        else
            return <AuthorCard key={i} authorData={item} />
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}