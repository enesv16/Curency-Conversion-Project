import React, {Component} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import {IMAGE} from './constants/Image'

export class CustomHeader extends Component {
    render() {
        let {navigation, isHome, title} = this.props
        return (
            <View style={{flexDirection: 'row', height: 70, backgroundColor:'#ffffff',borderWidth: 1,borderColor:'#d8d8d8'}}>
            <View style={{flex: 1, justifyContent: 'center',marginTop:20}}>
                {
                isHome ?
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image style={{width: 30, height: 30, marginLeft: 10}}
                    source={IMAGE.ICON_MENU}
                    resizeMode="contain"/>
                </TouchableOpacity>
                :
                <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => navigation.goBack()}
                >
                    <Image style={{width: 25, height: 25, marginLeft: 10,marginRight:10}}
                    source={IMAGE.ICON_BACK}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                }
            </View>  
                
                <View style={{flex: 1.5, justifyContent: 'center',marginTop:20}}>
                <Text style={{textAlign: 'center',fontSize:18}}>{title}</Text>
                </View>
                <View style={{flex: 1}}></View>
            </View>
  )
    }
}