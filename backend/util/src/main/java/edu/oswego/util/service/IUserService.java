package edu.oswego.util.service;

import edu.oswego.util.objects.User;

import java.util.List;

public interface IUserService {
    User save(User user);
    List<User> findAll();
    User findOne(int userId);
    User update(User user);
    User delete(User user);
    User findOneWithEmail(String email);
    void deleteAll();
}
