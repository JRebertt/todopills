import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import logoImg  from '../assets/logo.png'
import { UserProps } from "./RegistroUser";
import fonts from "../styles/fonts";
import colors from "../styles/colors";

type Props = {
  data: UserProps;
};

export function LoginUser({ data }: Props) {
  const [dataTem, setDataTem] = useState<UserProps[]>([]);

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("@todopills:user");
    const dataTem = response ? JSON.parse(response) : [];

    setDataTem(dataTem);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  const [inputEmail, setInputEmail] = useState("");
  const [inputSenha, setInputSenha] = useState("");

  function handleLogin(id: string) {
    setInputEmail(inputEmail);
    setInputSenha(inputSenha)

    const Tfind = dataTem.find((item) => inputEmail === item.email.trim() && inputSenha === item.senha.trim() );

    if (Tfind) {
      handleStart()
      console.log("Logado");
    } else {
      alert(`Verifique se o Email e Senha estão corretos!!`)
      console.log("Error, verifique se senha ou o email estão corretos");
    }

  }
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  function handleAddUser(){
    navigation.navigate("RegistroUser");
  }

  function handleDeleDB(){
    AsyncStorage.removeItem("@todopills:user");
    AsyncStorage.removeItem("@todopills:userName");
  }
  
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View>
            <Image
              style={styles.image}
             source={logoImg} />
          </View>
          <View style={styles.input}>

          <Input 
          label="Email" 
          onChangeText={setInputEmail} 
          keyboardType="email-address"
          />

          <Input 
          label="Senha"
          onChangeText={setInputSenha}
          secureTextEntry={true}
          
          />
          </View>

          <View style={styles.button} >
            <Button title="Entrar" onPress={handleLogin} 
            />
          </View>

          <Button title="Cadastrar" onPress={handleAddUser} />

          <View>
            <Button
            style={styles.buttonDelete}
            title="Deletar Banco"
            onPress={handleDeleDB} 
            />
          </View>

        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  container:{
    flex: 1,
    justifyContent: "space-between",
    padding: 20
  },

  input: {
    paddingBottom: 20,
  },

  content: {
    marginTop: 30
  },
  image: {
    width: '100%',
    height: Dimensions.get("window").width * 0.7,
  },
  buttonDelete:{
    fontSize: 16,
    marginVertical: 20,
    color: colors.white,
    fontFamily: fonts.heading,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
  }
});
