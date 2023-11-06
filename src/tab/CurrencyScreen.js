import React, {Component, useEffect, useState} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Button, Stack, Center,Input } from 'native-base';
import {CustomHeader} from '../index'

export function CurrencyScreen({ navigation, route }) {

    const [al, setAl] = useState('0')
    const [sat, setSat] = useState('0')
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title={route.params.name} navigation={navigation}/>

             


        <Center flex={1} px="3" >
              <Stack
                  mt={3}
                  direction={{base: "row",md: "row" }}
                  w={{ base: "75%", md: "100%", }}
                  space={5}>
                  
 
                  <Stack
                  mt={3}
                  direction={{base: "column",md: "row" }}
                  w={{ base: "50%", md: "25%", }}
                  space={5}>
                  <Text> {route.params.name}</Text>
 
                <Text>Alış: {route.params.alisFiyatı}</Text>
                <Input size="md" placeholder="0 TL" onChangeText={text => setAl(text)} />
                <Text>Toplam: {al*route.params.alisFiyatı}TL</Text>
              </Stack>


              <Stack
                  mt={3}
                  direction={{base: "column",md: "row" }}
                  w={{ base: "50%", md: "25%", }}
                  space={5}>
                  <Text> {route.params.name}</Text>
 
                
                <Text>Satış: {route.params.satisFiyatı}</Text>
                <Input size="md" placeholder="0 TL" onChangeText={text => setSat(text)} />
                
                <Text>Toplam: {sat*route.params.satisFiyatı}TL</Text>
              </Stack>
              </Stack>
          </Center>


        </SafeAreaView>
    );
  }