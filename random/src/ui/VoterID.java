package ui;

import db.DBConnection;
import javax.swing.*;
import java.sql.*;

public class VoterUI extends JFrame {
    int userId;

    public VoterUI(int userId) {
        this.userId = userId;
        setTitle("Cast Your Vote");
        setSize(300, 300);

        try {
            Connection con = DBConnection.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM candidates");

            ButtonGroup bg = new ButtonGroup();
            JPanel panel = new JPanel();

            while (rs.next()) {
                JRadioButton rb = new JRadioButton(rs.getString("name"));
                rb.setActionCommand(String.valueOf(rs.getInt("id")));
                bg.add(rb);
                panel.add(rb);
            }

            JButton voteBtn = new JButton("Vote");
            voteBtn.addActionListener(e -> castVote(bg));

            add(panel, "Center");
            add(voteBtn, "South");

        } catch (Exception e) {
            e.printStackTrace();
        }

        setVisible(true);
    }

    void castVote(ButtonGroup bg) {
        if (bg.getSelection() == null) {
            JOptionPane.showMessageDialog(this, "Select a candidate");
            return;
        }

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement check = con.prepareStatement(
                "SELECT has_voted FROM users WHERE id=?"
            );
            check.setInt(1, userId);
            ResultSet rs = check.executeQuery();
            rs.next();

            if (rs.getBoolean("has_voted")) {
                JOptionPane.showMessageDialog(this, "You already voted!");
                return;
            }

            int candidateId = Integer.parseInt(bg.getSelection().getActionCommand());

            con.prepareStatement(
                "UPDATE candidates SET votes = votes + 1 WHERE id=" + candidateId
            ).executeUpdate();

            con.prepareStatement(
                "UPDATE users SET has_voted=true WHERE id=" + userId
            ).executeUpdate();

            JOptionPane.showMessageDialog(this, "Vote Cast Successfully");
            dispose();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
