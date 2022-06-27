import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  function handlerInputBlur() {
    setIsFocused(false);

  }

  function handlerInputFocus() {
    setIsFocused(true);
  }

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          (isFocused) && { borderColor: colors.green },
        ]}
        {...rest}
        onBlur={handlerInputBlur}
        onFocus={handlerInputFocus}
        // onChangeText={handlerInputChange}
      />
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>


    // <View>
    //   <Text style={styles.label}>
    //     {label}
    //   </Text>

    //   <TextInput style={styles.input} {...rest} />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    fontFamily: fonts.heading,
  },
  label: {
    fontSize: 20,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 30,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.heading,
    fontSize: 18,
    marginTop: 10,
    padding: 10,
    textAlign: "center",
  },
});
