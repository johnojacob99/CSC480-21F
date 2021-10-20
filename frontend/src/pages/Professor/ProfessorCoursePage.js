import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BsArrowRightCircle} from "react-icons/bs";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import { CardContent, CardHeader, Grid, Stack } from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
function FilterAssignment() {
  return (
    <div>
      <Box
        gap={2}
        sx={{
          display: "flex",
          direction: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          px: 2,
          cursor: "pointer",
          borderRadius: 10,
          color: "#000",
          backgroundColor: "#ddd",
        }}
      >
        <Typography
          style={{ display: "flex", textAlign: "center", fontWeight: "600" }}
          variant="body1"
          component="div"
        >
          Filter Assignments
        </Typography>
        <CustomizedRadios></CustomizedRadios>
      </Box>
    </div>
  );
}
function AssignmentBar() {
  return (
      <CustomizedButtons fullwidth type4>
      <Grid container style={{display: "flex", alignItems: "center", height: "35px"}}>
        <Grid item xs={7}>
          <Typography
            style={{ display: "flex", textAlign: "center", fontWeight: "600", marginLeft: "10px" }}
            variant="body1"
            component="div"
          >
            Solution 1
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography
            style={{ display: "flex", textAlign: "center" }}
            variant="body1"
            component="div"
          >
            Due 10/01/21
          </Typography>
        </Grid>
        <Grid item xs={1} style={{ display: "flex", justifyContent: "center"}}>
        <BsArrowRightCircle size="1.5em" style={{marginLeft: "5px"}}/>
        </Grid>
      </Grid>
      </CustomizedButtons>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      sx={{ borderRadius: "10px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function ProfessorCourse({ history }) {
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "80vh",
        backgroundSize: "cover",
        paddingTop: "150px",
      }}
    >
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Grid container sx={{ marginBottom: "20px" }}>
          <Grid item xs={4}>
            <Typography
              style={{
                display: "flex",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              component="div"
            >
              Courses and Assignments
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={8}
            rowSpacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              <div></div>
            </Grid>
            <Grid item xs={4}>
              <CustomizedButtons type2 model={"add"}>
                <Link
                  to="/coursecreation"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div>Create Course</div>
                </Link>
              </CustomizedButtons>
            </Grid>
            <Grid item xs={4}>
              <CustomizedButtons type1>View Student Info</CustomizedButtons>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <CustomizedTabs
            type3
            setValue={setValue}
            value={value}
          ></CustomizedTabs>
          <TabPanel value={value} index={0}>
            <CustomizedCard>
              <CardHeader
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                title={
                  <Grid container>
                    <Grid item xs={7}>
                      <CustomizedButtons type3 model={"add"}>
                        <Link
                          to="/assignmentcreation"
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          <div>Create New Assignment</div>
                        </Link>
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={5}>
                      <FilterAssignment></FilterAssignment>
                    </Grid>
                  </Grid>
                }
              ></CardHeader>
              <CardContent>
                <AssignmentBar></AssignmentBar>
                <AssignmentBar></AssignmentBar>
                <AssignmentBar></AssignmentBar>
                <AssignmentBar></AssignmentBar>
              </CardContent>
            </CustomizedCard>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Three
          </TabPanel>
        </div>
      </CustomizedContainer>
    </div>
  );
}

export default ProfessorCourse;
