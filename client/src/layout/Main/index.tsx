import { ReactNode } from "react";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};
const MainContainer = styled.main`
  max-width: 100%;
`;
const Main = ({ children }: LayoutProps) => {
  return <MainContainer>{children}</MainContainer>;
};

export default Main;
