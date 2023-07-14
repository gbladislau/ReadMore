import Hyperlink from 'react-native-hyperlink'
import { styles } from '../styles/GreyBoxStyle';
import { Text, View } from 'react-native';

/**
 * BOX COM A DESCRIÇÃO DO LIVRO PESQUISADO
 * @returns BOX DE DESCRIÇÃO
 */
export default function DescriptionBox({ descriptionString }) {
    let component = <Text style={styles.text}>Indisponível</Text>;
    /**
     * Recebe os dados da descrição, caso exista, em formato JSON e trata os dados retornando uma caixa contendo a descrição do livro
     */
    if(descriptionString?.value) descriptionString = descriptionString.value;
    if (descriptionString) {
        component = (
            <Hyperlink linkDefault={true} linkStyle={ 
                { color: 'blue',
                textDecorationLine: 'underline',}}>
                <Text style={styles.text}>{descriptionString}</Text>
            </Hyperlink>
        );
    }

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Descrição:</Text>
            {component}
        </View>
    );
}

