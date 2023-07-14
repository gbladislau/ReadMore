import { Text,TextInput, View, StyleSheet} from "react-native";

/**
 * CAIXA QUE RECEBE O INPUT PARA A PESQUISA DE UM LIVRO
 * @returns CAIXA DE INPUT
 */
export default function InputBox ({inputName, inputSet, secureTextEntry}){
  return(
        <View style={styles.inputView}>
         <TextInput
            style={styles.TextInput}
            placeholder={inputName}
            placeholderTextColor="#003f5c"
            cursorColor='black'
            secureTextEntry={secureTextEntry}
            onChangeText={(input) => inputSet(input)}
        />
      </View>
  );
}
/**
* Consulta os dados do autor para confirma a presença de uma foto
*/
const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#4ADEDE",
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginBottom: 20,
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
      },

});