import React, {Component, useEffect, useState} from 'react'
import { View, SafeAreaView, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import { NativeBaseProvider, Text, Button, Stack, Center,Input } from 'native-base';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../firebase'
import {CustomHeader} from '../index'


function SignOutScreen (props) {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Çıkış" isHome={true} navigation={navigation}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                  <Text style={styles.buttonText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
  )
}


export {SignOutScreen}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
