import Hyperlink from 'react-native-hyperlink'
import { styles } from '../styles/GreyBoxStyle';
import { Text, View } from 'react-native';

export default function DescriptionBox({ descriptionString }) {
    let component = <Text style={styles.text}>Indisponível</Text>;
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

