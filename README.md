# CLOG Monitor Track 1

This is the code base for Track 1 CLOG Monitor.

## Requirements

- Java 11. Install from [Java](https://www.oracle.com/java/technologies/downloads/)
- Apache Maven 3.6.3. Install from [Maven](https://maven.apache.org/download.cgi)
- Node.js. Install from [Node.js](https://nodejs.org/en/)
- Jenkins 2.332.1 from [Jenkins](https://www.jenkins.io/doc/book/installing/)
- Tomcat9 from [Tomcat](https://tomcat.apache.org/download-90.cgi)
- MySQL from [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)


After installing, use your terminal to run the following commands to check if the requirements are installed.

```
node -v
npm -v
java -version
mvn -v
```

### Jenkins
Access from terminal:
- create ssh key
```
ssh-keygen -t rsa -b 4096 -C <USERNAME>
```
- ssh to server: 
```
cd .ssh
ssh 34.148.168.151 -l <USERNAME> -i <PrivatekeyDir>
```
PrivatekeyDir is most likely id_rsa

Access from browser:

http://34.148.168.151:8080/login?from=%2F

Credentials

Admin
- Username: admin
- Password: teamkick

Other users
- Username: Track1 
- Password: jenkins

### Tomcat

Tomcat credentials: jenkins automated credentials 
- username: war-deployer 
  password: jenkins-tomcat-deploy 

Tomcat GUIcredentials 
- username: admin
- password: teamkick 

From browser:
- Visit http://34.148.168.151:8081/
- Click on “manager webapp", Login with user: admin, pass: teamkick
- Click on “/MainDeployment”, Login with user: admin, pass: admin
- Land on CLOG Monitor login page, credentials: <>
  
### MySQL

Login:

On main page, next to “MySQL Connections”, select the + symbol to add a new connection

Enter the following credentials:
- SQL server IP: 35.196.100.59
- SQL connection name: lexical-script-343520:us-east1:teamkick 
- SQL username: root 
- SQL password: teamkick


## Build application

Navigate to **./backend/src/main/resources/application.properties** directory and update credentials on line 3 and 4.

### Production 

Navigate to **./backend** directory, run `mvn spring-boot:run`. This will run the production build.
As maven creates static files for the project, any new changes made to the code base won't be loaded on the build live. To see any changes, the best practice is to run the development build or re-run the above `mvn` command after making changes.

### Development

Navigate to **./backend** directory, run `mvn spring-boot:run`. Then navigate to **./clogMonitor** directory, run `npm start`. If there are any issues, run `npm install` before `npm start` to install required libraries.
