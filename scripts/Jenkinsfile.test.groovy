pipeline {
  agent any
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
        sh './scripts/install.sh'
      }
    }
    stage('Migrate and seed the database') {
      steps {
        sh './scripts/prepare_db.sh'
      }
    }
    stage('Run unit tests') {
      steps {
        sh 'yarn t-env:test:ci:cov'
      }
    }
    stage('Run integration tests') {
      steps {
        sh 'yarn t-env:test:int'
      }
    }
    stage('Run e2e tests') {
      steps {
        sh 'yarn t-env:test:e2e'
      }
    }
  }
  post {
    always {
      junit 'junit.xml'
    }
  }
}
