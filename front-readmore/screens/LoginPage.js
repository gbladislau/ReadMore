import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function LoginPage (){
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.login_text}>Login</Text>

            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    titleRectangle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        height: 82,
        top: 60,
        backgroundColor: '#2938C4',
        borderRadius: 99,
      },

    container:{
        width: 300,
        height: 400,
        borderRadius: 48,
        
        alignContent: 'center',
    },

    login_text:{
        position: 'absolute',
        left: 127,
        top: 262,
        
        //fontFamily: 'Manjari',
        fontStyle: 'normal',
        fontSize: 36,
        
        color: '#000000',
    }
})
