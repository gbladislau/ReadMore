import { View} from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

/**
 * RECEBE O RESULTADO DA PESQUISA, POR LIVRO OU POR AUTOR, NA API E TRANSFORMA EM COMPONENTES, BOOKCARD OU AUTORCARD.
 * @returns COMPENENTS
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
