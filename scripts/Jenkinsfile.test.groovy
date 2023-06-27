pipeline {
    agent any
    tools {
        nodejs 'nodejs18'
    }

    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    stages {
        stage('Cloning git repo') {
            steps {
                cleanWs()
                echo "Building ${env.JOB_NAME}..."
                git url: 'https://github.com/stasgm/nestjs-menu.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh './scripts/test/install.sh'
            }
        }
        stage('Validate') {
            steps {
                sh './scripts/test/validate.sh'
            }
        }
        stage('Migrate and seed the database') {
            steps {
                sh './scripts/test/prepare_db.sh'
            }
        }
        stage('Run unit tests') {
            steps {
                sh './scripts/test/run_unit_tests.sh'
            }
        }
        stage('Run integration tests') {
            steps {
                sh './scripts/test/run_int_tests.sh'
            }
        }
        stage('Run e2e tests') {
            steps {
                sh './scripts/test/run_e2e_tests.sh'
            }
        }
    }
    post {
        always {
            sh 'yarn test-env:db:stop'
            junit 'junit.xml'
        }
    }
}
