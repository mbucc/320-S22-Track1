pipeline {
    agent any

    environment {
        SPRING_DATASOURCE_URL = jdbc:mysql://35.196.100.59:3306/ISONE?zeroDateTimeBehavior=convertToNull&useLegacyDatetimeCode=false
        SPRING_DATASOURCE_USERNAME = root
        SPRING_DATASOURCE_PASSWORD = teamkick
        SPRING_JPA_HIBERNATE_DDL_AUTO = update
        SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT = org.hibernate.dialect.MySQL5InnoDBDialect
    }
    
    stages {
        // stage('Business Process View'){
        //     steps {
        //         build job: 'BusinessProcessViewTests'
        //        //echo 'Build App' 
        //        ////git branch: 'teamGoose', url: 'https://github.com/david-fisher/320-S22-Track1'
        //     }
        // }
        // stage('Log Events View') {
        //     steps {
        //         build job: 'LogViewTests'
        //     }
        // }
        stage('Deployment') {
            steps {
                build job: 'MainDeployment'
            }
        }
    }
}
