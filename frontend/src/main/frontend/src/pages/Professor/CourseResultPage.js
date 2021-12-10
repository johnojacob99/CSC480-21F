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
import SuccessfulNotification from "../../components/SuccessfulNotification";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";

import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
import axios from "axios";
import { getAssignmentsByProfessor } from "../../axios/APIRequests";

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

function CourseResultPage({ history }) {
  const [tab, setTab] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [courses, setCourses] = useState();

  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  const [loading, setLoading] = React.useState(true);
  const [courseNames, setCourseNames] = React.useState([]);

  useEffect(() => {
    var nameLists = [];

    if (courses !== undefined && courses.length !== 0) {
      courses.map((course) => {
        nameLists.push(course.code);
      });
      setCourseNames(nameLists);
      setLoading(false);
    }
  }, [courses]);
  useEffect(() => {
    getAssignmentsByProfessor()
      .then((value) => {
        console.log(value);
        setCourses(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // useEffect(() => {
  //   console.log(filterType);
  //   const filteredItems = courses.assignments.filter((assignment) => {
  //     return item.type == filterType || filterType === "All";
  //   });
  //   setItems(filteredItems);
  // }, [filterType]);
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Course Results
          </Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              {courses.length === 0 ? (
                <CustomizedCard>
                  <CardContent>
                    <Stack style={{ flex: 1 }} alignItems="center">
                      Please create a new course
                    </Stack>
                  </CardContent>
                </CustomizedCard>
              ) : (
                <>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Typography
                      style={{
                        display: "flex",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                      variant="h6"
                      component="div"
                    >
                      Quality Check
                    </Typography>
                  </Stack>
                  <div>
                    <CustomizedTabs
                      type3
                      setTab={setTab}
                      value={tab}
                      fullWidth={"fullWidth"}
                      labels={courseNames}
                    ></CustomizedTabs>
                    {courses.map((course, key) => (
                      <TabPanel value={tab} index={key}>
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
                                    model={"radio2"}
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
                            {course.assignments.map((assignment) => {
                              return (
                                <>
                                  {!assignment.draft && (
                                    <>
                                      {(filterType === "All" ||
                                        (filterType === "Completed") ===
                                          false) && ( //assignment.solution.isReviewed
                                        <ListItem
                                          button
                                          divider
                                          onClick={() =>
                                            history.push(
                                              "/studentsolutionqualitycheck",
                                              {
                                                assignmentID:
                                                  assignment.assignmentID,
                                              }
                                            )
                                          }
                                          secondaryAction={
                                            <IconButton edge="end">
                                              <BsArrowRightCircle />
                                            </IconButton>
                                          }
                                        >
                                          <ListItemText
                                            sx={{ width: "30%" }}
                                            primary={`${assignment.title} Solutions`}
                                          />

                                          <>
                                            {
                                              //assignment.solution.isReviewed
                                              assignment.reviewStage ===
                                              false ? (
                                                <>
                                                  <ListItemText
                                                    sx={{
                                                      display: "flex",
                                                      justifyContent: "center",
                                                    }}
                                                    primary={`Due ${new Date(
                                                      assignment.solutionDueDateTime
                                                    ).toLocaleString()}`}
                                                  />
                                                  <ListItemText
                                                    primary={
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "flex-end",
                                                        }}
                                                      >
                                                        <FiberManualRecordIcon
                                                          sx={{
                                                            color: "#0DC38D",
                                                            marginRight: "10px",
                                                          }}
                                                          fontSize="medium"
                                                        />{" "}
                                                        <>Needs Review</>
                                                      </div>
                                                    }
                                                  />
                                                </>
                                              ) : (
                                                <ListItemText
                                                  sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                  }}
                                                  primary={`Completed ${new Date(
                                                    assignment.solutionDueDateTime
                                                  ).toLocaleString()}`}
                                                />
                                              )
                                            }
                                          </>
                                        </ListItem>
                                      )}
                                      {assignment.reviewStage && (
                                        <>
                                          {(filterType === "All" ||
                                            (filterType === "Completed") ===
                                              false) && ( //assignment.peerreview.isReviewed
                                            <ListItem
                                              button
                                              divider
                                              onClick={() =>
                                                history.push(
                                                  "/studentpeerreviewqualitycheck",
                                                  {
                                                    assignmentID:
                                                      assignment.assignmentID,
                                                  }
                                                )
                                              }
                                              secondaryAction={
                                                <IconButton edge="end">
                                                  <BsArrowRightCircle />
                                                </IconButton>
                                              }
                                            >
                                              <ListItemText
                                                sx={{ width: "30%" }}
                                                primary={`${assignment.title} Peer Reviews`}
                                              />

                                              <>
                                                {
                                                  //assignment.peerreview.isReviewed
                                                  assignment.reviewStage ===
                                                  false ? (
                                                    <>
                                                      <ListItemText
                                                        sx={{
                                                          display: "flex",
                                                          justifyContent:
                                                            "center",
                                                        }}
                                                        primary={`submissions closed ${new Date(
                                                          assignment.peerReviewDueDateTime
                                                        ).toLocaleString()}`}
                                                      />

                                                      <ListItemText
                                                        primary={
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              alignItems:
                                                                "center",
                                                              justifyContent:
                                                                "flex-end",
                                                            }}
                                                          >
                                                            <FiberManualRecordIcon
                                                              sx={{
                                                                color:
                                                                  "#0DC38D",
                                                                marginRight:
                                                                  "10px",
                                                              }}
                                                              fontSize="medium"
                                                            />{" "}
                                                            <>Needs Review</>
                                                          </div>
                                                        }
                                                      />
                                                    </>
                                                  ) : (
                                                    <ListItemText
                                                      sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "flex-end",
                                                      }}
                                                      primary={`Completed ${new Date(
                                                        assignment.peerReviewDueDateTime
                                                      ).toLocaleString()}`}
                                                    />
                                                  )
                                                }
                                              </>
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
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default CourseResultPage;
