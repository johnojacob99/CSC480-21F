package edu.oswego.util.dao.impl;


import edu.oswego.util.dao.IStudentDAO;
import edu.oswego.util.mapper.Course_Team_Student_Mapper;
import edu.oswego.util.mapper.StudentMapper;
import edu.oswego.util.objects.Course_Team_Student;
import edu.oswego.util.objects.Student;
import edu.oswego.util.dao.impl.AbstractDAO;

import java.util.ArrayList;
import java.util.List;

public class StudentDAO extends AbstractDAO<Student> implements IStudentDAO {

    public int generateUniqueRandomUserId()
    {
        String sql = "SELECT (IF( (select count(userId) from student) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM student WHERE \"random_number\" NOT IN (SELECT userId FROM student) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int generateUniqueRandomTeamId()
    {
        String sql = "SELECT (IF( (select count(teamId) from course_team_student) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM course_team_student WHERE \"random_number\" NOT IN (SELECT teamId FROM course_team_student) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Student student) {
        StringBuilder sql = new StringBuilder("INSERT INTO student (studentId, userId, firstName,lastName,email) ");
        sql.append(" VALUES(?, ?, ?, ?, ? )");
        int uniqueRandomUserId = generateUniqueRandomUserId();
         insertString(sql.toString(), student.getStudentID(), uniqueRandomUserId,student.getFirstName(),
                student.getLastName(), student.getEmail());
        return uniqueRandomUserId;
    }

    @Override
    public int setCourseForStudent(int userId, int courseId) {
        StringBuilder sql = new StringBuilder("INSERT INTO course_team_student (userId, courseId, teamId) ");
        sql.append(" VALUES(?, ?, ? )");
        insert(sql.toString(), userId, courseId,-1);
        return userId;
    }

    @Override
    public Course_Team_Student setTeamForStudentByUserIdAndCourseId(int userId, int courseId, int teamId) {

        StringBuilder sql = new StringBuilder("UPDATE course_team_student SET teamId = ? where userId = ? and courseId = ?");
        update(sql.toString(), teamId, userId, courseId);
        return findCourse_Team_StudentByUserIdAndCourseId(userId, courseId);
    }


    public Course_Team_Student findCourse_Team_StudentByUserIdAndCourseId(int userId, int courseId){
        String sql = "SELECT * FROM course_team_student WHERE userID = ? and courseId = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), userId, courseId);
        return course_team_student.isEmpty() ? null : course_team_student.get(0);
    }

    @Override
    public List<Student> findAll() {
        String sql = "SELECT * FROM student";
        List<Student> students = query(sql, new StudentMapper());
        return students;
    }

    @Override
    public Student findOne(int userId) {
        String sql = "SELECT * FROM student WHERE userID = ?";
        List<Student> student = query(sql, new StudentMapper(), userId);
        return student.isEmpty() ? null : student.get(0);
    }

    @Override
    public List<Student> findStudentsByTeamID(int teamId) {
        String sql = "SELECT * FROM course_team_student WHERE teamID = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), teamId);
        List<Student> students = new ArrayList<>();
        for(Course_Team_Student c : course_team_student){
            Student s = findOne(c.getUserId());
            if (s != null) {
                students.add(s);
            }
        }
        return students;
    }

    @Override
    public List<Student> findStudentsByCourseID(int courseId) {
        String sql = "SELECT * FROM course_team_student WHERE courseID = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), courseId);
        List<Student> students = new ArrayList<>();
        for(Course_Team_Student c : course_team_student){
            Student s = findOne(c.getUserId());
            if (s != null) {
                students.add(s);
            }
        }

        return students;
    }

    @Override
    public List<Integer> findDistinctTeamIDsByCourseID(int courseId){
        String sql = "SELECT DISTINCT teamID FROM course_team_student where courseID = ?";
        List<Integer> distinctTeamIDs = queryInteger(sql,"teamID", courseId);
        return distinctTeamIDs;
    }

    @Override
    public void update(Student student) {
        StringBuilder sql = new StringBuilder("UPDATE student SET studentId = ?, firstName = ?, lastName = ?, " +
                "email = ? , teamID = ? WHERE userId = ?");
        update(sql.toString(), student.getStudentID(),student.getFirstName() ,student.getLastName(), student.getEmail(),student.getUserID());
    }

    @Override
    public void delete(Student student) {
        String sql = "DELETE FROM student WHERE userID = ?";
        update(sql, student.getUserID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM student";
        update(sql);
    }


}
