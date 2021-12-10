package edu.oswego.util.dao.impl;

import java.io.*;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import edu.oswego.util.dao.GenericDAO;
import edu.oswego.util.mapper.RowMapper;
import edu.oswego.util.utility.ConfigReader;

//import javax.inject.Inject;
//import org.eclipse.microprofile.config.inject.ConfigProperty;

public class AbstractDAO<T> implements GenericDAO<T> {

    private final ConfigReader read = new ConfigReader();
  
//    @Inject
//    @ConfigProperty(name = "edu.oswego.util.dao.impl.AbstractDAO.url")
    String url = read.getValueAsString("edu.oswego.util.dao.impl.AbstractDAO.url");

//    @Inject
//    @ConfigProperty(name = "edu.oswego.util.dao.impl.AbstractDAO.user")
    String user = read.getValueAsString("edu.oswego.util.dao.impl.AbstractDAO.user");

//    @Inject
//    @ConfigProperty(name = "edu.oswego.util.dao.impl.AbstractDAO.password")
    String password = read.getValueAsString("edu.oswego.util.dao.impl.AbstractDAO.password");

    public Connection getConnection() throws SQLException {
        try {
            //String url = "jdbc:mysql://localhost:3306/CSC480database";
            // String url = "jdbc:mysql://pi.cs.oswego.edu:3306/21F_peerset";
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(url, user, password);
        } catch (ClassNotFoundException | SQLException e) {
            return null;
        }
    }

    @Override
    public <T> List<T> query(String sql, RowMapper<T> rowMapper, Object... parameters) {
        List<T> results = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            resultSet = statement.executeQuery();
            while (resultSet.next()) {
                results.add(rowMapper.mapRow(resultSet));
            }
            return results;
        } catch (SQLException e) {
            return null;
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                return null;
            }
        }
    }

    @Override
    public void update(String sql, Object... parameters) {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            connection = getConnection();
            connection.setAutoCommit(false);
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            statement.executeUpdate();
            connection.commit();
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e2) {
                e2.printStackTrace();
            }
        }
    }

    @Override
    public int insert(String sql, Object... parameters) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            int id = -1;
            connection = getConnection();
            connection.setAutoCommit(false);
            statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            setParameter(statement, parameters);
            statement.executeUpdate();
            resultSet = statement.getGeneratedKeys();
            if (resultSet.next()) {
                id = resultSet.getInt(1);
            }
            connection.commit();
            return id;
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
            e.printStackTrace();
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e2) {
                e2.printStackTrace();
            }
        }
        return -1;
    }

    @Override
    public String insertString(String sql, Object... parameters) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            String id = "";
            connection = getConnection();
            connection.setAutoCommit(false);
            statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            setParameter(statement, parameters);
            statement.executeUpdate();
            resultSet = statement.getGeneratedKeys();
            if (resultSet.next()) {
                id = resultSet.getString(1);
            }
            connection.commit();
            return id;
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e2) {
                e2.printStackTrace();
            }
        }
        return "";
    }

    private void setParameter(PreparedStatement statement, Object... parameters) {
        try {
            for (int i = 0; i < parameters.length; i++) {
                Object parameter = parameters[i];
                int index = i + 1;
                if (parameter instanceof Long) {
                    statement.setLong(index, (Long) parameter);
                } else if (parameter instanceof String) {
                    statement.setString(index, (String) parameter);
                } else if (parameter instanceof Integer) {
                    statement.setInt(index, (Integer) parameter);
                } else if (parameter instanceof Float) {
                    statement.setFloat(index, (Float) parameter);
                }
                else if (parameter instanceof LocalDate)
                {
                    statement.setDate(index, (Date.valueOf((LocalDate) parameter)));
                }
                else if (parameter instanceof LocalDateTime)
                {
                    statement.setTimestamp(index,Timestamp.valueOf((LocalDateTime) parameter));
                }
                else if (parameter instanceof InputStream){
                    statement.setBlob(index, (InputStream) parameter);
                }
                else if(parameter instanceof Boolean){
                    statement.setBoolean(index, (Boolean) parameter);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Integer> generateUniqueRandomId(String sql, Object... parameters){
        List<Integer> results = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            resultSet = statement.executeQuery();
            while (resultSet.next()) {
                int generateUniqueRandomId = resultSet.getInt("random_number");
                results.add(generateUniqueRandomId);
            }
            return results;
        } catch (SQLException e) {
            return null;
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                return null;
            }
        }
    }

    @Override
    public List<Integer> queryInteger(String sql, String fieldName, Object... parameters){
        List<Integer> results = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            resultSet = statement.executeQuery();
            while (resultSet.next()) {
                int idx = resultSet.getInt(fieldName);
                results.add(idx);
            }
            return results;
        } catch (SQLException e) {
            return null;
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                return null;
            }
        }
    }

    @Override
    public int count(String sql, Object... parameters) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            int count = 0;
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            setParameter(statement, parameters);
            resultSet = statement.executeQuery();
            while (resultSet.next()) {
                count = resultSet.getInt(1);
            }
            return count;
        } catch (SQLException e) {
            return 0;
        } finally {
            try {
                if (connection != null) {
                    connection.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                return 0;
            }
        }
    }

}
