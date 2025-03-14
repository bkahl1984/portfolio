"use client";

import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  width: 1320px;

  @media screen and (max-width: 1399.98px) {
    width: 1140px;
  }

  @media screen and (max-width: 1199.98px) {
    width: 960px;
  }

  @media screen and (max-width: 991.98px) {
    width: 720px;
  }

  @media screen and (max-width: 767.98px) {
    width: 540px;
  }

  @media screen and (max-width: 575.98px) {
    width: calc(100% - 32px);
  }
`;

export default Container;
