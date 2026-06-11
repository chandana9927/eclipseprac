package ui;

import db.DBConnection;
import javax.swing.*;
import java.awt.*;
import java.sql.*;

public class LoginUI extends JFrame {
    JTextField userField;
    JPasswordField passField;

    public LoginUI() {
        setTitle("Online Voting - Login");
        setSize(350, 250);
        setLayout(new GridLayout(4, 2));

        add(new JLabel("Username:"));
        userField = new JTextField();
        add(userField);

        add(new JLabel("Password:"));
        passField = new JPasswordField();
        add(passField);

        JButton loginBtn = new JButton("Login");
        add(loginBtn);

        loginBtn.addActionListener(e -> login());

        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);
    }

    void login() {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "SELECT * FROM users WHERE username=? AND password=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, userField.getText());
            ps.setString(2, new String(passField.getPassword()));
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                if (rs.getString("role").equals("VOTER")) {
                    new VoterUI(rs.getInt("id"));
                } else {
                    new AdminUI();
                }
                dispose();
            } else {
                JOptionPane.showMessageDialog(this, "Invalid Login");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
