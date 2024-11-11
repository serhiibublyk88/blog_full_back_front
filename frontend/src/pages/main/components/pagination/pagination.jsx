import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "../../../../components";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        First
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <div className="current-page">Current:{page} </div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Next
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        Last
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 140px;
  width: 100%;
  margin: 0 0 20px;
  padding: 0 35px;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    width: 100%;
    height: 32px;
    mqrgin: 0px 5px;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
    border: 1px solid #000;
    margin: 0 10px;
  }
`;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}
