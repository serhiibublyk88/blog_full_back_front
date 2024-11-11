import { useEffect, useState } from "react";
import { H2, PrivateContent } from "../../components";
import { TableRow, UserRow } from "./components";
import styled from "styled-components";
import { ROLE } from "../../constans";
import { checkAcess } from "../../utils";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { request } from "../../utils/request";

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [schouldUpdateUserList, setSchouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAcess([ROLE.ADMIN], userRole)) {
      return;
    }

    Promise.all([request("/users"), request("/users/roles")]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setErrorMessage(usersRes.error || rolesRes.error);
          return;
        }

        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      }
    );
  }, [schouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAcess([ROLE.ADMIN], userRole)) {
      return;
    }
    request(`/users/${userId}`, "DELETE").then(() => {
      setSchouldUpdateUserList(!schouldUpdateUserList);
    });
  };

  return (
    <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <div className={className}>
        <H2>Users</H2>
        <div>
          <TableRow>
            <div className="login-column">Login</div>
            <div className="regitered-at-column">Date of registration</div>
            <div className="role-column">Role</div>
          </TableRow>

          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </div>
    </PrivateContent>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 570px;
  font-size: 18px;
`;
