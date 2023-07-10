import { Text,TextInput, View, StyleSheet} from "react-native";

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