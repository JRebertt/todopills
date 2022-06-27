import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Platform, Alert, TouchableOpacity } from  'react-native';
import { getBottomSpace } from "react-native-iphone-x-helper";
import DataTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from "date-fns";
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from "../components/Button";

import waterDrop  from '../assets/waterdrop.png'
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Input } from "../components/Input";



export function MedSave() {

  const [ selectedDateTime, setSelectedDateTime ]  = useState(new Date());
  const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS  == 'ios');

  const [ name, setName ] = useState('');
  const [ pills, setPills ] = useState('');
  const [ date, setDate ] = useState('');

 async function handleNew()  {
    try{
      const id = uuid.v4();

    const newData = {
      id,
      name,
      pills,
      date
    }

    const response = await AsyncStorage.getItem("@todopills:pills")
    let data;

    if(response){
        let dataStorege= JSON.parse(response)
        dataStorege  = [...dataStorege, newData]
        data = dataStorege
    }else{
        data = [newData]
    }
  
   await AsyncStorage.setItem("@todopills:pills", JSON.stringify(data));
    Toast.show({
      type: 'success',
      text1: 'Pills adicionado com sucesso'
    })
    console.log(newData);
  }catch(err) {
    console.log(err);

    Toast.show({
      type: 'error',
      text1: 'Não foi possivel cadastrar'
    })
  }
  }

  function handleChangeTime(_: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState)
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma data no futuro! ⏰ ')
    }

    if(dateTime)
      setSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  return(
    <View style={styles.container}>
      <View style={styles.medInfo}>
        {/* <Text style={styles.medName}>
          Nome do Remedio
        </Text>

        <Text style={styles.medAbout}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Rem cum ea laborum nihil reprehenderit nulla, nemo quae eligendi laboriosam hic, 
          quis, ad voluptas nostrum error. Ex nostrum praesentium ut consequatur!
        </Text> */}
        <View style={styles.containerInput}>
          <Input
          label="Nome do Remedio"
          onChangeText={setName}
          />

          <Input
          label="Quantos Comprimidos"
          onChangeText={setPills}
          />

          <Input
          label="Quantos dias"
          onChangeText={setDate}
          />
        </View>
      </View>



      <View style={styles.controller}>
        <View style={styles.tipsContainer}>

          <Image source={waterDrop}
          style={styles.tipImage}
          />

          <Text style={styles.tipText}>
          Lembre de beber bastante água!
          </Text>
        </View>

        <Text style={styles.alertLabel}>
        Ecolha o melhor horário para ser lembrado:
        </Text>

        {
        showDatePicker && (
          <DataTimePicker
          value={selectedDateTime}
          mode= "time"
          display= "spinner"
          onChange={handleChangeTime}
          />
        )
        }

        {
          Platform.OS === 'android' &&  (
            <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                { `Mudar ${format(selectedDateTime, 'HH:mm')}` }
              </Text>
            </TouchableOpacity>
          )
        }

        <Button 
          title= "Cadastrar Medicamento"
          onPress={handleNew}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  medInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical:  50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },

  medName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  medAbout: {
    textAlign: "center",
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },

  containerInput: {
    width: "100%",
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal:  20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,

  },

  tipsContainer:  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  }, 
  
  tipImage: {
    width: 56,
    height: 56,
  }, 
  
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  }, 
  
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complemented,
    color: colors.heading,
    fontSize: 15,
    marginBottom: 5,
  },

  dateTimePickerButton: {
    width: "100%",
    alignItems: 'center',
    paddingVertical: 40,
  },

  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.heading,
  }
})