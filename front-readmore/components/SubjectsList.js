import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/GreyBoxStyle';

/**
 * LISTA COM TODOS OS GÊNEROS DO LIVRO PESQUISADO
 * @returns LISTA DE GÊNEROS
 */
export default function SubjectsBox({ subjectsArray }) {


    var component= <View></View>;
    if (subjectsArray) {
        //console.log(subjectsArray);
        subjectsArray.sort()
        component = subjectsArray.map((item, i) => {
            return <Text key={i} style={styles.text}>{item} , </Text>;
        })
    }

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Gêneros:</Text>
            {component}
        </View>
    );
}

