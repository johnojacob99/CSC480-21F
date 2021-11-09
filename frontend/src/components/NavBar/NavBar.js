import React from "react";
import { Link } from "react-router-dom";
// @mui components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import logo from "../../images/logo.png";

// styled components
import NavBarStyle from "../../styles/NavBarStyle";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { whiteColor, darkColor } from "../../styles/Style";
import CustomizedContainer from "../CustomizedContainer";
import { Grid, Stack } from "@mui/material";

function NavBar({ history }) {
  const nav = NavBarStyle();
  const getUser = useSelector(selectUser)
  const {user, isAuthenticated, role} = getUser
  return (
    <div className={nav.root}>
      <AppBar
        style={{
          backgroundColor: whiteColor,
          color: darkColor,
          flexDirection: "row",
        }}
        className={nav.appBar}
      >
        <CustomizedContainer>
          <Grid
            container
            rowSpacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={6} >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <img className={nav.logo} src={`${logo}`} />
              </Link>
            </Grid>
            <Grid item container xs={6} rowSpacing={2} >
              <Stack direction="row" spacing={3}  sx={{ paddingTop: "16px"}}>
              <Link
                  to="/professorhome"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Home</div>
                </Link>
                <Link
                  to="/course"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Courses & Assignments</div>
                </Link>
                <Link
                  to="/studentinfoview"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Students & Teams</div>
                </Link>
                <Link
                  to="/courseresult"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Results</div>
                </Link>
              </Stack>

            </Grid>
          </Grid>
        </CustomizedContainer>
        {/* <StyledBadge badgeContent={4} color="secondary">
        <div className={nav.link}>Results</div>
      </StyledBadge> */}
      </AppBar>
    </div>
  );
}

export default NavBar;
