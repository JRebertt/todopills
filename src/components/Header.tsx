import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImage from "../../assets/user.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { TouchableOpacity } from "react-native-gesture-handler";

export function Header() {
  const [dataTem, setDataTem] = useState<any>(null);

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("@todopills:userName");
    if (!response) return null;
    setDataTem(JSON.parse(response));
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.greeting}>Olá,</Text>

          <FlatList
            data={dataTem}
            keyExtractor={(item) => item.nameUser}
            renderItem={({ item }) => (
              <Text style={styles.userName}>
                {item.nameUser}
              </Text>

            )}
          />
        </View>
        <Image source={userImage} style={styles.image}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
