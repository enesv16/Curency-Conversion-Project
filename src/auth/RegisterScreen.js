import React, {Component, useEffect, useState} from 'react'
import { View, SafeAreaView, TouchableOpacity, Alert ,ImageBackground,StyleSheet} from 'react-native';
import { NativeBaseProvider, Text, Button, Stack, Center,Input } from 'native-base';
import { useNavigation } from '@react-navigation/core'
import {CustomHeader} from '../index'
import {RVText} from '../core'
import { auth ,dbfirestore } from '../../firebase'

function RegisterScreen (props) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("HomeApp")
        }
        })
    
        return unsubscribe
    }, [])

    
    const handleSignUp = () => {
        if(password==password2){
          auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);



            dbfirestore.collection("users")
                .doc(user.uid)
                .set({
                    firstName: name,
                    lastName: lastName,
                    balance: 0,



          });
          })
          .catch(error => alert(error.message))

         
        }else{
            Alert.alert("Alert", "Password does not match.");
        }
        
      }

        return (
            <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Kayıt Ol" navigation={props.navigation}/>
            <ImageBackground source={require('../../assets/register.jpg')} resizeMode="cover" style={styles.image}>

                <Center flex={1} px="3" >
                    <Stack
                        mt={3}
                        direction={{
                            base: "column",
                            md: "row",
                        }}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        space={2}
                        >
                        <Text>Kayıt Ekranı!</Text>
                        <Input size="md" placeholder="Ad" value={name} onChangeText={text => setName(text)} style={styles.input}/>
                        <Input size="md" placeholder="Soyad" value={lastName} onChangeText={text => setLastName(text)} style={styles.input}/>
                        <Input size="md" placeholder="E-posta" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                        <Input size="md" placeholder="Şifre" value={password} onChangeText={text => setPassword(text)}  secureTextEntry style={styles.input}/>
                        <Input size="md" placeholder="Tekrar Şifre" value={password2} onChangeText={text => setPassword2(text)}  secureTextEntry style={styles.input}/>
                        
                        <Button onPress={handleSignUp}> Kayıt Ol</Button>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')} >
                            <Text >Zaten hesabım var. Giriş yap</Text>
                        </TouchableOpacity>
                    </Stack>
                </Center>



            </ImageBackground>
                
            </SafeAreaView>
        );
    
}

const styles = StyleSheet.create({ 
    image: {
      flex: 1,
      justifyContent: "center"
    },
    input:{
        backgroundColor:"#fff"
    }
  });
export{RegisterScreen};