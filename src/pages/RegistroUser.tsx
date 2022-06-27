import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid'
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";

export type UserProps = {
  id: string;
  senha: string;
  email: string;
  telefone: number;
  endereço: string;
  sexo: string;
  idade: string;
}
type Props = {
  data: UserProps;
  onPress: () => void;
}

export function RegistroUser({ data, onPress }: Props) {

  const [senha, setSenha]  = useState('');
  const [email, setEmail]  = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereço, setEndereco]  = useState('');
  const [sexo, setSexo]  = useState('');
  const [idade, setIdade]  = useState('');

  async function handleNewUser()  {
    try{
      const id = uuid.v4();

    const newData = {
      id,
      email,
      senha,
      telefone,
      endereço,
      sexo,
      idade
    }

    const response = await AsyncStorage.getItem("@todopills:user")
    let data;

    if(response){
        let dataStorege= JSON.parse(response)
        dataStorege  = [...dataStorege, newData]
        data = dataStorege
    }else{
        data = [newData]
    }
  
   await AsyncStorage.setItem("@todopills:user", JSON.stringify(data));
    Toast.show({
      type: 'success',
      text1: 'Usuario adicionado com sucesso'
    })
    console.log(newData);
  }catch(err) {
    console.log(err);

    Toast.show({
      type: 'error',
      text1: 'Não foi possivel cadastrar'
    })
  }

  handleLogin()
  
  }

  const navigation = useNavigation();
  function handleLogin(){

    navigation.navigate('LoginUser');
  }


  return (
    <>
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Cadastro de Usuario
          </Text>
        <View>
          <Input label="Email" 
          style={styles.input}
          onChangeText={text => setEmail(text.trim())}
          />


          <Input label="Senha" 
          style={styles.input}
          onChangeText={setSenha}

          />

          <Input label="Confirmar Senha" 
          style={styles.input}
          onChangeText={setSenha}

          />
        </View>

        <View>
          <Input label="Telefone" 
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setTelefone}

          />

          <Input label="Endereço" 
          style={styles.input}
          onChangeText={setEndereco}

          />

          <Input label="Sexo" 
          style={styles.input}
          onChangeText={setSexo}
          />

          <Input label="Idade" 
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={setIdade}
          />
        </View>
        <View style={styles.containerButton}>
          <Button 
          title="Confirmar"
          onPress={handleNewUser}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    color: colors.heading,
    fontFamily: fonts.heading
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 22,
    borderRadius: 6,
    backgroundColor: colors.shape,
  },
  containerButton:  {
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 40
  },
})
