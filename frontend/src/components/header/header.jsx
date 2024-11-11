import { Logo, ControlPanel } from "./components";
import styled from "styled-components";
const Discription = styled.div``;

const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Discription>
      Web Technologies <br /> Writing code <br /> Parsing errors{" "}
    </Discription>
    <ControlPanel />
  </header>
);

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0px -2px 17px #000;
  z-index: 10;
`;
