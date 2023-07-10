import React, { useEffect, useState } from 'react';
import { Text, View, Linking, StyleSheet } from 'react-native';
import { styles } from '../styles/GreyBoxStyle';


export default function AuthorPageAuthorBox({ authorData }) {

    const imageopt = authorData?.photos?.[0];

    const coverJSX = imageopt ? (
        <Image source={{ uri: `https://covers.openlibrary.org/a/id/${imageopt}-M.jpg` }} style={styles.image} />
    ) : (
        <View style={styles.image}></View>
    );
    const authorName = authorData?.name;



    return (
        <View style={styles.card}>
            <Text style={styles.textTitle}>{authorName}</Text>
            <View>{coverJSX}</View>
        </View>
    );
};