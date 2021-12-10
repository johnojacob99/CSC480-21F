package edu.oswego.util.service.impl;


import edu.oswego.util.dao.IUserDAO;
import edu.oswego.util.dao.impl.UserDAO;
import edu.oswego.util.objects.User;
import edu.oswego.util.service.IUserService;

import java.util.List;

public class UserService implements IUserService {

    IUserDAO userDao;
    public UserService()
    {
        userDao = new UserDAO();
    }
    @Override
    public User save(User user) {
        int id = userDao.save(user);
        return userDao.findOne(id);
    }
    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findOne(int userId) {
        return userDao.findOne(userId);
    }

    @Override
    public User update(User user) {
        userDao.update(user);
        return userDao.findOne(user.getUserID());
    }

    @Override
    public User delete(User user) {
        userDao.delete(user);
        return user;
    }

    @Override
    public void deleteAll() {
        userDao.deleteAll();
    }

    public User findOneWithEmail(String email) {
        return userDao.findOneWithEmail(email);
    }
}

