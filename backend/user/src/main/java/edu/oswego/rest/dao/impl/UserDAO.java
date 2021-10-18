package edu.oswego.rest.dao.impl;



import edu.oswego.rest.dao.IUserDAO;
import edu.oswego.rest.mapper.UserMapper;
import edu.oswego.rest.objects.User;

import java.util.List;

public class UserDAO extends AbstractDAO<User> implements IUserDAO {
    @Override
    public int generateUniqueRandomId()
    {
        String sql = "SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM course " +
                "WHERE \"random_number\" NOT IN (SELECT courseID FROM course) " +
                "LIMIT 1;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }
    @Override
    public int save(User user) {
        StringBuilder sql = new StringBuilder("INSERT INTO user (userId, email, role)");
        sql.append(" VALUES(?, ?, ?)");
        int uniqueRandomId = generateUniqueRandomId();
        insert(sql.toString(), uniqueRandomId, user.getEmail(),user.getRole());
        return uniqueRandomId;
    }

    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM user";
        List<User> user = query(sql, new UserMapper());
        return user.isEmpty() ? null : user;
    }

    @Override
    public User findOne(int userId) {
        String sql = "SELECT * FROM user WHERE userID = ?";
        List<User> user = query(sql, new UserMapper(), userId);
        return user.isEmpty() ? null : user.get(0);
    }

    @Override
    public void update(User user) {
        StringBuilder sql = new StringBuilder("UPDATE user SET email = ?, role = ? WHERE userID = ?");
        update(sql.toString(), user.getEmail(),user.getRole(), user.getUserID());
    }

    @Override
    public void delete(User user) {
        String sql = "DELETE FROM user WHERE userID = ?";
        update(sql, user.getUserID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM user";
        update(sql);
    }


}