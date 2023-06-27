pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    environment {
        dockerImage = ''
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
    }
    stages {
        stage('Cloning git repo') {
            steps {
                cleanWs()
                git url: 'https://github.com/stasgm/nestjs-menu.git'
            }
        }
        stage('Build') {
            steps {
                sh './scripts/publish/build.sh'
            }
        }
        stage('Push') {
            steps {
                sh './scripts/publish/push.sh'
            }
        }
    }
    post {
        always {
            sh './scripts/publish/finalize.sh'
        }
    }
}
