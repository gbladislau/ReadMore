
import { View} from 'react-native';
import BookCard from './BookCard';
import AuthorCard from './AuthorCard';

/**
 * LISTA DO RESULTADO DA PESQUISA POR LIVROS OU AUTORES DE UM DETERMINADO LIVRO
 * @returns LISTA DE LIVROS/AUTORES
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