import PropTypes from "prop-types";
import styled from "styled-components";

const TableRowContainer = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;
  border: ${({ border }) => (border ?  '1px solid #000 ':'none' )};

  
  

  & > div {
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  & .login-column {
    width: 175px;
  }

  & .registered-at-column {
    width: 215px;
  }

  & .role-column {
    width: 160px;
  }
`;

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

