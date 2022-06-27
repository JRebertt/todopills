import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "../components/Header";
import { Card, CardProps } from "../components/Card";
import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function MedSelect() {
  const [data, setData] = useState<CardProps[]>([]);

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("@todopills:pills");
    const data = response ? JSON.parse(response) : [];
    console.log({ data });

    setData(data);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  const navigation = useNavigation();

  function handlerMedSave() {
    navigation.navigate("MedSave");
  }

  function handlerDelete(id: string) {
    const dataTemp = [...data];
    const dataEdit = dataTemp.filter((item: CardProps) => item.id !== id);
    setData(dataEdit);
    const i = JSON.stringify(dataEdit);
    AsyncStorage.setItem("@todopills:pills", i);
  }

  async function handleLogout() {
    await AsyncStorage.removeItem("@todopills:userName");
    navigation.navigate("LoginUser");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />

          <Text style={styles.title}>Em qual Horário</Text>

          <Text style={styles.subtitle}>você quer tomar seus remdios ?</Text>
          <View>
            <Button title="Cadastro de Remedio" onPress={handlerMedSave} />
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card data={item} onPress={() => handlerDelete(item.id)} />
            )}
          />
        </View>
        <View style={styles.containerButton}>
          <Button
          style={styles.buttonLogout}
          title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    lineHeight: 20,
    color: colors.heading,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
    marginBottom: 20,
  },

  contentCards: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 50,
  },

  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    padding: 24,
    paddingBottom: 150,
  },

  buttonLogout: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
  },

  containerButton:{
    padding: 40
  }
});
