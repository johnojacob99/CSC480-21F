package edu.oswego.rest.dao.impl;


import edu.oswego.rest.dao.ICourseDAO;
import edu.oswego.rest.mapper.CourseMapper;
import edu.oswego.rest.objects.Course;

import java.util.List;

public class CourseDAO extends AbstractDAO<Course> implements ICourseDAO {

    @Override
    public int generateUniqueRandomId()
    {

        String sql = "SELECT (IF( (select count(courseId) from course) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM course WHERE \"random_number\" NOT IN (SELECT courseId FROM course) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Course course) {
        StringBuilder sql = new StringBuilder("INSERT INTO course (courseId, userID, title, code, sectionNumber, endDate, settings)");
        sql.append(" VALUES(?,?, ?, ?, ?, ?, ? )");
        int uniqueRandomId = generateUniqueRandomId();
        insert(sql.toString(), uniqueRandomId, course.getUserID(), course.getTitle(),course.getCode(), course.getSectionNumber(),
                course.getEndDate(),course.getSettings());
        return uniqueRandomId;
    }

    @Override
    public List<Course> findAll() {
        String sql = "SELECT courseID, userID, title, code , sectionNumber, endDate ,settings FROM course";
        List<Course> course = query(sql, new CourseMapper());
        return course.isEmpty() ? null : course;
    }

    @Override
    public Course findOne(int courseId) {
        String sql = "SELECT courseID, userID, title, code , sectionNumber, endDate ,settings FROM course WHERE courseID = ?";
        List<Course> course = query(sql, new CourseMapper(), courseId);
        return course.isEmpty() ? null : course.get(0);
    }

    @Override
    public void update(Course course) {
        StringBuilder sql = new StringBuilder("UPDATE course SET userId = ? SET title = ?, code = ?, sectionNumber = ?, endDate = ?, " +
                "settings = ? WHERE courseID = ?");
        update(sql.toString(), course.getUserID() , course.getTitle(),course.getCode(), course
                .getSectionNumber() ,course.getEndDate(),course.getSettings(),course.getCourseID());
    }

    @Override
    public void delete(Course course) {
        String sql = "DELETE FROM course WHERE courseID = ?";
        update(sql, course.getCourseID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM course";
        update(sql);
    }


}
