import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center'
  }
  });

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getQuotes = async () => {
    try{
      const response = await fetch('https://api.fisenko.net/v1/quotes/en/random');
      const json = await response.json();
      console.log("The random text is : "+json.text);
      setData(json);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuotes();
    }, []);

    return (
        <View style={{flex: 1,
                 backgroundColor: '#76c4fa'
                 }}>
                 <Header
                  centerComponent={{text:"QUOTES", style:{color:'#fff', fontSize: 20}}}/>
                 <View style={{flex: 5, justifyContent: "center", alignItems: "center", marginHorizontal: 20}}>
                   {isLoading ? <ActivityIndicator/> : <Text style = {{fontSize: 20}}>{data.text}{"\n\n"}Author: {data
                     .author.name}</Text>}
                     </View>
                     <View style = {{margin: 20, alignItems: "center"}}>
                     <Icon.Button
                     name="quote-left"
                     onPress={()=>getQuotes()}>
                     QUOTE
                     </Icon.Button>
                     </View>
                     </View>
                     //</View>
      );
    };
    export default App;
