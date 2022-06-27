import React, { useState } from "react";
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';


import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type UserNameProps = {
  id?: string;
 Object?: {
    nameUser : string
  }
 
}
export type Props = {
  data: UserNameProps;
}

export function UserIdentification({ data }: Props) {
  const [isFocused, setIsFocused]  = useState(false);
  const [ isFilled, setIsFiled ]  = useState(false);

  const [ nameUser, setNameUser ] = useState<String>();
  

  async function handleNewNameUser()  {
    try{

    const newData = {
      nameUser,
    }

    const response = await AsyncStorage.getItem("@todopills:userName")
    let data;

    if(response){
        let dataStorege= JSON.parse(response)
        dataStorege  = [...dataStorege, newData]
        data = dataStorege
    }else{
        data = [newData]
    }
  
   await AsyncStorage.setItem("@todopills:userName", JSON.stringify(data));
    Toast.show({
      type: 'success',
      text1: 'Nome adicionado com sucesso'
    })
    // console.log(newData);
  }catch(err) {
    console.log(err);

    Toast.show({
      type: 'error',
      text1: 'Não foi possivel cadastrar'
    })
  }
  handleSubmit()
  
  }

  function handlerInputBlur()  {
    setIsFocused(false);
    setIsFiled(!!nameUser);
  }

  function handlerInputFocus()  {
    setIsFocused(true);
  }

  function handlerInputChange(value: string) {
      setIsFiled(!!value);
      setNameUser(value);



  }

  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate('Confirmation');
  }



  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback 
          onPress={Keyboard.dismiss}
          >
            <View style={styles.content}>
              <View style={styles.forms}>
                <View style={styles.header}>
                  <Text style={styles.emoji}>
                    { isFilled ? '😄' : '😃' }
                    </Text>
                  <Text style={styles.title}>
                    Como podemos {"\n"}
                    chamar você?
                  </Text>
                </View>
                <TextInput style={[
                  styles.input,
                  (isFocused || isFilled) && 
                  { borderColor: colors.green }
                ]} 
                placeholder="Digite o nome"
                onBlur={handlerInputBlur}
                onFocus={handlerInputFocus}
                onChangeText={handlerInputChange}
                />

                <View style={styles.footer}>
                  <Button
                    title="Confirmar"
                    onPress={handleNewNameUser}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },

  title: {
    fontSize: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  header: {
    alignItems: "center",
  },

  forms: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },

  emoji: {
    fontSize: 45,
  },

  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,

  }
});
