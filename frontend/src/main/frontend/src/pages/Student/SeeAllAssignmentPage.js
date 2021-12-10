import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { getAssignmenstByStudent } from "../../axios/APIRequests";
import CustomizedBody from "../../components/CustomizedBody";

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

function SeeAllAssignmentPage({ history }) {
  const [tab, setTab] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState();
  const [courseNames, setCourseNames] = React.useState([]);

  useEffect(() => {
    var courseNameLists = [];
    if (courses !== undefined && courses.length !== 0) {
      console.log(courses);
      courses.map((course) => {
        courseNameLists.push(course.code);
      });
      setCourseNames(courseNameLists);
      console.log("`loading`");
      setLoading(false);
    }
  }, [courses]);
  useEffect(() => {
    getAssignmenstByStudent()
      .then((value) => {
        console.log(value);
        setCourses(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CustomizedBody bg={bg}
    >
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Assignments
          </Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              <Grid container sx={{ marginBottom: "20px" }}>
                <Grid item xs={8}>
                  <Typography
                    style={{
                      display: "flex",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                    variant="h6"
                    component="div"
                  >
                    Assignments by Course
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <CustomizedButtons
                    type1
                    onClick={() => history.push("/studentteams")}
                  >
                    View Teams
                  </CustomizedButtons>
                </Grid>
              </Grid>
              <div>
                <CustomizedTabs
                  type1
                  setTab={setTab}
                  value={tab}
                  fullWidth={"fullWidth"}
                  labels={courseNames}
                ></CustomizedTabs>
                {courses.map((course, id) => (
                  <TabPanel value={tab} index={id}>
                    <CustomizedCard>
                      <CardHeader
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        title={
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <CustomizedButtons
                                type3
                                model={"radio3"}
                                fullwidth
                                filterType={filterType}
                                setFilterType={setFilterType}
                              >
                                Filter Results
                              </CustomizedButtons>
                            </Grid>
                          </Grid>
                        }
                      ></CardHeader>
                      <CardContent
                        sx={{
                          paddingTop: "0",
                        }}
                      >
                        {course.assignments.map((assignment, key) => {
                          return (
                            <>
                              {!assignment.draft && (
                                <>
                                  {(filterType === "All" ||
                                    (filterType === "Completed") ===
                                      assignment.isSolutionCompleted) && (
                                    <ListItem
                                      key={key}
                                      button
                                      divider
                                      onClick={() => {
                                        history.push(
                                          "./newsolutionassignmentview",
                                          { assignment: assignment }
                                        );
                                      }}
                                      secondaryAction={
                                        <IconButton edge="end">
                                          <BsArrowRightCircle />
                                        </IconButton>
                                      }
                                    >
                                      <ListItemText
                                        primary={`${assignment.title} Solution`}
                                      />
                                      {assignment.isSolutionCompleted ? (
                                        <ListItemText
                                          sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                          primary={`Completed ${new Date(
                                            assignment.solutionDueDateTime
                                          ).toLocaleString()}`}
                                        />
                                      ) : (
                                        <ListItemText
                                          sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                          primary={`Due ${new Date(
                                            assignment.solutionDueDateTime
                                          ).toLocaleString()}`}
                                        />
                                      )}
                                    </ListItem>
                                  )}
                                  {(filterType === "All" ||
                                    (filterType === "Completed") === assignment.isPeerReviewCompleted) && (
                                    <>
                                      {assignment.reviewStage === true && (
                                        <ListItem
                                          key={key}
                                          button
                                          divider
                                          onClick={() => {
                                            history.push(
                                              "./peerreviewassignmentview",
                                              {
                                                assignmentID:
                                                  assignment.assignmentID,
                                              }
                                            );
                                          }}
                                          secondaryAction={
                                            <IconButton edge="end">
                                              <BsArrowRightCircle />
                                            </IconButton>
                                          }
                                        >
                                          <ListItemText
                                            primary={`${assignment.title} Peer Review`}
                                          />
                                          {assignment.isPeerReviewCompleted ? ( //assignment.peerreview.isCompleted === true
                                            <ListItemText
                                              sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                              }}
                                              primary={`Completed ${new Date(
                                                assignment.peerReviewDueDateTime
                                              ).toLocaleString()}`}
                                            />
                                          ) : (
                                            <ListItemText
                                              sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                              }}
                                              primary={`Due ${new Date(
                                                assignment.peerReviewDueDateTime
                                              ).toLocaleString()}`}
                                            />
                                          )}
                                        </ListItem>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          );
                        })}
                      </CardContent>
                    </CustomizedCard>
                  </TabPanel>
                ))}
              </div>
            </>
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default SeeAllAssignmentPage;
