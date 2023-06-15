pipeline {
	agent any
	options {
		skipDefaultCheckout(true)
		buildDiscarder(logRotator(numToKeepStr: '5'))
	}
	environment {
		dockerImage = ""
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
				sh 'docker build . -t stanislau2020/nestjs-menu:latest'
			}
		}
		stage('Login') {
			steps {
				// script {
				// 	docker.withRegistry( '', 'dockerhub-cred' ) {
				// 		dockerImage.push()
				// 	}
				// }
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}
		stage('Push'){
			steps{
				sh 'docker push stanislau2020/nestjs-menu:latest'
				// withCredentials([usernamePassword(credentialsId: 'docker_token', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
				// sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
				// }
			}
		}
	}
	post {
		always {
			sh 'docker logout'
		}
	}
}