import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../../../components";
import {
  openModal,
  CLOSE_MODAL,
  removeCommentAsync,
} from "../../../../../../actions";
import styled from "styled-components";
import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../constans";

const CommentContainer = ({
  className,
  postId,
  id,
  author,
  publishedAt,
  content,
}) => {
  const dispatch = useDispatch();
   const userRole = useSelector(selectUserRole);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Delete the comment?",
        onConfirm: () => {
          dispatch(removeCommentAsync( postId, id));
          dispatch(CLOSE_MODAL);
        },
        onCencel: () => dispatch(CLOSE_MODAL),
      })
    );
  };
  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon
              inactive={true}
              id="fa-user-circle-o"
              size="18px"
              margin="0 10px 0 0"
              onClick={() => {}}
            />
            {author}
          </div>
          <div className="published-at">
            <Icon
              inactive={true}
              id="fa-calendar-o"
              size="18px"
              margin="0 10px 0 0"
              onClick={() => {}}
            />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>

      {isAdminOrModerator && (
        <Icon
          id="fa-trash-o"
          size="22px"
          margin="0 0 0 10px"
          onClick={() => onCommentRemove(id)}
        />
      )}
    </div>
  );
};
export const Comment = styled(CommentContainer)`
  display: flex;
  margin-top: 10px;
 

  & .comment {
   width: 100%;
      border: 1px solid black;
      padding:  5px 10px;
    
  & .information-panel {
    display: flex;
    justify-content: space-between;
  }
  & .author,
  & .published-at {
    display: flex;
  }
`;

Comment.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
};
