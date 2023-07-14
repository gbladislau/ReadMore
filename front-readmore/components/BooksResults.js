import React from 'react';
import { View } from 'react-native';
import BookCard from './BookCard';
/**
 * BOOKCARDS DOS LIVROS PESQUISADOS
 * @returns LISTA DE BOOKCARD
 */
export default function BooksResults({ searchResults }) {
  const component = searchResults?.entries?.map((item, i) => {
    if ('covers' in item && item.covers !== -1) {
      return <BookCard key={i} bookData={item} hasBook={false} />;
    }
    return null; // Return null for undefined items
  });

  return <View>{component}</View>;
}
