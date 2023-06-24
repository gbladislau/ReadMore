import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import InputBox from "../components/InputBox";

export default function LoginPage (){

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username,
                               password:password })
    };

    const postLogin = async () => {
        try{
            var response = await fetch('http://128.0.1:8000/', requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para 'http://128.0.1:8000/' HTTP ${response.status}`);
                var responseJSON
                try{ responseJSON = await response.json();}
                catch(erro){}
                navigation.navigate("UserHome");
            }
            else {
                console.log(`Falha na requisição ${requestOptions["method"]} para 'http://128.0.1:8000/' HTTP ${response.status}`);
            }

        }
        catch (erro){
            console.log(`Erro no ${requestOptions["method"]} em http://128.0.1:8000/ body:${requestOptions['body']}`);
            navigation.navigate("UserHome");
        }
    }

    return(
        <SafeAreaView style={styles.container_dft}>

            <View style={styles.cadastroRetangulo}>
                <Text style={styles.cadatroText}>Login</Text>
            </View>

                <InputBox inputName="Username" inputSet={setUsername} secureTextEntry={false}/>

                <InputBox inputName="Password" inputSet={setPassword} secureTextEntry={true}/>

                <TouchableOpacity style={styles.loginBtn} onPress={postLogin}>
                    <Text style={styles.loginText}>Fazer Login</Text> 
                </TouchableOpacity>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

      cadatroText:{
 
        position: 'relative',  
        fontFamily: 'Manjari-Bold',
        fontSize: 52,
        color: 'white',
            
    },

      container_dft: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        flex: 1,
      },

      inputView: {
        backgroundColor: "#4ADEDE",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
      },

      loginBtn:
      {
        width:"80%",
        borderRadius:25,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:3,
        backgroundColor:"#2938C4",
      },

      cadastroRetangulo:
      {
        width:"90%",
        borderRadius:30,
        height:70,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:70,
        backgroundColor:"#2938C4",
      },

      loginText:{
        position: 'absolute',

        fontFamily: 'Manjari-regular',
        fontStyle: 'normal',
        fontSize: 20,
        color: 'white',
        
      }
})
