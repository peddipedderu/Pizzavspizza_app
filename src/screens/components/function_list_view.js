import React, { useState, useEffect } from "react";
import client from "./../../api/client";
import { StyleSheet,  SafeAreaView, Text, Image, TouchableOpacity, FlatList, View } from "react-native";
import Card from "./shared/card";


const ListView = ({ navigation }) => {
  const [data, setData] = useState([]);

  const getList = async () => {
    const response = await client.get("/api");
    setData(response.data);
  };
    
  useEffect(() => {
    getList();
  }, []);
  
  const mytext = "by ProgramWithUs"
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", { 
                    objurl: item.absolute_url, 
                  });
                }}
              >
                <Card
                  logo={item.logo_image}
                  title={item.pizzeria_name}
                  details={item.city}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    padding: 20,
  },
}); 
export default ListView;
