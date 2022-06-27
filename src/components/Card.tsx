import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export type CardProps = {
  id: string;
  name: string;
  pills: string;
  date: string;
}
type Props = {
  data: CardProps;
  onPress: () => void;
}


export function Card({ data, onPress }: Props
  ) {

  return (
    <>
       <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>
          
              <Text style={styles.password}>
                {data.pills}
              </Text>
              
              <Text style={styles.email}>
                {data.date}
              </Text>
        </View>
      </View>
              <Text style={styles.hour}>
                07:24
              </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="delete"
          size={22}
          color={colors.red}
        />
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: colors.shape,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.shape,
    borderWidth: 1,
    paddingLeft: 22,
    marginBottom: 8,
    borderRadius: 4,
    marginTop:  20
  },
  content: {
    flex: 1,
    padding: 22,
  },
  title: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3D434D',
    fontWeight: 'bold',
  },
  email: {
    color: '#888D97',
    fontSize: 13,
  },
  password: {
    color: '#1967FB',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    height: 80,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  },
  hour: {
    fontSize: 16,
    color: colors.red,
    padding: 10,
    fontFamily: fonts.text
  }
})
