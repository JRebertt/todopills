import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { UserProps } from "./RegistroUser";

type Props = {
  data: UserProps;
};

export function LoginUser({ data }: Props) {
  const [dataTem, setDataTem] = useState<UserProps[]>([]);

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("@todopills:user");
    const dataTem = response ? JSON.parse(response) : [];
    // console.log({ dataTem });
    console.log("Dados aqui", dataTem);

    setDataTem(dataTem);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  const [inputEmail, setInputEmail] = useState("");
  function handleLogin(id: string) {
    setInputEmail(inputEmail);

    const Tfind = dataTem.find((item) => inputEmail === item.email.trim());

    if (Tfind) {
      handleStart()
      console.log("Logado");
    } else {
      console.log("deu ruim");
    }

  }
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  function handleAddUser(){
    navigation.navigate("RegistroUser");
  }
  
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View style={styles.input}>

          <Input label="email" onChangeText={setInputEmail} />

          <Input label="senha" />
          </View>

          <View style={styles.button} >
            <Button title="Entrar" onPress={handleLogin} />
          </View>

          <Button title="Cadastrar" onPress={handleAddUser} />

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
  }
});