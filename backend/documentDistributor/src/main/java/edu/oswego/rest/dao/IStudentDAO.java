package edu.oswego.rest.dao;

import edu.oswego.util.objects.Student;

import java.util.List;

public interface IStudentDAO {
    String save(Student student);
    List<Student> findAll();
    Student findOne(String studentID);
    void update(Student student);
    void delete(Student student);
    void deleteAll();
    Student findUserID(int userId);
    Student findTeamID(int id);
}
