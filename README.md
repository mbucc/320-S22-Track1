# CLOG Monitor Track 1

This is the code base for Track 1 CLOG Monitor.

## Requirements

- Java 11. Install from [Java](https://www.oracle.com/java/technologies/downloads/)
- Apache Maven 3.6.3. Install from [Maven](https://maven.apache.org/download.cgi)
- Node.js. Install from [Node.js](https://nodejs.org/en/)

After installing, use your terminal to run the following commands to check if the requirements are installed.

```
node -v
npm -v
java -version
mvn -v
```

## Build application

Navigate to **./backend/src/main/resources/application.properties** directory and update credentials on line 3 and 4.

### Production 

Navigate to **./backend** directory, run `mvn spring-boot:run`. This will run the production build.
As maven creates static files for the project, any new changes made to the code base won't be loaded on the build live. To see any changes, the best practice is to run the development build or re-run the above `mvn` command after making changes.

### Development

Navigate to **./backend** directory, run `mvn spring-boot:run`. Then navigate to **./clogMonitor** directory, run `npm start`. If there are any issues, run `npm install` before `npm start`.