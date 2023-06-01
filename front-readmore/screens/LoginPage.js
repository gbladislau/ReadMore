import { SafeAreaView, StyleSheet, View } from "react-native/types";

const LoginPage = () =>{
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.login_text}>Login</Text>

            </View>
        </SafeAreaView>
    );
}
export default LoginPage;

const styles = StyleSheet.create({
    page:{

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
