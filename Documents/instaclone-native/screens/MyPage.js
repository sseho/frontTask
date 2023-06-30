import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import dummy from "../dummy/travalSimpleInfo.json";
import dUserInfo from "../dummy/userInfo.json";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
`;

const UserInfo = styled.View`
  width: 100%;
  height: 92px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-left: 30px;
`;
const Follow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const FollowItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 32px;
`;

const ProfilePicture = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  background-color: gray;
`;

const ProfileInfo = styled.View`
  justify-content: center;
  width: 100%;
  height: 38px;
`;

const Bio = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 11px;
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
  flex: 1;
  width: 100%;
`;

const PathText = styled.Text`
  font-size: 22px;
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
  margin-bottom: 12px;
  margin-left: 16px;
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

const LocationList = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
})`
  width: 100%;
  padding: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

const Location = styled.View`
  flex-direction: row;
  align-items: center;
  flex-shrink: 1;
`;

const DateAddress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
  margin: 5px;
`;

const File = styled.Image`
  width: 24px;
  height: 24px;
  margin: 5px;
`;

const MapContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-left: 7px;
`;

const Map = styled.View`
  width: 170px;
  height: 176px;
  margin-left: 10px;
  margin-bottom: 16px;
  border: 1px;
  border-radius: 5px;
`;

export default function MyPage({ navigation }) {
  const [activeTab, setActiveTab] = useState("Path");
  const [simplePost, setSimplePost] = useState(dummy.content);
  const [userInfo, setUserInfo] = useState(dUserInfo);

  useEffect(() => {
    const posts = dummy.content || [];
    setSimplePost(posts);
  }, [dummy.content]);

  useEffect(() => {
    const info = dUserInfo || [];
    setUserInfo(info);
  }, [dUserInfo]);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  // axios
  //   .get("http://example.com/api/data")
  //   .then((response) => {
  //     // 받아온 데이터를 처리합니다.
  //     const data = response.data;
  //     console.log(data); // JSON 데이터 출력 예시
  //   })
  //   .catch((error) => {
  //     // 에러 처리
  //     console.error(error);
  //   });

  const renderItem = ({ item: post }) => {
    return (
      <TravelSimpleInfo key={post.tripId}>
        <Title>
          <Logo
            resizeMode="contain"
            source={require("../assets/navigation.png")}
          />
          <Text>{post.title}</Text>
        </Title>
        <LocationList horizontal>
          {post.locationInfoList.map((location, index) => (
            <Location key={index}>
              {index === 0 ? null : (
                <Logo
                  resizeMode="contain"
                  source={require("../assets/vector2.png")}
                />
              )}
              <Text key={index}>{location}</Text>
            </Location>
          ))}
        </LocationList>
        <DateAddress>
          <Text>{post.createdDate}</Text>
          <Text>{post.address}</Text>
        </DateAddress>
      </TravelSimpleInfo>
    );
  };

  return (
    <Container>
      <UserInfo>
        <ProfileHeader>
          <ProfilePicture source={{ uri: userInfo.profileImageUrl }} />
        </ProfileHeader>
        <Follow>
          <FollowItem onPress={() => navigation.navigate("Follower")}>
            <Text>팔로워</Text>
            <Text>{userInfo.followerCount}</Text>
          </FollowItem>
          <FollowItem onPress={() => navigation.navigate("Following")}>
            <Text>팔로잉</Text>
            <Text>{userInfo.followingCount}</Text>
          </FollowItem>
        </Follow>
      </UserInfo>
      <ProfileInfo>
        <Bio>{userInfo.description}</Bio>
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
          <FlatList
            data={simplePost}
            keyExtractor={(item) => item.tripId}
            renderItem={renderItem}
          />
        </TabContent>
      )}
      {activeTab === "Saved" && (
        <TabContent>
          <MapContainer>
            <Map>
              <Text>map</Text>
            </Map>
            <Map>
              <Text>map</Text>
            </Map>
            <Map>
              <Text>map</Text>
            </Map>
          </MapContainer>
        </TabContent>
      )}
    </Container>
  );
}
