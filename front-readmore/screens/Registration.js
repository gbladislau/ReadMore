import { useState } from "react";
import { Text,TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import InputBox from "../components/InputBox";

export default function Registration (){

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username,
                               email:email,
                               password:password })
    };

    const postCadastro = async () => {t
        try{
            var response = await fetch('http://128.0.1:8000/', requestOptions);
            if (response.ok) {
                console.log(`Sucesso na requisição ${requestOptions["method"]} para 'http://128.0.1:8000/' HTTP ${response.status}`);
                var responseJSON = await response.json(); 
                navigation.navigate("UserHomeScreen");
            }
            else {
                console.log(`Falha na requisição ${requestOptions["method"]} para 'http://128.0.1:8000/' HTTP ${response.status}`);
            }

        }
        catch (erro){
            console.log(`Erro no ${requestOptions["method"]} em http://128.0.1:8000/`);
        }
    }


    return(
        <SafeAreaView style={styles.container_dft}>

            <View style={styles.cadastroRetangulo}>
                <Text style={styles.cadatroText}>Novo Cadastro</Text>
            </View>
            
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        cursorColor='black'
                        onChangeText={(username) => setEmail(username)}
                    />
                </View>

                <InputBox inputName="email" inputSet={setEmail}/>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        cursorColor='black'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={postCadastro}>
                    <Text style={styles.loginText}>Fazer Cadastro</Text> 
                </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    cadatroText:{
 
        position: 'absolute',  
        //fontFamily: 'Manjari',
        fontStyle: 'normal',
        fontSize: 32,
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
        borderRadius:25,
        height:70,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:90,
        backgroundColor:"#2938C4",
      },



      loginText:{
        position: 'absolute',
        
        //fontFamily: 'Manjari',
        fontStyle: 'normal',
        fontSize: 20,
        color: 'white',
        
      }
})