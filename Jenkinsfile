pipeline {
    agent any

    environment {
        SPRING_DATASOURCE_USERNAME = 'root'
        SPRING_DATASOURCE_PASSWORD = 'teamkick'
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
