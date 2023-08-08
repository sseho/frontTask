import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Item from "./Item";

export default function Result({ result }) {
  const renderItem = ({ item }) => {
    return <Item key={item.nail_id} item={item} />;
  };
  return (
    <FlatList
      data={result}
      numColumns={2}
      keyExtractor={(item) => item.nail_id}
      renderItem={renderItem}
      contentContainerStyle={{
        width: "100%",
        alignItems: "center",
      }}
      columnWrapperStyle={{
        justifyContent: "flex-start",
      }}
    />
  );
}
