pipeline {
    agent any
    
    stages {
        stage('Dashboard View') {
            steps {
                build job: 'DashboardTests'
            }
        }
        stage('Business Process View'){
            steps {
                build job: 'BusinessProcessViewTests'
               //echo 'Build App' 
               ////git branch: 'teamGoose', url: 'https://github.com/david-fisher/320-S22-Track1'
            }
        }
        stage('Log Events View') {
            steps {
                build job: 'LogViewTests'
            }
        }
    }
}
