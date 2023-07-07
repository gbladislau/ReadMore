import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink'
import { styles } from '../styles/GreyBoxStyle';

export default function BioBox({ bioString }) {
    let component = <Text style={styles.text}>Indisponível</Text>;

    if (bioString) {
        component = (
            <Hyperlink linkDefault={true} linkStyle={
                {
                    color: 'blue',
                    textDecorationLine: 'underline',
                }}>
                <Text style={styles.text}>{bioString}</Text>
            </Hyperlink>
        );
    }

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Bio:</Text>
            {component}
        </View>
    );
}