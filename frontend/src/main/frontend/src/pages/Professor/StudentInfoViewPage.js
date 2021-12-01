import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MdOutlineCancel, MdTurnedInNot } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedBody from "../../components/CustomizedBody";
import CustomizedModal from "../../components/CustomizedModal";
import CustomizedTabs from "../../components/CustomizedTabs";

import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Divider,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Modal,
  Fade,
  Collapse,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";

import Loading from "../../components/Loading";
import axios from "axios";
import CustomizedTextField from "../../components/CustomizedTextField";
import {
  getTeamsByProfessor,
  deleteStudentByProfessor,
  deleteCourseByProfessor,
  postNewStudentByProfessor,
} from "../../axios/APIRequests";

const AddStudentBox = (props) => {
  const {
    classes,
    handleAddStudent,
    firstName,
    lastName,
    sID,
    email,
    setFirstName,
    setLastName,
    setSID,
    setEmail,
    handleCloseAddStudentBox,
  } = props;
  return (
    <Box
      sx={{
        backgroundColor: "#EDEDED",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                display: "flex",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              component="div"
            >
              Add Student to Course
            </Typography>
            <IconButton aria-label="delete" onClick={handleCloseAddStudentBox}>
              <MdOutlineCancel />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomizedTextField
              value={firstName}
              handleTextFieldChange={setFirstName}
            >
              First Name
            </CustomizedTextField>
            <CustomizedTextField
              value={lastName}
              handleTextFieldChange={setLastName}
            >
              Last Name
            </CustomizedTextField>
            <CustomizedTextField value={sID} handleTextFieldChange={setSID}>
              Student ID
            </CustomizedTextField>
            <CustomizedTextField value={email} handleTextFieldChange={setEmail}>
              Email
            </CustomizedTextField>
            <CustomizedButtons type1 height1 onClick={handleAddStudent}>
              Add
            </CustomizedButtons>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

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

function StudentInfoViewPage({ history }) {
  const [tab, setTab] = useState(0);
  const [viewType, setViewType] = useState("Student List");
  const [isOpenedAddStudentBox, setIsOpenedAddStudentBox] = useState(false);
  const [isCourseModalOpened, setIsCourseModalOpened] = useState(false);
  const [isStudentModalOpened, setIsStudentModalOpened] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [sID, setSID] = useState();
  const [email, setEmail] = useState();

  const [deletedStudentID, setDeletedStudentID] = useState();

  const handleOpenAddStudentBox = () => setIsOpenedAddStudentBox(true);
  const handleCloseAddStudentBox = () => setIsOpenedAddStudentBox(false);
  const handleOpenCourseModal = () => setIsCourseModalOpened(true);
  const handleCloseCourseModal = () => setIsCourseModalOpened(false);
  const handleOpenStudentModal = () => setIsStudentModalOpened(true);
  const handleCloseStudentModal = () => setIsStudentModalOpened(false);
  const [teamKeys, setTeamKeys] = useState({});

  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState();
  const [courseNames, setCourseNames] = React.useState([]);
  const handleGetTeamsByProfessor = () => {
    getTeamsByProfessor()
      .then((value) => {
        console.log(value);
        setCourses(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    var courseNameLists = [];
    if (courses !== undefined && courses.length !== 0) {
      courses.map((course) => {
        courseNameLists.push(course.code);
      });
      setCourseNames(courseNameLists);
      console.log("`loading`");
      setLoading(false);
    }
  }, [courses]);

  useEffect(() => {
    handleGetTeamsByProfessor();
  }, []);
  const handleClick = (key) => () => {
    setTeamKeys({ [key]: !teamKeys[key] });
  };
  const handleDeleteCourse = () => {
    const deletedCourseID = courses[tab].courseID; //tab is the index of chosen course
    deleteCourseByProfessor(deletedCourseID)
      .then((value) => {
        console.log(value);
        handleCloseCourseModal(true);
        handleGetTeamsByProfessor();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteStudent = () => {
    console.log(deletedStudentID);
    deleteStudentByProfessor(deletedStudentID)
      .then((value) => {
        console.log(value);
        handleCloseStudentModal(true);
        handleGetTeamsByProfessor();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddStudent = () => {
    var newStudent = {
      firstName: firstName,
      lastName: lastName,
      studentID: sID,
      email: email,
    };
    var json = {
      courseID: courses[tab].courseID,
      student: newStudent,
    };
    const json_ = JSON.stringify(json);
    postNewStudentByProfessor(json)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsOpenedAddStudentBox(false);
  };
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary">Courses</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Students & Teams
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
                  <Grid container sx={{ marginBottom: "20px" }}>
                    <Grid
                      item
                      xs={9}
                      sx={{ display: "flex", alignItems: "center" }}
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
                        Student Information
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <CustomizedButtons
                        type2
                        model={"add"}
                        onClick={() => {
                          handleOpenCourseModal();
                        }}
                      >
                        Delete Course
                      </CustomizedButtons>
                    </Grid>
                  </Grid>
                  <div>
                    <CustomizedTabs
                      type2
                      setTab={setTab}
                      value={tab}
                      fullWidth={"fullWidth"}
                      labels={courseNames}
                    ></CustomizedTabs>
                    {courses.map((course, key) => {
                      return (
                        <TabPanel value={tab} index={key}>
                          <CustomizedCard>
                            <CardHeader
                              sx={{
                                paddingBottom: "0",
                              }}
                              title={
                                <>
                                  {isOpenedAddStudentBox === false ? (
                                    <Grid container>
                                      <Grid item xs={3}>
                                        <CustomizedButtons
                                          type3
                                          sx={{ width: "170px" }}
                                          model={"add"}
                                          model={"switch"}
                                          setViewType={setViewType}
                                        >
                                          {viewType}
                                        </CustomizedButtons>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={9}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <CustomizedButtons
                                          type3
                                          model={"add"}
                                          onClick={handleOpenAddStudentBox}
                                        >
                                          Add new student
                                        </CustomizedButtons>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    <Collapse
                                      in={isOpenedAddStudentBox}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <AddStudentBox
                                        handleAddStudent={handleAddStudent}
                                        setFirstName={setFirstName}
                                        firstName={firstName}
                                        setLastName={setLastName}
                                        lastName={lastName}
                                        setSID={setSID}
                                        sID={sID}
                                        setEmail={setEmail}
                                        email={email}
                                        handleCloseAddStudentBox={
                                          handleCloseAddStudentBox
                                        }
                                      ></AddStudentBox>
                                    </Collapse>
                                  )}
                                </>
                              }
                            ></CardHeader>
                            <CardContent
                              sx={{
                                paddingTop: "0",
                              }}
                            >
                              {viewType === "Student List" ? (
                                <List component="nav">
                                  {course.students.length !== 0 ? (
                                    <>
                                      {course.students.map((student) => (
                                        <ListItem
                                          button
                                          divider
                                          secondaryAction={
                                            <IconButton
                                              edge="end"
                                              aria-label="delete"
                                              onClick={() => {
                                                setDeletedStudentID(
                                                  student.userID
                                                );
                                                handleOpenStudentModal();
                                              }}
                                            >
                                              <MdDelete
                                                style={{
                                                  color: "red",
                                                  size: "1.5em",
                                                }}
                                              />
                                            </IconButton>
                                          }
                                        >
                                          <ListItemText
                                            primary={`${student.firstName} ${student.lastName}`}
                                          />
                                          <ListItemText
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                            primary="Added via CSV upload 08/13/21"
                                          />
                                        </ListItem>
                                      ))}
                                    </>
                                  ) : (
                                    <ListItem>
                                      <ListItemText
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                        primary="There is no student in this course"
                                      />
                                    </ListItem>
                                  )}
                                </List>
                              ) : (
                                <List component="nav">
                                  {course.teams.map((team, key) => {
                                    const open = teamKeys[key] || false;
                                    return (
                                      <div key={key}>
                                        <ListItem
                                          button
                                          divider
                                          secondaryAction={
                                            <IconButton
                                              edge="end"
                                              aria-label="delete"
                                            >
                                              {open ? (
                                                <IoIosArrowDropdown />
                                              ) : (
                                                <IoIosArrowDropup />
                                              )}
                                            </IconButton>
                                          }
                                          onClick={handleClick(key)}
                                        >
                                          <ListItemText
                                            primary={`Team ${team.teamName}`}
                                          />
                                          <ListItemText
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                            primary={`${team.students.length} team members`}
                                          />
                                        </ListItem>

                                        <Collapse
                                          in={open}
                                          timeout="auto"
                                          unmountOnExit
                                        >
                                          <List component="div" disablePadding>
                                            <>
                                              {team.students.map(
                                                (student, key) => (
                                                  <ListItem
                                                    key={key}
                                                    button
                                                    sx={{ pl: 4 }}
                                                    divider
                                                    secondaryAction={
                                                      <IconButton
                                                        style={{ color: "red" }}
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => {
                                                          setDeletedStudentID(
                                                            student.userID
                                                          );
                                                          handleOpenStudentModal();
                                                        }}
                                                      >
                                                        <MdDelete />
                                                      </IconButton>
                                                    }
                                                  >
                                                    <ListItemText
                                                      primary={`${student.firstName} ${student.lastName}`}
                                                    />
                                                  </ListItem>
                                                )
                                              )}
                                            </>
                                          </List>
                                        </Collapse>
                                      </div>
                                    );
                                  })}
                                </List>
                              )}
                            </CardContent>
                          </CustomizedCard>
                        </TabPanel>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      </CustomizedContainer>
      <CustomizedModal
        modalType={"course"}
        isCourseModalOpened={isCourseModalOpened}
        handleCloseCourseModal={handleCloseCourseModal}
        handleDeleteCourse={handleDeleteCourse}
      />
      <CustomizedModal
        modalType={"student"}
        isStudentModalOpened={isStudentModalOpened}
        handleCloseStudentModal={handleCloseStudentModal}
        handleDeleteStudent={handleDeleteStudent}
      />
    </CustomizedBody>
  );
}

export default StudentInfoViewPage;
