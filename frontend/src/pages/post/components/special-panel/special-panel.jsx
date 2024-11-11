import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { Icon } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { checkAcess } from "../../../../utils";
import { ROLE } from "../../../../constans";
import { selectUserRole } from "../../../../selectors";
import styled from "styled-components";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRole = useSelector(selectUserRole);

  const onPostRemove = (id) => {
    dispatch(
      openModal({
        text: "Delete the post?",
        onConfirm: () => {
          dispatch(removePostAsync( id)).then(() => {
            navigate("/");
          });
          dispatch(CLOSE_MODAL);
        },
        onCencel: () => dispatch(CLOSE_MODAL),
      })
    );
  };
  const isAdmin = checkAcess([ROLE.ADMIN], userRole);
  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && (
          <Icon
            inactive={true}
            id="fa-calendar-o"
            margin="0 7px 0 0 "
            size="18px"
          />
        )}
        {publishedAt}
      </div>
      {isAdmin && (
        <div className="buttons">
          {editButton}
          {publishedAt && (
            <Icon
              id="fa-trash-o"
              size="22px"
              margin="0 0 0 7px"
              onClick={() => onPostRemove(id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    align-items: end;
  }

  & .buttons {
    display: flex;
  }
`;

SpecialPanel.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  editButton: PropTypes.node.isRequired,
};
