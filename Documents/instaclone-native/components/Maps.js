import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Map = styled.View`
  width: 170px;
  height: 176px;
  border: 1px;
`;

export default function Maps() {
  return (
    <Container>
      <Map>
        <Text>map</Text>
      </Map>
    </Container>
  );
}
