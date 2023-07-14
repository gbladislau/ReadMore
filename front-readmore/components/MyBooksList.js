import BookCard from "./BookCard";


export default function MyBooksList({ apiResults }) {

    const component = searchResults.map((item, i) => {
        return <BookCard key={i} bookData={item} hasBook={true}/>
    })
    var componentCards = component;

    return (
        <View>{componentCards}</View>
    );

}