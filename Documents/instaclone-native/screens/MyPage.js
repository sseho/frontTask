import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import dummy from "../dummy/travalSimpleInfo.json";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
`;

const UserInfo = styled.View`
  width: 100%;
  height: 92px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ProfileHeader = styled.View`
  align-items: center;
`;
const Follow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ProfilePicture = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  background-color: gray;
`;

const ProfileInfo = styled.View`
  align-items: center;
`;

const Bio = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px;
  border-bottom-width: ${(props) => (props.isActive ? "2px" : "0px")};
  border-bottom-color: ${(props) => (props.isActive ? "blue" : "transparent")};
`;

const TabText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const TabContent = styled.View`
  justify-content: space-around;
  margin-top: 20px;
`;

const PathText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const SaveIcon = styled.View`
  width: 20px;
  height: 20px;
  background-color: blue;
`;
const Box = styled.View`
  padding: 5px;
`;

const TravelSimpleInfo = styled.View`
  width: 353px;
  height: 124px;
  border: 1px;
  border-color: #d9d9d9;
`;

const Title = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #eef4ff;
  width: 100%;
  height: 33px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

const LocationList = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

const DateAddress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
  margin: 5px;
`;

export default function MyPage({ navigation }) {
  const [activeTab, setActiveTab] = useState("Path");
  const [simplePost, setSimplePost] = useState(dummy.content);

  useEffect(() => {
    const posts = dummy.content || [];
    setSimplePost(posts);
  }, []);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  axios
    .get("http://example.com/api/data")
    .then((response) => {
      // 받아온 데이터를 처리합니다.
      const data = response.data;
      console.log(data); // JSON 데이터 출력 예시
    })
    .catch((error) => {
      // 에러 처리
      console.error(error);
    });

  return (
    <Container>
      <UserInfo>
        <ProfileHeader>
          <ProfilePicture source={require("../assets/instalogo.png")} />
        </ProfileHeader>
        <Follow>
          <TouchableOpacity onPress={() => navigation.navigate("Follower")}>
            <Box>
              <Text>팔로워</Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Following")}>
            <Box>
              <Text>팔로잉</Text>
            </Box>
          </TouchableOpacity>
        </Follow>
      </UserInfo>
      <ProfileInfo>
        <Bio>#Software Engineer | Travel Enthusiast | Coffee Lover</Bio>
      </ProfileInfo>
      <TabContainer>
        <TabButton
          isActive={activeTab === "Path"}
          onPress={() => handleTabPress("Path")}
        >
          <TabText>경로</TabText>
        </TabButton>
        <TabButton
          isActive={activeTab === "Saved"}
          onPress={() => handleTabPress("Saved")}
        >
          <TabText>저장</TabText>
        </TabButton>
      </TabContainer>
      {activeTab === "Path" && (
        <TabContent>
          {simplePost.map((post) => (
            <TravelSimpleInfo key={post.tripId}>
              <Title>
                <Logo
                  resizeMode="contain"
                  source={require("../assets/navigation.png")}
                />
                <Text>{post.title}</Text>
              </Title>
              <LocationList>
                {post.locationInfoList.map((location, index) => (
                  <Text key={index}>{location}</Text>
                ))}
              </LocationList>
              <DateAddress>
                <Text>{post.createdDate}</Text>
                <Text>{post.address}</Text>
              </DateAddress>
            </TravelSimpleInfo>
          ))}
        </TabContent>
      )}
      {activeTab === "Saved" && (
        <TabContent>
          <SaveIcon />
          <SaveIcon />
        </TabContent>
      )}
    </Container>
  );
}
