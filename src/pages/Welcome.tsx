import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import { Feather } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import wateringImg from "../assets/watering.png";

export function Welcome() {

  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('LoginUser');
  }
  
  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={style.wrapper}>
          <Text style={style.title}>
            Gerencie {"\n"}
            seus medicamentos {"\n"}
            de forma fácil
          </Text>

          <Image
            style={style.image}
            source={wateringImg}
            resizeMode="contain"
          />

          <Text style={style.subtitle}>
            Não esqueça mais de tomar seus medicamentos.
            Nós cuidamos de lembrar você sempre dos seus remdios.
          </Text>

          <TouchableOpacity 
          style={style.button} 
          activeOpacity={0.8}
          onPress={handleStart}
          >
            <Feather name="chevron-right" style={style.buttonIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal:  20,
  },

  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 38,
    color: colors.heading,
    lineHeight: 34,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: "#5C6660",
  },

  button: {
    backgroundColor: "#32B768",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },

  image: {
    height: Dimensions.get("window").width * 0.7,
  },
});
