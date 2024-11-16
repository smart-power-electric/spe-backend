-- Custom SQL migration file, put you code below! --
INSERT INTO "main"."role" ("id", "roleName", "roleDescription", "role") 
VALUES ('0193345e-6b81-7e54-b208-52821d481658', 'Admin', 'Admin role', 'ADMIN');

INSERT INTO "main"."user" ("id", "fullname", "username", "password", "status", "isEnabled")
VALUES ('0193345e-6b81-7e54-b208-52821d481658', 'The Devs', 'developer', '$2y$10$XZBkMD11EqwuYtAayhAZl.Z8WUU00lZuvHNOLeLSywvlr3OklxRJO', 'ACTIVE', 1);

