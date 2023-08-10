import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LikeAtom } from "../recoil/Atom";
import { useRecoilState } from "recoil";

export default function Items({ item }) {
  const [like, setLike] = useRecoilState(LikeAtom);
  const likePress = (nail_id) => {
    if (like.includes(nail_id)) {
      const updatedList = like.filter((id) => id !== nail_id);
      setLike(updatedList);
    } else {
      setLike([...like, nail_id]);
    }
  };
  return (
    <Item key={item.nail_id}>
      <Image source={{ uri: item.thumb_image }} />
      <InfoContainer>
        <Info>
          <Title>{item.shop.name}</Title>
          <Location>{item.shop.location}</Location>
        </Info>
        <ImageContainer onPress={() => likePress(item.nail_id)}>
          {like.includes(item.nail_id) ? (
            <Ionicons name="heart" size={22} color="red" />
          ) : (
            <Ionicons name="heart-outline" size={22} color="red" />
          )}
        </ImageContainer>
      </InfoContainer>
    </Item>
  );
}

const Item = styled.View`
  width: 163.5px;
  height: 197.5px;
  margin: 10px;
`;
const ImageContainer = styled.TouchableOpacity``;
const Image = styled.Image`
  width: 163.5px;
  height: 163.5px;
  border-radius: 4px;
`;
const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.View`
  justify-content: center;
  height: 34px;
`;
const Title = styled.Text`
  font-size: 13px;
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: darkgray;
`;
