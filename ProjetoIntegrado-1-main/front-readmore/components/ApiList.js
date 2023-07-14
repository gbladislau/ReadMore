import { View} from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

/**
 * Trata os dados resultantes da pesquisa na API e retorna uma lista de livros ou autores, dependendo do motivo da pesquisa.
 */
export default function ApiList({ searchResults, isBook }) {
    if (!searchResults || !Array.isArray(searchResults)) {
        return null; 
    }  

    /**
     * Retorna um Bookcard ou Authorcard.
     */
    const component = searchResults.map((item, i) => {
        if (isBook) {
            return <BookCard key={i} bookData={item} hasBook={true} />;
        } else {
            return <AuthorCard key={i} authorData={item} />;
        }
    });

    return <View>{component}</View>;
}
