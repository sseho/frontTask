import React from "react";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components";

const Container = styled.View``;

const ProfileImage = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  background-color: gray;
`;
const PhotoButton = styled.button``;

const Photo = ({ url, onChangePhoto }) => {
  // photo 입력받는 button을 눌렀을 때 실행되는 함수
  const _handlePhotoBtnPress = async () => {
    // image library 접근에 대한 허가 필요 없음
    // ImagePicker를 이용해 Image형식의 파일을 가져온다
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // cancelled가 아닐 때 가져온 사진의 주소로 onChangePhoto
    if (!result.cancelled) {
      onChangePhoto(result.uri);
    }
  };

  return (
    <Container>
      <ProfileImage source={{ uri: url }} />
      <PhotoButton onPress={_handlePhotoBtnPress} />
    </Container>
  );
};

export default Photo;
