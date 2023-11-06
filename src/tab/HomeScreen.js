import React, {Component,useState,useEffect} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity ,FlatList} from 'react-native';
import {  Button } from 'native-base';
import {CustomHeader} from '../index'
import {RVText} from '../core'
import {EurLayout} from '../layout/eurlayout';
import { auth ,dbfirestore } from '../../firebase'
import {Image} from 'react-native'


export function HomeScreen({ navigation, route }) {
        const [name, setName] = useState('')
        const [lastName, setLastName] = useState('')
        const [balance, setBalance] = useState('')

        const Name= async()=>{
          let doc  = await dbfirestore.collection('users').doc(auth.currentUser.uid).get()
          let dataObj = doc.data();
          setName(dataObj.firstName);
          setLastName(dataObj.lastName);
          setBalance(dataObj.balance);
        }

        useEffect(() => { Name(); },[]);
        return (
    
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader title="Ana Sayfa" isHome={true} navigation={navigation} />
                
                
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                  
                <View style={{flex: 1, backgroundColor: 'white' ,flexDirection: "column" ,justifyContent: "center",alignItems:"center", margin: 5 ,width:"90%", borderRadius:10 }}  >
                
                <Text>Hoşgeldin {name} {lastName} </Text>
                <Text>Bakiye {balance} </Text>
               
                <Image source={require('../../assets/favicon.png')} style={{width:50,height:50,resizeMode:'contain'}} />
               
                </View>


                  <View style={{ flex: 1, flexDirection: "row" ,justifyContent: "space-around"}}>
                    <EurLayout navigation={navigation} name={'USD'}/>
                    <EurLayout navigation={navigation} name={'EUR'}/>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" ,justifyContent: "space-around"}}>
                    <EurLayout navigation={navigation} name={'AUD'}/>
                    <EurLayout navigation={navigation} name={'JPY'}/>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" ,justifyContent: "space-around"}}>
                    <EurLayout navigation={navigation} name={'CAD'}/>
                    <EurLayout navigation={navigation} name={'CHF'}/>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" ,justifyContent: "space-around"}}>
                    <EurLayout navigation={navigation} name={'GBP'}/>
                    <EurLayout navigation={navigation} name={'NOK'}/>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" ,justifyContent: "space-around"}}>
                    <EurLayout navigation={navigation} name={'SAR'}/>
                    <EurLayout navigation={navigation} name={'SEK'}/>
                  </View>
                  <View style={{flex: 1, backgroundColor: 'white'}} />
                
                
                </View>
                
            </SafeAreaView>
        );
}




