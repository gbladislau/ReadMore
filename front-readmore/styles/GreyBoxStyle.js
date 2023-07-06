import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    caixa: {
        marginTop: 12,
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
    text: {
        display: 'flex',
        height: 'auto',
        fontSize: 12,
        color: 'white',
        fontFamily: 'Manjari-regular',
    },
    titleText: {
        display: 'flex',
        height: 'auto',
        width: '100%',
        fontSize: 18,
        color: 'white',
        fontFamily: 'Manjari-Bold',
    }
})