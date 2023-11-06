import React, {Component, useEffect, useState} from 'react'
import { View, SafeAreaView, TouchableOpacity,ImageBackground,StyleSheet } from 'react-native';
import { NativeBaseProvider, Text, Button, Stack, Center,Input } from 'native-base';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../firebase'


function LoginScreen (props) {


   
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const navigation = useNavigation()

        useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("HomeApp")
            }
          })
      
          return unsubscribe
        }, [])

        const handleLogin = () => {
            auth
              .signInWithEmailAndPassword(email, password)
              .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
              })
              .catch(error => alert(error.message))
          }


        return (
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground source={require('../../assets/login.jpg')} resizeMode="cover" style={styles.image}>
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
                  <Text>Login Screen!</Text>
                  <Input size="md" placeholder="E-Posta" value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
                  <Input size="md" placeholder="Şifre" value={password}  onChangeText={text => setPassword(text)} secureTextEntry style={styles.input}/>
                  <Button onPress={handleLogin}>Giriş Yap</Button>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                      <Text >Hesabın yok mu? Hesap Oluştur.</Text>
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


export {LoginScreen};