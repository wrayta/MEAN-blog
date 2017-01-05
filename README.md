# MEAN-blog
-------------------------------------------------------------------------------------------------------------------------------------------
Blog application created using MEAN stack (MySQL in place of MongoDB, Express, AngularJS, and Node.js). With this application, 
users can create, edit, and delete blog posts. 

**NOTES the user will have to fill in the server.js lines of code currently containing empty strings to properly connect to his or her 
own instance of MySQL server. Application also assumes that there is a database called 'blog' and a table within that db called
'entry'. 

The following is the MySQL statement I used to create the 'entry' table along with its fields:

CREATE TABLE entry ( id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, title varchar(255) NOT NULL, body text NOT NULL, PRIMARY KEY (id) );
