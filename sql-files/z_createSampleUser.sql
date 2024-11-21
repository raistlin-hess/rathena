-- Refer to conf/groups.yml for all user group ids.

-- Create a user with Admin privileges
INSERT INTO login (account_id, userid, user_pass, sex, email, group_id, character_slots) VALUES (2000000, "admin_user", MD5("password"), "M", "a@a.com", 99, 12);

-- Create a user with basic Player privileges
INSERT INTO login (userid, user_pass, sex, email, group_id, character_slots) VALUES ("basic_user", MD5("password"), "M", "a@a.com", 0, 12);
