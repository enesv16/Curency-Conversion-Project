import React, {Component} from 'react'
import { Text, View, SafeAreaView, TouchableOpacity,FlatList } from 'react-native';
import {getDoviz} from '../utils/api';
import {RVText} from '../core'

export class EurLayout extends Component {
  
    state = {
        loading: false,
        error: false,
        alis: 0,
        satis: 0,
        isim: '',
      };


    componentDidMount() {
        this.Updatedoviz(this.props.name);
      }
    
      Updatedoviz = async name => {
        if (!name) return;
    
        this.setState({ loading: true }, async () => {
          try {
            const {alis,satis,isim} = await getDoviz(name);

            this.setState({
              loading: false,
              error: false,
              alis,
              satis,
              isim,
            });
          } catch (e) {
            this.setState({
              loading: false,
              error: true,
            });
          }
        });
      };

    render() {
      const navigation = this.props.navigation;
      
      const {
        loading,
        error,
        alis,
        satis,
        isim,
      } = this.state;
     
      return(
        <View style={{ flex: 1, flexDirection: "column" ,justifyContent: "space-around", margin: 5}}>
          <View style={{flex: 1, flexDirection: "column", alignItems: "center", justifyContent:"center", backgroundColor:"steelblue",borderTopStartRadius:10,borderTopEndRadius:10}}>
              <TouchableOpacity onPress={() => navigation.navigate('Currency', {name:isim,alisFiyatı:alis,satisFiyatı:satis})}>
                <RVText style={{color:"white"}} content={isim}/>
 
              </TouchableOpacity> 

              </View>
        <View style={{ flex: 1, flexDirection: "row",justifyContent: "space-around"}}>
            
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor:"powderblue"}}>
                <Text >
                 Alış
                </Text>
            </View>

            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor:"skyblue"}}>
              <Text>
                {alis}
              </Text>
            </View>

 
        </View>
        <View style={{ flex: 1, flexDirection: "row",justifyContent: "space-around"}}>
            
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor:"powderblue",borderBottomStartRadius:10}}>
                <Text>
                Satış
                </Text>
            </View>

            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor:"skyblue",borderBottomEndRadius:10}}>
              <Text>
                {satis}
              </Text>
            </View>

 
        </View>
        </View>
      );
    }
}

