import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

export default function Recommend({
  searchKeyword,
  recommemdData,
  recommendPress,
}) {
  const highlightMatchingChars = (keyword) => {
    const chars = keyword.split("");
    const searchChars = searchKeyword.split("");
    return chars.map((char, index) => {
      for (let i = 0; i < searchChars.length; i++) {
        if (char === searchChars[i]) {
          // 일치하는 글자는 다른 스타일로 하이라이트
          return <HighlightedChar key={index}>{char}</HighlightedChar>;
        }
      }
      return <React.Fragment key={index}>{char}</React.Fragment>;
    });
  };
  //   const Crosshatch=(keyword)=>{
  //     const chars = keyword.split("");
  //     return (
  //         <Crosshatch>#</Crosshatch>
  //         highlightMatchingChars(chars.slice(1,));
  //     );
  //   }
  const handleItem = (keyword) => {
    recommendPress(keyword);
    console.log("눌림", keyword);
  };
  return (
    <Container>
      {recommemdData &&
        recommemdData.shops &&
        recommemdData.shops.slice(0, 3).map((data, id) => (
          <Item key={id} onPress={() => handleItem(data.keyword)}>
            <Wrapper>
              <Image source={{ uri: data.thumb_image }} />
              <Title>{highlightMatchingChars(data.keyword)}</Title>
            </Wrapper>
            <SubTitle>네일샵</SubTitle>
          </Item>
        ))}
      {recommemdData &&
        recommemdData.hashtags &&
        recommemdData.hashtags.slice(0, 3).map((data, id) => (
          <Item key={id} onPress={() => handleItem(data.keyword)}>
            <Wrapper>
              <Crosshatch>#</Crosshatch>
              <Title>{highlightMatchingChars(data.keyword.slice(1))}</Title>
            </Wrapper>
            <SubTitle>해시태그</SubTitle>
          </Item>
        ))}
    </Container>
  );
}

const Container = styled.View``;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 51px;
  padding: 0px 20px;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Image = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
`;
const Crosshatch = styled.Text`
  font-size: 20px;
  margin-right: 10px;
  color: gray;
  font-weight: 700;
`;
const Title = styled.Text``;
const SubTitle = styled.Text``;
const HighlightedChar = styled.Text`
  color: red;
`;
