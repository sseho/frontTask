import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

const UserInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: 20px;
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
  flex-direction: row;
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

export default function MyPage({ navigation }) {
  const [activeTab, setActiveTab] = useState("Path");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Container>
      <UserInfo>
        <ProfileHeader>
          <ProfilePicture source={require("../assets/instalogo.png")} />
        </ProfileHeader>
        <Follow>
          <Box>
            <Text>투데이</Text>
          </Box>
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
          <PathText>경로</PathText>
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
