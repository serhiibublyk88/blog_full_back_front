import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, H2, Input } from "../../components";
import { useResetForm } from "../../hooks";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constans";

import styled from "styled-components";
import { request } from "../../utils/request";

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Enter Login")
    .matches(
      /^\w+$/,
      "Login is incorrect- only letters and numbers are allowed."
    )
    .min(3, "Login is incorrect- min 3 characters")
    .max(15, "Login is incorrect- max 15 characters"),

  password: yup
    .string()
    .required("Enter Password")
    .matches(
      /^[\w#%]+$/,
      "Password is incorrect-letters, numbers and #% signs are allowed."
    )
    .min(4, "Password is incorrect- min 4 characters")
    .max(15, "Password is incorrect- max 15 characters"),

  passcheck: yup
    .string()
    .required("Repeat Password")
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

const RegistrationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request('/auth/register', "POST",{login,password}).then(({ error, user }) => {
      if (error) {
        setServerError(`Request error: ${error}`);
        return;
      }
      dispatch(setUser(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Registration</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Login..."
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Password..."
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Please repeat password..."
          {...register("passcheck", {
            onChange: () => setServerError(null),
          })}
        />
        <Button type="submit" disabled={!!formError}>
          Register
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
