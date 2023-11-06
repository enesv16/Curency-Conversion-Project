import React, {Component} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {  Button } from 'native-base';
import {CustomHeader} from '../index'
import {RVText} from '../core'

export class SettingsScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 ,alignItems : "center",justifyContent:"center"}}>
            <CustomHeader title="Hazırlayanlar" isHome={true} navigation={this.props.navigation}/>
            <View style={{flex:2}}></View>
            <View style = {{textAlign: "center", flexDirection: "column"}}>
                <Text style ={{fontSize: 35, fontWeight:'bold'}}>
                    Hazırlayanlar
                </Text>
            </View>
            <View style={{flex:1}}></View>
            <View style = {{textAlign: "center", flexDirection: "column"}}>
                <Text style ={{fontSize: 30}}>
                    Hüseyin Burhan BAŞARAN
                </Text>
            </View>
            <View style={{flex:1}}></View>
            <View >
                <Text style ={{fontSize: 30}}>
                    Muhammet Enes VARDAR
                </Text>
            </View>
            <View style={{flex:1}}></View>
            <View >
                <Text style ={{fontSize: 30}}>
                    Ahmet Mete DOKGÖZ
                </Text>
            </View>
            <View style={{flex:3}}></View>
            </SafeAreaView>
        );
    }
}