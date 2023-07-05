import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export default function SubjectsList({ subjectsArray }) {


    var component= <View></View>;
    if (subjectsArray) {
        console.log(subjectsArray);
        component = subjectsArray.map((item, i) => {
            return <Text id={i} style={styles.text}>{item} , </Text>;
        })
    }

    return (
        <View style={styles.caixa}>
            <Text style={styles.titleText}>Gêneros:</Text>
            {component}
        </View>
    );
}

const styles = StyleSheet.create({
    caixa: {
        marginTop:12,
        paddingLeft: 12,
        paddingTop: 6,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'grey',
        borderRadius: 20,
        marginLeft: 6,
        marginRight: 6,

    },
    text:{
        display: 'flex',
        height: 'auto',
        fontSize: 12,
        color:'yellow',
        fontFamily: 'Manjari-regular',
    },
    titleText:{
        display: 'flex',
        height: 'auto',
        width:'100%',
        fontSize:18,
        color:'white',
        fontFamily: 'Manjari-regular',
    }
})