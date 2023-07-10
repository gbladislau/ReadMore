import { View} from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

export default function ApiList({ searchResults, isBook }) {
    if (!searchResults || !Array.isArray(searchResults)) {
        return null; 
    }  

    const component = searchResults.map((item, i) => {
        if (isBook) {
            return <BookCard key={i} bookData={item} hasBook={true} />;
        } else {
            return <AuthorCard key={i} authorData={item} />;
        }
    });

    return <View>{component}</View>;
}
