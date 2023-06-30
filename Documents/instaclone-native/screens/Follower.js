import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dummy from "../dummy/follow.json";
import { FlatList, Image, Text } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 352px;
  height: 36px;
  padding: 10px;
  margin-left: 15px;
  background-color: #c8dbff;
  border-radius: 5px;
  margin-bottom: 22px;
`;

const TextInput = styled.TextInput`
  margin-left: 5px;
`;

const FollowerItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 22px;
`;
const ProfileHeader = styled.View`
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const ProfilePicture = styled.Image`
  width: 46px;
  height: 46px;
  border-radius: 50px;
  background-color: gray;
`;

export default function Follower() {
  const [userList, setUserList] = useState(dummy.content);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const infos = dummy.content || [];
    setUserList(infos);
  }, [dummy.content]);

  const performSearch = (query) => {
    const filteredList = dummy.content.filter((info) =>
      info.name.toLowerCase().includes(query.toLowerCase())
    );
    setUserList(filteredList);
  };

  const renderItem = ({ item: info }) => {
    return (
      <FollowerItem key={info.userId}>
        <ProfileHeader>
          <ProfilePicture source={{ uri: info.profileImage }} />
        </ProfileHeader>
        <Text>{info.name}</Text>
      </FollowerItem>
    );
  };

  return (
    <Container>
      <SearchContainer>
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../assets/search.png")}
        />
        <TextInput
          placeholder="아이디"
          placeholderTextColor="#84ADFF"
          value={searchQuery}
          onChangeText={(query) => {
            setSearchQuery(query);
            performSearch(query);
          }}
        />
      </SearchContainer>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.userId}
        renderItem={renderItem}
      />
    </Container>
  );
}
