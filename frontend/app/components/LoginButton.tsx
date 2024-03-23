import React from "react";
import {
  withAuthInfo,
  useRedirectFunctions,
  useLogoutFunction,
  WithAuthInfoProps,
} from "@propelauth/react";
import { Button } from "@chakra-ui/react";

const LoginButton = withAuthInfo((props: WithAuthInfoProps) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions();
  return (
    <div>
      {props.isLoggedIn ? (
        <Button onClick={() => logoutFunction(true)}>Logout</Button>
      ) : (
        <Button onClick={() => redirectToLoginPage()}>Login</Button>
      )}
    </div>
  );
});

export default LoginButton;
