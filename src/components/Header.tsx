import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImage from "../../assets/user.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { UserNameProps } from "../pages/UserIdentification";

export function Header({ data, onPress }: Props) {
  const [dataTem, setDataTem] = useState<UserNameProps[]>([]);

  async function handleFetchData() {
    const response = await AsyncStorage.getItem("@todopills:userName");
    const dataTem = response ? JSON.parse(response) : [];
    // console.log({ dataTem });

    setDataTem(dataTem);
    console.log("Aqui o data", dataTem);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  //  dataTem.find((item) => item.nameUser.trim());

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.greeting}>Olá,</Text>
          {/* <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
            <Text style={styles.userName}>
              {data.user}
            </Text>
          }
          /> */}

          <Text style={styles.userName}>
            
            </Text>
        </View>
        <Image source={userImage} style={styles.image} />
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
