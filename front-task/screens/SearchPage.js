import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRecoilState } from "recoil";
import { SearchAtom } from "../recoil/Atom";
import Recommend from "../components/Recommend";
import Result from "../components/Result";

export default function SearchPage() {
  const [searchKeyword, setSearchKeyword] = useState(null); //입력어
  const [recentSearches, setRecentSearches] = useState([]); //최근검색어
  const [recommemdData, setRecommendData] = useState(null); //추천검색어
  const [result, setResult] = useState(null); //검색 결과 데이터

  // 검색어 입력 변경을 처리하는 함수
  const handleSearchInputChange = (text) => {
    setSearchKeyword(text);
  };
  // 뒤로가기, x 클릭시 동작
  const handleDeleteSearchKeyword = () => {
    setSearchKeyword(null);
    setResult(null);
    setRecommendData(null);
  };
  // 최근검색어, 추천검색어 클릭시 동작
  const recommendPress = (keyword) => {
    setSearchKeyword(keyword);
    handleRecommend(keyword);
    fetchResult(keyword);
  };

  // 추천검색어 클릭 함수
  const handleRecommend = (keyword) => {
    if (keyword.trim() !== "") {
      // 새로운 검색어를 최근 검색어 리스트에 추가
      const newSearch = { keyword: keyword, timestamp: Date.now() };
      setRecentSearches((prevSearches) => {
        // 이미 있는 검색어를 가진 요소를 제거하고 다시 추가
        const updatedSearches = prevSearches
          .filter((search) => search.keyword !== keyword)
          .slice(0, 29); // 최대 30개까지만 저장
        return [newSearch, ...updatedSearches];
      });
    }
  };

  // 검색 버튼 클릭을 처리하는 함수
  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      // 새로운 검색어를 최근 검색어 리스트에 추가
      const newSearch = { keyword: searchKeyword, timestamp: Date.now() };
      setRecentSearches((prevSearches) => {
        // 이미 있는 검색어를 가진 요소를 제거하고 다시 추가
        const updatedSearches = prevSearches
          .filter((search) => search.keyword !== searchKeyword)
          .slice(0, 29); // 최대 30개까지만 저장
        return [newSearch, ...updatedSearches];
      });
      fetchResult(searchKeyword);
    }
  };
  // 최근 검색어 삭제 버튼 클릭을 처리하는 함수
  const handleClearRecentSearch = (index) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [...prevSearches];
      updatedSearches.splice(index, 1);
      return updatedSearches;
    });
  };

  useEffect(() => {
    // 만료된 최근 검색어 (10분 이상 경과)를 제거하는 함수
    const removeExpiredSearches = () => {
      const currentTime = Date.now();
      setRecentSearches((prevSearches) =>
        prevSearches.filter(
          (search) => currentTime - search.timestamp <= 600000
        )
      );
    };
    // 1초마다 만료된 검색어 제거 함수를 호출
    const interval = setInterval(removeExpiredSearches, 1000);
    return () => clearInterval(interval);
  }, []);
  // 검색결과 fetch
  const fetchResult = async (keyword) => {
    try {
      const response = await axios.get(
        `https://0x057hq0se.execute-api.ap-northeast-2.amazonaws.com/api/v1/search/nails?input=${keyword}`,
        {
          headers: { "Content-Type": `application/json` },
        }
      );
      console.log("fetchResult:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("fetchResult-Error:", error);
    }
  };
  // 추천검색어 fetch
  const fetchRecommend = async () => {
    try {
      const response = await axios.get(
        `https://0x057hq0se.execute-api.ap-northeast-2.amazonaws.com/api/v1/search?input=${searchKeyword}`,
        {
          // params: data,
          headers: { "Content-Type": `application/json` },
        }
      );
      console.log("Response:", response.data);
      setRecommendData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (searchKeyword) {
      fetchRecommend();
    }
  }, [searchKeyword]);

  return (
    <SafeAreaView>
      <SearchBar>
        <BackButton onPress={handleDeleteSearchKeyword}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </BackButton>
        <DeleteButton onPress={handleDeleteSearchKeyword}>
          <Ionicons name="close-circle-outline" size={22} color="black" />
        </DeleteButton>
        <Search
          placeholder="네일 키워드와 네일샵을 검색해보세요."
          value={searchKeyword}
          onChangeText={handleSearchInputChange}
        />
        <SearchButton onPress={handleSearch} disabled={!searchKeyword}>
          <Ionicons name="search" size={22} color="black" />
        </SearchButton>
      </SearchBar>
      {result ? (
        <Result result={result.data.nails} />
      ) : searchKeyword ? (
        <Recommend
          searchKeyword={searchKeyword}
          recommemdData={recommemdData}
          recommendPress={recommendPress}
        />
      ) : (
        <RecentSearchContainer>
          <Title>최근 검색어</Title>
          <ItemContainer>
            {recentSearches.map((search, index) => (
              <Item key={index} onPress={() => recommendPress(search.keyword)}>
                <ItemName>{search.keyword}</ItemName>
                <ClearButton onPress={() => handleClearRecentSearch(index)}>
                  <ClearButtonText>X</ClearButtonText>
                </ClearButton>
              </Item>
            ))}
          </ItemContainer>
        </RecentSearchContainer>
      )}
    </SafeAreaView>
  );
}

const SearchBar = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 6px 16px;
`;
const Search = styled.TextInput`
  flex: 1;
  height: 38px;
  background-color: lightgray;
  border-radius: 5px;
  padding-horizontal: 10px;
  margin-left: 10px;
`;
const BackButton = styled.TouchableOpacity``;
const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  margin-left: 10px;
  top: 14px;
  left: 300px;
  z-index: 1;
`;
const SearchButton = styled.TouchableOpacity`
  margin-left: 10px;
`;
const RecentSearchContainer = styled.View`
  padding: 6px 16px;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
const ItemContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 24px;
  border: 1px;
  border-radius: 2px;
  border-color: darkgrey;
  margin: 5px;
`;
const ItemName = styled.Text`
  color: darkgray;
  font-size: 11px;
  margin: 5px;
`;
const ClearButton = styled.TouchableOpacity``;
const ClearButtonText = styled.Text`
  color: darkgray;
  font-size: 11px;
  margin: 5px;
`;
