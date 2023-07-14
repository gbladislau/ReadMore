import BookCard from "./BookCard";

/**
 * LISTA DE LIVROS SALVOS PELO USUÁRIO
 * @returns LISTA DE LIVROS 
 */
export default function MyBooksList({ apiResults }) {
    /**
     * Consulta o banco de dados e retorna os livros salvo pelo usuário
     */
    const component = searchResults.map((item, i) => {
        return <BookCard key={i} bookData={item} hasBook={true}/>
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}