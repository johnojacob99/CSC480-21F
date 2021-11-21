import React, { useState } from "react";
// @mui components
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GoogleLogin from "react-google-login";
import axios from "axios";
import bg from "../../images/multi_background_login.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "../../features/userSlice";
// styled components
import NavBarLogin from "../../components/NavBar/NavBarLogin";
import { Stack } from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedBody from "../../components/CustomizedBody";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth, provider} from "./firebase";
import { loginAuth } from "../../axios/APIRequests";
function RoleButton() {
  return (
    <Box
      sx={{
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        overflow: "hidden",
        px: 2,
        py: 1,
        cursor: "pointer",
        borderRadius: 10,
        color: "#ffffff",
        bgcolor: "#000000",
        "&:hover": {
          backgroundColor: "#000000",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Typography style={{ fontWeight: "600" }} variant="h6" component="div">
        Professor
      </Typography>
    </Box>
  );
}

function LoginPage({ history }) {
  const dispatch = useDispatch();
  const professorModel = {
    userId: 1,
    email: "username@oswego.edu",
    role: "professor",
  };
  const studentModel = {
    userId: 1,
    email: "username@oswego.edu",
    role: "student",
  };
  const handleProfessorLogin = () => {
    dispatch(setUser(professorModel));
    history.push("./professorhome");
  };
  const handleStudentLogin = () => {
    dispatch(setUser(studentModel));
    history.push("./studenthome");
  };
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    //axios.post("http://localhost9080", response);
  };

  const signIn = () => {
    loginAuth("token")
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     console.log(user);
    //     console.log(token);
    //     // loginAuth(token)
    //     //   .then(function (response) {
    //     //     console.log(response);
    //     //   })
    //     //   .catch(function (error) {
    //     //     console.log(error);
    //     //   });
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
    const responseGoogle = (response) => {
      console.log(response);
    }
  };
  return (
    <CustomizedBody bg={bg}>
      <NavBarLogin></NavBarLogin>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          margin: "1em 12em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            width: "496px",
          }}
        >
          <Typography
            style={{ fontWeight: "600" }}
            variant="h4"
            component="div"
          >
            A proven system to improve student grade outcomes.
          </Typography>
          <Typography variant="h6" component="div">
            Distribute assignments and collect peer reviews with accuracy and
            efficiency while utilizing this effective learning method.
          </Typography>
        </div>
        <CustomizedCard
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "3em 1em",
            width: "422px",
            height: "auto",
            padding: "0.5em",
          }}
        >
          <CardHeader
            sx={{ paddingBottom: "0" }}
            title={
              <Typography
                style={{ fontWeight: "600" }}
                variant="h5"
                component="div"
              >
                Google Login
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Typography
              style={{ fontWeight: "400" }}
              variant="h6"
              component="div"
            >
              Select your role to begin
            </Typography>
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
            {/* 149755873109-56q9cfqarsfn3kd1vc9isegskpi4s32v.apps.googleusercontent.com */}
            {/* <CustomizedButtons type1 onClick={signIn}>Professor Login</CustomizedButtons> */}
              {/* <GoogleLogin
                clientId="51547256571-4hgvg5mtjrdit2bnaft8k2b5j44e6l3b.apps.googleusercontent.com"
                buttonText="Professor"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <GoogleLogin
                clientId="51547256571-4hgvg5mtjrdit2bnaft8k2b5j44e6l3b.apps.googleusercontent.com"
                buttonText="Student"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              /> */}
              <CustomizedButtons
                style={{ display: "flex", justifyContent: "center" }}
                fulllwidth
                type1
                onClick={handleProfessorLogin}
              >
                I am a Professor{" "}
              </CustomizedButtons>
              <CustomizedButtons
                style={{ display: "flex", justifyContent: "center" }}
                fulllwidth
                type1
                onClick={handleStudentLogin}
              >
                I am a Student{" "}
              </CustomizedButtons>
            </Stack>
          </CardContent>
        </CustomizedCard>
      </div>
    </CustomizedBody>
  );
}

export default LoginPage;
